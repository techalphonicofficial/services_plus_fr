import { resolveService, withModuleContent } from "@/service/recordService";
import { createMetadata } from "@/lib/seoMetadata";
import { servicePath } from "@/lib/siteConfig";
import CmsRecordPage from "@/components/tax-alphonic/pages/CmsRecordPage";
import LegacyServicePage, { generateMetadata as legacyMetadata } from "@/features/legacy/LegacyServicePage";

/*
 * /service/<slug>: the CMS service (admin: Services, Page Builder blocks) through the shared CMS block
 * renderers (components/tax-alphonic). A slug the CMS doesn't have yet still shows the old Services Plus
 * page from src/content (features/legacy), until that service is added in the CMS.
 */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = await resolveService(slug, servicePath(slug));
  return resolved ? createMetadata(resolved.record) : legacyMetadata({ params });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const resolved = await withModuleContent(await resolveService(slug, servicePath(slug)));
  if (resolved) return <CmsRecordPage resolved={resolved} />;
  return <LegacyServicePage params={params} />;
}
