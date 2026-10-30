import * as cheerio from 'cheerio';
import fs from 'node:fs/promises';

async function mapCategoriesToServices() {
  const catSlugs = ['startup', 'trademark', 'taxes', 'compliance', 'certification-licensing'];
  const mapping = {};

  for (const slug of catSlugs) {
    const url = `https://www.servicesplus.in/service-by-categories/${slug}`;
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const services = [];
    $('a[href*="/service/"]').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      const slugMatch = href.match(/\/service\/([^/?#]+)/);
      if (slugMatch && text && !services.some(s => s.slug === slugMatch[1])) {
        services.push({
          slug: slugMatch[1],
          title: text,
          href: `/service/${slugMatch[1]}`
        });
      }
    });

    mapping[slug] = services;
    console.log(`Category [${slug}]: ${services.length} services`);
  }

  await fs.mkdir('src/content/categories', { recursive: true });
  await fs.writeFile('src/content/categories/mapping.json', JSON.stringify(mapping, null, 2), 'utf-8');
  console.log('Saved src/content/categories/mapping.json');
}

mapCategoriesToServices().catch(console.error);
