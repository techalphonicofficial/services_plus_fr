# CMS integration

The website reads its content from the Services Plus CMS: backend `../tax-alphonic-backend-by-ravi`,
admin `../taxalphonic-cms-admin` (folder names only; shared for now, a separate Services Plus backend
and database are planned). The look stays Services Plus.

## Layers
- `src/service/`: every API call (server-side, `apiClient.js` + `.env` `BASE_URL`).
  - `menuService.js`: this site's menus, picked by name (`SITE_HEADER_MENU` / `SITE_FOOTER_MENU`,
    default "Services Plus Header" / "Services Plus Footer"; the backend seeds them with
    `node scripts/seed-servicesplus-menus.js --activate`). The public `GET /menus` lists active menus only.
  - `headerService.js` → `components/layout/TopNav.jsx`: items with links = mega-menu categories,
    plain items = nav links, "Login" with links = account menu, a last "Get Started"-like item = the button.
  - `footerService.js` → `components/layout/Footer.jsx`: columns of the first heading = link columns,
    "Follow us" = social buttons, everything else = bottom-bar links.
  - `servicePageService.js` (services), `pageService.js` (CMS pages), `homePageService.js` (page `home`),
    `seoPageService.js` (pSEO), `blogService.js`, `aboutPageService.js`, `landingPageService.js`,
    `seoConfigService.js`, `sitemapService.js`, `formSubmission.js` / `captcha.js` (Server Actions), ...
  - `recordService.js`: which record a URL shows (pSEO → page → service), with its SEO Config.
- `src/components/tax-alphonic/`: the CMS block renderers (Page Builder blocks of services, pages,
  homepage, blogs, journey / tool / landing pages). Copied from the admin's Live Preview copy
  (`taxalphonic-cms-admin/src/site-preview/website`, the Services Plus coloured version) and the
  other CMS website. `siteStyles.js` loads their stylesheets with `servicesplus-theme.css` last.
  When those files change there, copy them here again.
- `src/lib/siteConfig.js`: site name, origin and the Services Plus URL rules.
- `blocks/ExtraBlocks.jsx` + `extra-blocks.css` (also in the admin preview and the other CMS website):
  Carousel / Slider (`CommonCarousel`), Latest Blog Posts (`CommonBlogPosts`, posts attached by
  `homeContentService.js` `attachBlogPosts`; `BLOG_POST_BASE` is `/blog-detail/` here, `/blog/` on the other site)
  and Section Tabs (`CommonAnchorNav`). Admin fields: `commonBlocks.js`. They size to their column
  (container queries), so they work in the hero area, main content and the sidebar.

## Routes
| URL | Content |
| --- | --- |
| `/` | CMS page `home` (Home Page Builder) |
| `/service/<slug>` | CMS service; `/<slug>` of a service redirects here |
| `/service-by-categories/<slug>` | the header menu category that links here (explore cards) |
| `/blog`, `/blog-detail/<slug>` | CMS blog; `/blog/<slug>` redirects to `/blog-detail/<slug>` |
| `/about` | CMS About Page |
| `/<anything>` | CMS page or pSEO page (`app/[...slug]`) |
| `/explore/...`, `/lp/<label>`, `/cms-preview`, `/sitemap.xml`, `/robots.txt` | shared CMS routes |
| `/contact`, `/payment`, `/notification`, `/policy/*`, `/user-*` | this site's own pages |

## Fallback while content moves to the CMS
When the CMS has no record yet, the old pages built from `src/content` are shown
(`src/features/legacy/`): a service or post slug the CMS doesn't have, the homepage without a published
`home` page, the blog list while the CMS has no live post, the About page while it is empty.
The sitemap never lists those local URLs: only published, indexable CMS records (robots without
noindex, no canonical elsewhere, pSEO `indexable`, SEO Config overrides) plus `/contact` and the two
`/policy` pages (`sitemapService.js`). Delete a legacy page once its
content is in the CMS.
