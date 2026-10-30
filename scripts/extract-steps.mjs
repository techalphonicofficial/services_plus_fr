import * as cheerio from 'cheerio';

async function extractStepsAndReasons() {
  const res = await fetch('https://www.servicesplus.in/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- ALL H2 & H3 HEADINGS ---');
  $('h2, h3, h4').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text) console.log(`${el.tagName}: ${text}`);
  });

  console.log('\n--- LOOKING FOR STEPS & REASONS ---');
  $('div[class*="step"], div[class*="process"], div[class*="feature"], div[class*="why"]').each((_, el) => {
    console.log('Block:', $(el).text().replace(/\s+/g, ' ').trim().slice(0, 150));
  });
}

extractStepsAndReasons().catch(console.error);
