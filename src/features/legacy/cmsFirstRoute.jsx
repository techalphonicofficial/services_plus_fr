import { permanentRedirect } from "next/navigation";
import { resolvePath, withModuleContent } from "@/service/recordService";
import { createMetadata } from "@/lib/seoMetadata";
import { servicePath } from "@/lib/siteConfig";
import CmsRecordPage from "@/components/tax-alphonic/pages/CmsRecordPage";

/*
 * A fixed route (/contact, /payment, ...) is matched before app/[...slug], so a CMS page or service
 * with the same slug would never show. These routes show the CMS record when there is one (same
 * rules as app/[...slug]) and the old hardcoded page otherwise.
 */
export function cmsFirstRoute(pathname, LegacyPage, legacyMetadata) {
  async function generateMetadata() {
    const resolved = await resolvePath(pathname);
    return resolved ? createMetadata(resolved.record) : legacyMetadata;
  }

  async function Page() {
    const resolved = await withModuleContent(await resolvePath(pathname));
    if (resolved?.kind === "service") permanentRedirect(servicePath(resolved.record.slug));
    if (resolved) return <CmsRecordPage resolved={resolved} />;
    return <LegacyPage />;
  }

  return { generateMetadata, Page };
}
