import fs from 'node:fs/promises';
import path from 'node:path';

const KNOWN_REDIRECTS = {
  '/service-by-categories/certification-and-licensing': '/service-by-categories/certification-licensing',
  '/service/Google Adwords Services': '/service/google-adwords-services',
  '/service/Google%20Adwords%20Services': '/service/google-adwords-services',
};

async function verifyUrlParity() {
  console.log('=== VERIFYING 100% URL PARITY (OLD vs NEW) ===');

  const oldUrls = JSON.parse(await fs.readFile('docs/all-urls.json', 'utf-8'));
  console.log(`Total live URLs to verify: ${oldUrls.length}`);

  const servicesDir = path.join(process.cwd(), 'src', 'content', 'services', 'items');
  const serviceFiles = new Set((await fs.readdir(servicesDir)).map(f => f.replace('.json', '')));

  const blogsDir = path.join(process.cwd(), 'src', 'content', 'blogs', 'items');
  const blogFiles = new Set((await fs.readdir(blogsDir)).map(f => f.replace('.json', '')));

  const staticRoutes = new Set([
    '/',
    '/about',
    '/contact',
    '/blog',
    '/payment',
    '/notification',
    '/policy/privacy-policy',
    '/policy/terms-and-condition',
    '/user-login',
    '/user-register',
    '/service-by-categories/startup',
    '/service-by-categories/trademark',
    '/service-by-categories/taxes',
    '/service-by-categories/compliance',
    '/service-by-categories/certification-licensing',
  ]);

  let missing = [];
  let matched = 0;
  let redirected = 0;

  for (const fullUrl of oldUrls) {
    let urlPath = new URL(fullUrl).pathname;
    if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;
    urlPath = urlPath.replace(/\/+$/, '') || '/';

    // 1. Check known 301 redirects
    if (KNOWN_REDIRECTS[urlPath] || KNOWN_REDIRECTS[decodeURIComponent(urlPath)]) {
      redirected++;
      continue;
    }

    // 2. Check static routes
    if (staticRoutes.has(urlPath)) {
      matched++;
      continue;
    }

    // 3. Check service routes
    if (urlPath.startsWith('/service/')) {
      const slug = decodeURIComponent(urlPath.replace('/service/', ''));
      if (serviceFiles.has(slug)) {
        matched++;
        continue;
      }
    }

    // 4. Check blog routes
    if (urlPath.startsWith('/blog-detail/')) {
      const slug = decodeURIComponent(urlPath.replace('/blog-detail/', ''));
      if (blogFiles.has(slug)) {
        matched++;
        continue;
      }
    }

    // 5. Check category routes
    if (urlPath.startsWith('/service-by-categories/')) {
      const slug = urlPath.replace('/service-by-categories/', '');
      if (['startup', 'trademark', 'taxes', 'compliance', 'certification-licensing'].includes(slug)) {
        matched++;
        continue;
      }
    }

    missing.push({ fullUrl, urlPath });
  }

  console.log(`\nResults:`);
  console.log(`Matched direct routes: ${matched}`);
  console.log(`301 Redirected routes: ${redirected}`);
  console.log(`Total accounted for: ${matched + redirected} / ${oldUrls.length}`);

  if (missing.length > 0) {
    console.error(`\nFAILED! The following ${missing.length} URLs are missing:`);
    missing.forEach(m => console.error(`  - ${m.fullUrl}`));
    process.exit(1);
  }

  console.log(`\nSUCCESS: 100% URL parity achieved with zero dropped paths!`);
}

verifyUrlParity().catch(err => {
  console.error(err);
  process.exit(1);
});

