import * as cheerio from 'cheerio';

async function testServiceForms() {
  const urls = [
    'https://www.servicesplus.in/',
    'https://www.servicesplus.in/service/private-limited-company',
    'https://www.servicesplus.in/service/trademark-registration',
    'https://www.servicesplus.in/payment',
    'https://www.servicesplus.in/notification'
  ];

  for (const url of urls) {
    console.log(`\n================== Checking ${url} ==================`);
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    console.log('Title:', $('title').text().trim());
    console.log('H1:', $('h1').text().trim());
    
    const forms = $('form');
    console.log(`Found ${forms.length} forms:`);
    forms.each((i, el) => {
      const f = $(el);
      console.log(`  Form #${i + 1}: action="${f.attr('action')}" method="${f.attr('method')}" id="${f.attr('id')}" class="${f.attr('class')}"`);
      f.find('input, select, textarea').each((j, inp) => {
        const input = $(inp);
        console.log(`    field: name="${input.attr('name')}" type="${input.attr('type') || input[0].tagName}" value="${input.attr('value') || ''}" placeholder="${input.attr('placeholder') || ''}"`);
      });
      f.find('button, input[type="submit"]').each((j, btn) => {
        console.log(`    submit btn: "${$(btn).text().trim() || $(btn).val()}"`);
      });
    });

    // Check for payment buttons, Razorpay, Cashfree, Stripe, Paytm, etc.
    const scripts = $('script').map((i, el) => $(el).attr('src') || $(el).html()).get();
    const paymentKeywords = scripts.filter(s => /razorpay|cashfree|paytm|stripe|instamojo|phonepe/i.test(s));
    if (paymentKeywords.length > 0) {
      console.log('  Payment gateways detected in scripts:', paymentKeywords.length);
    }
  }
}

testServiceForms().catch(console.error);

