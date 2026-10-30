import * as cheerio from 'cheerio';

async function checkSpecificElements() {
  for (const path of ['/payment', '/notification']) {
    const res = await fetch('https://www.servicesplus.in' + path);
    const html = await res.text();
    const $ = cheerio.load(html);
    // Find the unique body content between header and footer
    // Usually header is <header> or .header or nav, footer is <footer>
    $('header, nav, footer, .footer, .header, script, style').remove();
    console.log(`\n================== Specific inner HTML for ${path} ==================`);
    console.log($('body').html()?.slice(0, 1500));
  }
}

checkSpecificElements().catch(console.error);

