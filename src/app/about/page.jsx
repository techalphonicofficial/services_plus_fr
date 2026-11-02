import AboutPage from "@/components/tax-alphonic/pages/AboutPage";
import { getAboutPage } from "@/service/aboutPageService";
import { applySeoConfig, getSeoConfig } from "@/service/seoConfigService";
import { createMetadata } from "@/lib/seoMetadata";
import JsonLd from "@/components/seo/JsonLd";
import LegacyAboutPage, { metadata as legacyMetadata } from "@/features/legacy/LegacyAboutPage";

// /about: the CMS About page (admin: About Page). Until it has content, the old Services Plus page.

async function getCmsAbout() {
  const about = await getAboutPage();
  return about && (about.heroSubtitle || about.overviewDescription || about.missionText) ? about : null;
}

/** About page SEO: its hero texts and image, with the SEO Config "About page" (admin) on top. */
async function getAboutSeo(about) {
  const own = { title: about.heroTitle, metaTitle: about.heroTitle, metaDescription: about.heroSubtitle, ogImage: about.aboutImage };
  return applySeoConfig(own, await getSeoConfig("static", "about", "/about"));
}

export async function generateMetadata() {
  const about = await getCmsAbout();
  return about ? createMetadata(await getAboutSeo(about)) : legacyMetadata;
}

export default async function About() {
  const about = await getCmsAbout();
  if (!about) return <LegacyAboutPage />;

  const seo = await getAboutSeo(about);
  return (
    <>
      <JsonLd value={seo.schemaMarkup} />
      <AboutPage about={about} />
    </>
  );
}
