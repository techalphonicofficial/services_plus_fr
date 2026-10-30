import * as cheerio from 'cheerio';

async function extractFAQs() {
  const res = await fetch('https://www.servicesplus.in/');
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- EXTRACTING HOMEPAGE FAQS ---');
  $('.accordion-item, .card, [id*="faq"], [class*="faq"]').each((_, el) => {
    const q = $(el).find('button, h2, h3, h4, h5, .card-header').first().text().replace(/\s+/g, ' ').trim();
    const a = $(el).find('.accordion-body, .card-body, p').text().replace(/\s+/g, ' ').trim();
    if (q && a && q.length > 5 && a.length > 10) {
      console.log(`Q: ${q}`);
      console.log(`A: ${a}\n`);
    }
  });
}

extractFAQs().catch(console.error);
