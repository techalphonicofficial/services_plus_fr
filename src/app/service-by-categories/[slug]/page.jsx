import ExplorePage from "@/components/tax-alphonic/explore/ExplorePage";
import { findMenuNodeByUrl, getHeaderMenuTree, leafCount } from "@/service/menuExploreService";
import { createMetadata } from "@/lib/seoMetadata";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import LegacyCategoryPage, { generateMetadata as legacyMetadata } from "@/features/legacy/LegacyCategoryPage";

/*
 * /service-by-categories/<slug>: every link under the header menu item that points here (admin:
 * Menus & Navigation → "Services Plus Header"), shown like the Tax Alphonic explore pages. A
 * category the menu doesn't link to still shows the old page from src/content.
 */

const pathOf = (slug) => `/service-by-categories/${slug}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const node = await findMenuNodeByUrl(pathOf(slug));
  if (!node) return legacyMetadata({ params });
  return createMetadata({
    metaTitle: `${node.title} services | ${SITE_NAME}`,
    metaDescription: `Explore ${leafCount(node)} ${node.title} services by ${SITE_NAME}: ${node.children.slice(0, 6).map((c) => c.title).join(", ")} and more.`,
    canonicalUrl: `${SITE_URL}${pathOf(slug)}`,
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const node = await findMenuNodeByUrl(pathOf(slug));
  if (!node) return <LegacyCategoryPage params={params} />;
  const tree = await getHeaderMenuTree();
  return <ExplorePage node={node} parent={null} tree={tree} />;
}
