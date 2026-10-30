import * as cheerio from 'cheerio';
import fs from 'node:fs/promises';

async function parseHeaderRaw() {
  const html = await fs.readFile('docs/header-raw.html', 'utf-8');
  const $ = cheerio.load(html);

  const categories = [];

  // Look for menu items that have submenus
  $('li.dropdown, li.has-dropdown, li.menu-item-has-children, div.dropdown, ul > li').each((_, el) => {
    const title = $(el).find('> a, > span, > button').first().text().replace(/\s+/g, ' ').trim();
    const links = [];
    $(el).find('ul a, .dropdown-menu a, div a').each((_, a) => {
      const href = $(a).attr('href');
      const text = $(a).text().replace(/\s+/g, ' ').trim();
      if (href && text && href.includes('/service/')) {
        const slug = href.split('/service/')[1].split('/')[0].split('?')[0];
        links.push({ title: text, slug, href: `/service/${slug}` });
      }
    });

    if (title && links.length > 0 && !categories.some(c => c.title === title)) {
      categories.push({
        title,
        services: links
      });
    }
  });

  console.log(`Extracted ${categories.length} dropdown groups:`);
  categories.forEach(c => console.log(`Group "${c.title}": ${c.services.length} services`));

  await fs.writeFile('src/content/navigation-grouped.json', JSON.stringify(categories, null, 2), 'utf-8');
  console.log('Saved src/content/navigation-grouped.json');
}

parseHeaderRaw().catch(console.error);
