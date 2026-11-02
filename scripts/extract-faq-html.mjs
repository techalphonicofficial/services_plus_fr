import * as cheerio from 'cheerio';

async function extractFaqHTML() {
  const res = await fetch('https://www.servicesplus.in/');
  const html = await res.text();
  const $ = cheerio.load(html);

  const idx = html.indexOf('Frequently Asked Questions');
  if (idx !== -1) {
    console.log('Snippet around FAQ:');
    console.log(html.slice(idx - 100, idx + 2500));
  }
}

extractFaqHTML().catch(console.error);

