import fs from 'node:fs/promises';

async function run() {
  const sitemapRes = await fetch('https://www.servicesplus.in/sitemap.xml');
  const sitemapXml = await sitemapRes.text();
  const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
  console.log(`Found ${locMatches.length} URLs in sitemap.xml`);

  // Also check homepage html for any links not in sitemap
  const homeRes = await fetch('https://www.servicesplus.in/');
  const homeHtml = await homeRes.text();
  const hrefMatches = [...homeHtml.matchAll(/href=["'](https?:\/\/www\.servicesplus\.in\/[^"']*|\/[^"']*)["']/g)].map(m => {
    let url = m[1];
    if (url.startsWith('/')) url = 'https://www.servicesplus.in' + url;
    return url.split('#')[0].split('?')[0].replace(/\/+$/, '');
  });

  const allUrls = Array.from(new Set([...locMatches.map(u => u.replace(/\/+$/, '')), ...hrefMatches]));
  console.log(`Total unique discovered URLs: ${allUrls.length}`);
  
  // Categorize
  const categories = {
    home: [],
    about: [],
    contact: [],
    services: [],
    serviceByCategories: [],
    blogs: [],
    blogDetail: [],
    policies: [],
    auth: [],
    notification: [],
    payment: [],
    others: []
  };

  for (const url of allUrls) {
    const path = new URL(url).pathname;
    if (path === '' || path === '/') categories.home.push(url);
    else if (path.startsWith('/about')) categories.about.push(url);
    else if (path.startsWith('/contact')) categories.contact.push(url);
    else if (path.startsWith('/service/')) categories.services.push(url);
    else if (path.startsWith('/service-by-categories/')) categories.serviceByCategories.push(url);
    else if (path === '/blog' || path === '/blogs') categories.blogs.push(url);
    else if (path.startsWith('/blog-detail/')) categories.blogDetail.push(url);
    else if (path.startsWith('/policy/')) categories.policies.push(url);
    else if (path.includes('login') || path.includes('register')) categories.auth.push(url);
    else if (path.includes('notification')) categories.notification.push(url);
    else if (path.includes('payment')) categories.payment.push(url);
    else categories.others.push(url);
  }

  for (const [k, v] of Object.entries(categories)) {
    console.log(`${k}: ${v.length}`);
  }
  if (categories.others.length > 0) {
    console.log('Others:', categories.others);
  }
}

run().catch(console.error);

