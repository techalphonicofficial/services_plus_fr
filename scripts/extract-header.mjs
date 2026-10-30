import * as cheerio from 'cheerio';
import fs from 'node:fs/promises';

async function extractHeaderStructure() {
  const res = await fetch('https://www.servicesplus.in/');
  const html = await res.text();
  const $ = cheerio.load(html);

  const navCategories = [
    { title: 'Startup', slug: 'startup', href: '/service-by-categories/startup', services: [] },
    { title: 'Trademark', slug: 'trademark', href: '/service-by-categories/trademark', services: [] },
    { title: 'Taxes', slug: 'taxes', href: '/service-by-categories/taxes', services: [] },
    { title: 'Compliance', slug: 'compliance', href: '/service-by-categories/compliance', services: [] },
    { title: 'Certification & Licensing', slug: 'certification-licensing', href: '/service-by-categories/certification-licensing', services: [] },
  ];

  // Let's parse all dropdown containers in header
  // Find all category headings inside header
  $('header').find('ul, .dropdown, div').each((_, el) => {
    // Look for headings matching the 5 categories
  });

  // Let's inspect the exact HTML structure of <header>
  const headerHtml = $('header').html();
  await fs.writeFile('docs/header-raw.html', headerHtml || '', 'utf-8');
  console.log('Saved docs/header-raw.html (length:', headerHtml?.length, ')');
}

extractHeaderStructure().catch(console.error);
