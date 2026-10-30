import * as cheerio from 'cheerio';
import fs from 'node:fs/promises';

async function collectAllUrls() {
  const urlSet = new Set();
  
  // 1. Fetch sitemap.xml
  try {
    const sitemapRes = await fetch('https://www.servicesplus.in/sitemap.xml');
    const sitemapXml = await sitemapRes.text();
    const locs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
    locs.forEach(u => urlSet.add(u.replace(/\/+$/, '')));
    console.log(`Discovered from sitemap: ${locs.length} URLs`);
  } catch (e) {
    console.error('Error fetching sitemap:', e.message);
  }

  // 2. Fetch homepage and crawl nav/footer links
  try {
    const homeRes = await fetch('https://www.servicesplus.in/');
    const homeHtml = await homeRes.text();
    const $ = cheerio.load(homeHtml);
    $('a[href]').each((_, el) => {
      let href = $(el).attr('href');
      if (!href) return;
      if (href.startsWith('/')) href = 'https://www.servicesplus.in' + href;
      if (href.startsWith('https://www.servicesplus.in')) {
        const clean = href.split('#')[0].split('?')[0].replace(/\/+$/, '');
        if (clean && !clean.endsWith('.ico') && !clean.endsWith('.css') && !clean.endsWith('.js')) {
          urlSet.add(clean);
        }
      }
    });
  } catch (e) {
    console.error('Error crawling home:', e.message);
  }

  // 3. Known critical routes that must be present
  const requiredRoutes = [
    'https://www.servicesplus.in',
    'https://www.servicesplus.in/about',
    'https://www.servicesplus.in/contact',
    'https://www.servicesplus.in/blog',
    'https://www.servicesplus.in/payment',
    'https://www.servicesplus.in/notification',
    'https://www.servicesplus.in/user-login',
    'https://www.servicesplus.in/user-register',
    'https://www.servicesplus.in/policy/privacy-policy',
    'https://www.servicesplus.in/policy/terms-and-condition'
  ];
  requiredRoutes.forEach(u => urlSet.add(u));

  // 4. Fetch blogs page to check if all blog pages are listed or if pagination exists
  try {
    const blogRes = await fetch('https://www.servicesplus.in/blog');
    const blogHtml = await blogRes.text();
    const $ = cheerio.load(blogHtml);
    $('a[href*="/blog-detail/"]').each((_, el) => {
      let href = $(el).attr('href');
      if (href.startsWith('/')) href = 'https://www.servicesplus.in' + href;
      urlSet.add(href.split('#')[0].split('?')[0].replace(/\/+$/, ''));
    });
    // check pagination
    $('.pagination a, a[href*="page="]').each((_, el) => {
      console.log('Blog pagination found:', $(el).attr('href'));
    });
  } catch (e) {
    console.error('Error fetching blog page:', e.message);
  }

  // 5. Fetch all 5 category pages to check for any services linked
  const categoryUrls = [
    'https://www.servicesplus.in/service-by-categories/startup',
    'https://www.servicesplus.in/service-by-categories/trademark',
    'https://www.servicesplus.in/service-by-categories/taxes',
    'https://www.servicesplus.in/service-by-categories/compliance',
    'https://www.servicesplus.in/service-by-categories/certification-and-licensing'
  ];
  for (const catUrl of categoryUrls) {
    urlSet.add(catUrl);
    try {
      const catRes = await fetch(catUrl);
      const catHtml = await catRes.text();
      const $ = cheerio.load(catHtml);
      $('a[href*="/service/"]').each((_, el) => {
        let href = $(el).attr('href');
        if (href.startsWith('/')) href = 'https://www.servicesplus.in' + href;
        urlSet.add(href.split('#')[0].split('?')[0].replace(/\/+$/, ''));
      });
    } catch (e) {
      console.error(`Error fetching category ${catUrl}:`, e.message);
    }
  }

  const sortedUrls = Array.from(urlSet).sort();
  console.log(`\n=== Total unique URLs collected: ${sortedUrls.length} ===`);
  
  const stats = {
    total: sortedUrls.length,
    services: sortedUrls.filter(u => u.includes('/service/')).length,
    categories: sortedUrls.filter(u => u.includes('/service-by-categories/')).length,
    blogDetails: sortedUrls.filter(u => u.includes('/blog-detail/')).length,
    policies: sortedUrls.filter(u => u.includes('/policy/')).length,
    auth: sortedUrls.filter(u => u.includes('/user-')).length,
    staticPages: sortedUrls.filter(u => ['https://www.servicesplus.in', 'https://www.servicesplus.in/about', 'https://www.servicesplus.in/contact', 'https://www.servicesplus.in/blog', 'https://www.servicesplus.in/payment', 'https://www.servicesplus.in/notification'].includes(u)).length
  };
  console.log('URL breakdown:', stats);

  await fs.writeFile('docs/all-urls.json', JSON.stringify(sortedUrls, null, 2), 'utf-8');
  console.log('Saved docs/all-urls.json');
}

collectAllUrls().catch(console.error);

