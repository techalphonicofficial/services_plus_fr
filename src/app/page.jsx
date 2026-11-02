import HomeSections from "@/components/tax-alphonic/home/HomeSections";
import { getHomePage } from "@/service/homePageService";
import { attachModuleContent } from "@/service/homeContentService";
import { applySeoConfig, getSeoConfig } from "@/service/seoConfigService";
import { createMetadata } from "@/lib/seoMetadata";
import { SITE_URL } from "@/lib/siteConfig";
import JsonLd from "@/components/seo/JsonLd";
import LegacyHomePage, { metadata as legacyMetadata } from "@/features/legacy/LegacyHomePage";

// Homepage = the published CMS page with slug "home" (admin: Home Page Builder), one Home* block per
// section. Blocks such as Testimonials or Team read their records from the CMS modules. Until that
// page is published with blocks, the old Services Plus homepage is shown.

/** Homepage SEO: the home page's own fields, with the SEO Config "Homepage" (admin) on top. */
async function getHomeSeo(page) {
  const own = { title: "", metaTitle: page?.metaTitle || "", metaDescription: page?.metaDescription || "", canonicalUrl: `${SITE_URL}/` };
  return applySeoConfig(own, await getSeoConfig("static", "home", "/"));
}

export async function generateMetadata() {
  const page = await getHomePage();
  if (!page?.sections?.length) return legacyMetadata;

  // Unset title / description keep the site defaults from app/layout.jsx.
  const metadata = createMetadata(await getHomeSeo(page));
  for (const key of ["title", "description"]) {
    if (!metadata[key]) {
      delete metadata[key];
      delete metadata.openGraph[key];
      delete metadata.twitter[key];
    }
  }
  return metadata;
}

export default async function Home() {
  const page = await getHomePage();
  if (!page?.sections?.length) return <LegacyHomePage />;

  const [sections, seo] = await Promise.all([attachModuleContent(page.sections), getHomeSeo(page)]);
  return (
    <>
      <JsonLd value={seo.schemaMarkup} />
      <HomeSections sections={sections} />
    </>
  );
}
