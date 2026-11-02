import { getPageBySlug } from "@/service/pageService";
import { getServiceBySlug } from "@/service/servicePageService";
import { getSeoPageByPath } from "@/service/seoPageService";
import { withSeoConfig } from "@/service/seoConfigService";
import { attachModuleContent } from "@/service/homeContentService";
import { needsModuleContent } from "@/components/tax-alphonic/blocks/commonBlockTypes";

/**
 * Which CMS record a URL shows (same rules as the Tax Alphonic website):
 * - a path with several segments ("/india/seo-services-noida") is first a pSEO page (its full slug),
 *   then a CMS page with that full slug (Journey Stage pages: "/journey/idea");
 * - else the LAST segment is a service, then a CMS page;
 * - a single segment that is neither can still be a pSEO page ("/seo-services-for-ecommerce").
 * Returns { kind: "service" | "page" | "seo", record } or null.
 */
async function findRecord(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments.at(-1);
  const fullPath = segments.join("/");

  if (segments.length > 1) {
    const seoPage = await getSeoPageByPath(fullPath);
    if (seoPage) return { kind: "seo", record: seoPage };
    const fullPage = await getPageBySlug(fullPath);
    if (fullPage) return { kind: "page", record: fullPage };
  }

  const service = await getServiceBySlug(slug);
  if (service) return { kind: "service", record: service };

  const page = await getPageBySlug(slug);
  if (page) return { kind: "page", record: page };

  if (segments.length === 1) {
    const seoPage = await getSeoPageByPath(fullPath);
    if (seoPage) return { kind: "seo", record: seoPage };
  }

  return null;
}

// SEO Config "type" of each kind of record (admin: SEO Management → SEO Configs).
const SEO_CONFIG_TYPE = { seo: "seo_page", service: "service", page: "page" };

/** A found record with its SEO Config applied, draft services kept out of search engines. */
async function finish(resolved, pathname) {
  const record = await withSeoConfig(resolved.record, SEO_CONFIG_TYPE[resolved.kind], resolved.record.id, pathname);
  // The backend also serves draft services by slug; they stay reachable but are never indexed.
  if (resolved.kind === "service" && record.status && record.status !== "published") {
    record.robots = "noindex, nofollow";
  }
  return { ...resolved, record };
}

/** The record for a URL path, or null. */
export async function resolvePath(pathname) {
  const resolved = await findRecord(pathname);
  return resolved ? finish(resolved, pathname) : null;
}

/** Only a service, for /service/<slug>. */
export async function resolveService(slug, pathname) {
  const service = await getServiceBySlug(slug);
  return service ? finish({ kind: "service", record: service }, pathname) : null;
}

/** Homepage blocks placed on a page (Testimonials, Team, FAQ, ...) read their CMS module. */
export async function withModuleContent(resolved) {
  if (!resolved?.record?.sections?.some(needsModuleContent)) return resolved;
  return { ...resolved, record: { ...resolved.record, sections: await attachModuleContent(resolved.record.sections) } };
}
