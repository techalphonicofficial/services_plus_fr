import { notFound, permanentRedirect, redirect } from "next/navigation";
import { getSlugPath } from "@/lib/tax-alphonic/utils";
import { HOME_PAGE_SLUG } from "@/service/homePageService";
import { resolvePath, withModuleContent } from "@/service/recordService";
import { resolveMenuAlias } from "@/service/menuExploreService";
import { createMetadata } from "@/lib/seoMetadata";
import { servicePath } from "@/lib/siteConfig";
import CmsRecordPage from "@/components/tax-alphonic/pages/CmsRecordPage";

/*
 * Any URL no other route answers: a CMS page, a pSEO page or a service (service/recordService.js).
 * Services live at /service/<slug> on this website, so /<slug> of a service redirects there.
 */

export async function generateMetadata({ params }) {
  const pathname = getSlugPath((await params)?.slug);
  const resolved = await resolvePath(pathname);
  if (resolved) return createMetadata(resolved.record);
  return { title: "Page not found", robots: { index: false, follow: false } };
}

export default async function DynamicPage({ params }) {
  const pathname = getSlugPath((await params)?.slug);
  // The CMS "home" page is the homepage itself.
  if (pathname === `/${HOME_PAGE_SLUG}`) permanentRedirect("/");
  // /category/<name> always opens the menu section's explore page, even when a service has that slug.
  if (pathname.startsWith("/category/")) {
    const section = await resolveMenuAlias(pathname);
    if (section) redirect(section);
  }

  const resolved = await withModuleContent(await resolvePath(pathname));
  if (resolved?.kind === "service") permanentRedirect(servicePath(resolved.record.slug));
  if (resolved) return <CmsRecordPage resolved={resolved} />;

  // A header menu section with this name opens its explore page.
  const explore = await resolveMenuAlias(pathname);
  if (explore) redirect(explore);

  notFound();
}
