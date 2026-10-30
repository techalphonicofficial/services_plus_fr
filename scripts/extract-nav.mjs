import * as cheerio from 'cheerio';

async function extractNavHTML() {
  const res = await fetch('https://www.servicesplus.in/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('nav tags:', $('nav').length);
  console.log('header tags:', $('header').length);
  
  // Find all links in first 400 lines of body
  let count = 0;
  $('header, nav, .header, .menu, [class*="nav"], [class*="menu"]').find('a').each((j, a) => {
    const text = $(a).text().replace(/\s+/g, ' ').trim();
    const href = $(a).attr('href');
    if (text && href && !href.startsWith('#')) {
      count++;
      if (count <= 40) {
        console.log(`  [${text}] -> ${href}`);
      }
    }
  });
  console.log('Total nav links found:', count);
}

extractNavHTML().catch(console.error);
