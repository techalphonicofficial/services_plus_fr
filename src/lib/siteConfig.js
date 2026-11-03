// This website's name, origin and URL rules for CMS records. The shared CMS block renderers
// use /<slug> for services and /blog/<slug> for posts; Services
// Plus keeps its own (already indexed) addresses, so every link and sitemap entry is built here.

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Services Plus";

/** Public origin for canonical URLs, the sitemap and robots.txt (.env SITE_URL). */
export const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://www.servicesplus.in").replace(/\/+$/, "");

const clean = (slug) => String(slug || "").replace(/^\/+|\/+$/g, "");

/** A CMS service: /service/<slug>. */
export const servicePath = (slug) => `/service/${clean(slug)}`;

/** A CMS blog post: /blog-detail/<slug>. */
export const blogPostPath = (slug) => `/blog-detail/${clean(slug)}`;
