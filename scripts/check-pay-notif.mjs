import * as cheerio from 'cheerio';

async function checkPaymentAndNotification() {
  for (const path of ['/payment', '/notification']) {
    const res = await fetch('https://www.servicesplus.in' + path);
    const html = await res.text();
    const $ = cheerio.load(html);
    console.log(`\n================== ${path} ==================`);
    console.log('Main text content:');
    // Print text inside body excluding scripts and styles
    $('script, style, noscript').remove();
    console.log($('main, .content, .container, body').text().replace(/\s+/g, ' ').slice(0, 800));
    
    console.log('\nImages on page:');
    $('img').each((i, el) => {
      console.log('  img:', $(el).attr('src'), 'alt:', $(el).attr('alt'));
    });
    
    console.log('\nLinks on page:');
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        console.log('  link:', href, 'text:', $(el).text().trim());
      }
    });
  }
}

checkPaymentAndNotification().catch(console.error);

