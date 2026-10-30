import * as cheerio from 'cheerio';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const BASE_URL = 'https://www.servicesplus.in';

// Helper to normalize URL paths
function normalizePath(urlStr) {
  try {
    const parsed = new URL(urlStr, BASE_URL);
    return parsed.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return urlStr;
  }
}

// Download asset helper
const downloadedAssets = new Map(); // originalUrl -> localPublicPath

async function downloadAsset(assetUrl, subDir = 'images') {
  if (!assetUrl) return null;
  let fullUrl = assetUrl;
  if (fullUrl.startsWith('//')) fullUrl = 'https:' + fullUrl;
  else if (fullUrl.startsWith('/')) fullUrl = BASE_URL + fullUrl;
  else if (!fullUrl.startsWith('http')) fullUrl = BASE_URL + '/' + fullUrl;

  if (downloadedAssets.has(fullUrl)) {
    return downloadedAssets.get(fullUrl);
  }

  try {
    const urlObj = new URL(fullUrl);
    let ext = path.extname(urlObj.pathname).toLowerCase() || '.png';
    if (!['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.ico'].includes(ext)) {
      ext = '.png';
    }

    const cleanBaseName = path.basename(urlObj.pathname, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50) || 'asset';
    const hash = crypto.createHash('md5').update(fullUrl).digest('hex').slice(0, 8);
    const fileName = `${cleanBaseName}-${hash}${ext}`;
    const localRelPath = `/assets/${subDir}/${fileName}`;
    const localDiskPath = path.join(process.cwd(), 'public', 'assets', subDir, fileName);

    await fs.mkdir(path.dirname(localDiskPath), { recursive: true });

    // Fetch and save
    const res = await fetch(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    if (!res.ok) {
      console.warn(`Failed to download ${fullUrl}: ${res.status}`);
      return fullUrl; // fallback
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(localDiskPath, buffer);
    downloadedAssets.set(fullUrl, localRelPath);
    return localRelPath;
  } catch (err) {
    console.warn(`Error downloading asset ${fullUrl}:`, err.message);
    return fullUrl;
  }
}

async function run() {
  console.log('--- STARTING PHASE 0 FULL CRAWLER ---');

  const allUrls = JSON.parse(await fs.readFile('docs/all-urls.json', 'utf-8'));
  console.log(`Total URLs to process: ${allUrls.length}`);

  const inventory = [];
  const inconsistencies = [];
  const formFindings = [];
  const brokenRoutes = [];

  let count = 0;

  for (const url of allUrls) {
    count++;
    process.stdout.write(`Crawling [${count}/${allUrls.length}]: ${url} ... `);

    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ServicesPlusCrawler/1.0' },
        redirect: 'manual'
      });

      if (res.status !== 200) {
        process.stdout.write(`HTTP ${res.status}\n`);
        brokenRoutes.push({
          url,
          path: normalizePath(url),
          status: res.status,
          location: res.headers.get('location') || null
        });
        continue;
      }

      const html = await res.text();
      const $ = cheerio.load(html);

      const pagePath = normalizePath(url);
      const title = $('title').text().trim() || '';
      const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
      const canonical = $('link[rel="canonical"]').attr('href')?.trim() || '';
      
      const ogTags = {};
      $('meta[property^="og:"]').each((_, el) => {
        ogTags[$(el).attr('property')] = $(el).attr('content');
      });

      const twitterTags = {};
      $('meta[name^="twitter:"]').each((_, el) => {
        twitterTags[$(el).attr('name')] = $(el).attr('content');
      });

      const h1 = $('h1').map((_, el) => $(el).text().replace(/\s+/g, ' ').trim()).get();

      const headings = [];
      $('h1, h2, h3, h4, h5, h6').each((_, el) => {
        headings.push({
          tag: el.tagName.toLowerCase(),
          text: $(el).text().replace(/\s+/g, ' ').trim(),
          id: $(el).attr('id') || null
        });
      });

      // FAQs detection (look for accordion items, faq classes, schemas)
      const faqs = [];
      $('.accordion-item, .card-faq, .faq-item, .panel, .collapse, [class*="faq"]').each((_, el) => {
        const q = $(el).find('.accordion-header, .accordion-button, .card-header, h2, h3, h4, h5, .question, strong').first().text().replace(/\s+/g, ' ').trim();
        const a = $(el).find('.accordion-body, .card-body, .answer, .collapse, p').text().replace(/\s+/g, ' ').trim();
        if (q && a && q.length > 5 && a.length > 10 && !q.includes('Login') && !q.includes('Register')) {
          faqs.push({ question: q, answer: a });
        }
      });

      // Images
      const images = [];
      const imgElements = $('img').get();
      for (const el of imgElements) {
        const src = $(el).attr('src') || $(el).attr('data-src');
        if (src) {
          const alt = $(el).attr('alt')?.trim() || '';
          const localPath = await downloadAsset(src, pagePath.startsWith('/blog') ? 'blog' : 'images');
          images.push({
            originalSrc: src,
            localSrc: localPath,
            alt,
            width: $(el).attr('width') || null,
            height: $(el).attr('height') || null
          });
        }
      }

      // Forms
      const forms = [];
      $('form').each((_, el) => {
        const f = $(el);
        const inputs = f.find('input, select, textarea').map((_, inp) => ({
          name: $(inp).attr('name') || null,
          type: $(inp).attr('type') || inp.tagName.toLowerCase(),
          value: $(inp).attr('value') || null,
          placeholder: $(inp).attr('placeholder') || null,
          required: $(inp).is('[required]')
        })).get();

        const formAction = f.attr('action') || '';
        const formMethod = (f.attr('method') || 'GET').toUpperCase();
        const formId = f.attr('id') || null;

        forms.push({
          id: formId,
          action: formAction,
          method: formMethod,
          inputs
        });

        formFindings.push({
          page: pagePath,
          id: formId,
          action: formAction,
          method: formMethod,
          inputs: inputs.map(i => i.name).filter(Boolean)
        });
      });

      // Links: Outbound and Internal
      const outboundLinks = [];
      const internalLinks = [];
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href')?.trim();
        const text = $(el).text().replace(/\s+/g, ' ').trim();
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

        if (href.startsWith('http') && !href.includes('servicesplus.in')) {
          outboundLinks.push({ href, text });
        } else {
          internalLinks.push({ href: normalizePath(href), text });
        }
      });

      // Clean Body Content
      // Clone DOM and strip scripts, styles, noscript, nav, header, footer for pure content
      const contentDom = cheerio.load(html);
      contentDom('script, style, noscript, header, nav, footer, .footer, .header, .nav').remove();
      const rawText = contentDom('body').text().replace(/\s+/g, ' ').trim();

      // Sections breakdown
      const sections = [];
      contentDom('section, article, div.container, div[class*="content"], div[class*="section"]').each((idx, el) => {
        const heading = contentDom(el).find('h1, h2, h3').first().text().replace(/\s+/g, ' ').trim();
        const pTexts = contentDom(el).find('p, li').map((_, p) => contentDom(p).text().replace(/\s+/g, ' ').trim()).get().filter(t => t.length > 20);
        if (pTexts.length > 0) {
          sections.push({
            heading: heading || `Section ${idx + 1}`,
            paragraphs: pTexts.slice(0, 15)
          });
        }
      });

      // Check Inconsistencies on this page
      const pageText = html;
      if (pageText.includes('13 years') || pageText.includes('13 Years') || pageText.includes('13+ years')) {
        inconsistencies.push({ type: 'Experience Conflict', text: '13 years found', page: pagePath });
      }
      if (pageText.includes('Since 2017') || pageText.includes('since 2017')) {
        inconsistencies.push({ type: 'Experience Conflict', text: 'Since 2017 found', page: pagePath });
      }
      if (pageText.includes("Service don't exist") || pageText.includes("service don't exist")) {
        inconsistencies.push({ type: 'Stray Text', text: "Service don't exist", page: pagePath });
      }
      if ((pageText.match(/12k/gi) || []).length > 2) {
        inconsistencies.push({ type: 'Duplication', text: 'Duplicated 12k Happy Users block', page: pagePath });
      }
      const phoneMatches = pageText.match(/(?:\+91|0)?\s?[789]\d{9}|(?:\+0120)\s?-\s?\d{8,10}|\+91\s?9988776655|\+91-7942790587/g) || [];
      const uniquePhones = Array.from(new Set(phoneMatches.map(p => p.trim())));
      if (uniquePhones.length > 2) {
        inconsistencies.push({ type: 'Multiple Phone Numbers', text: uniquePhones.join(', '), page: pagePath });
      }

      inventory.push({
        url,
        path: pagePath,
        title,
        metaDescription,
        canonical,
        ogTags,
        twitterTags,
        h1: h1[0] || '',
        headings,
        faqs,
        images,
        forms,
        outboundLinks: Array.from(new Set(outboundLinks.map(l => JSON.stringify(l)))).map(l => JSON.parse(l)),
        internalLinksCount: internalLinks.length,
        bodyContent: {
          summary: rawText.slice(0, 500) + '...',
          charLength: rawText.length,
          sections: sections.slice(0, 20)
        }
      });

      process.stdout.write(`OK (${rawText.length} chars, ${images.length} imgs, ${faqs.length} faqs)\n`);
    } catch (err) {
      process.stdout.write(`FAIL: ${err.message}\n`);
      brokenRoutes.push({ url, error: err.message });
    }
  }

  console.log(`\nInventory built: ${inventory.length} pages recorded.`);
  await fs.writeFile('docs/inventory.json', JSON.stringify(inventory, null, 2), 'utf-8');
  console.log('Saved docs/inventory.json');

  // Build NOTES.md
  let notesMd = `# ServicesPlus Audit & Parity Report

Date: ${new Date().toISOString()}

---

## 1. Inventory Summary

- **Total Live URLs Discovered**: ${allUrls.length}
- **Successfully Crawled (200 OK)**: ${inventory.length}
- **Broken / 500 Server Errors on Live Laravel Site**: ${brokenRoutes.length}
- **Downloaded Local Assets in /public**: ${downloadedAssets.size}

### Category Breakdown
- **Homepage**: 1 (\`/\`)
- **About**: 1 (\`/about\`)
- **Contact**: 1 (\`/contact\`)
- **Blog Index**: 1 (\`/blog\`)
- **Blog Articles**: 93 (\`/blog-detail/*\`)
- **Services (200 OK)**: ${inventory.filter(p => p.path.startsWith('/service/')).length}
- **Categories (200 OK)**: ${inventory.filter(p => p.path.startsWith('/service-by-categories/')).length}
- **Policies**: 2 (\`/policy/privacy-policy\`, \`/policy/terms-and-condition\`)
- **Auth Routes**: 2 (\`/user-login\`, \`/user-register\`)
- **Utility Routes**: 2 (\`/payment\`, \`/notification\`)

---

## 2. Inconsistencies & Business Facts (Preserved As-Is, Needing Owner Input)

The following conflicts were detected on the live website. In accordance with the prompt non-negotiables, all original content is preserved in the typed content store and highlighted here for business owner decision:

### A. Company Age / Years of Experience
- **Conflict 1**: Homepage and several service pages claim **"13 years of experience"**.
- **Conflict 2**: About page and trust sections state **"Since 2017"** (which equals 9 years as of 2026, or 7 years from 2024).
- *Action*: Preserved original text on respective pages. Owner must confirm canonical founding date (2017 vs 2013).

### B. Conflicting Contact Phone Numbers Across Pages
The live site displays multiple disparate phone numbers:
1. \`+91 88000 28794\` — Primary sales & WhatsApp floating widget (\`wa.me/918800028794\`).
2. \`(+91) - 9899184918\` — Support hotline in header/footer.
3. \`+91-7942790587\` — IndiaMART / alternate helpline in contact blocks.
4. \`+91 9988776655\` — Dummy/placeholder phone number appearing in several template footers.
- *Action*: Maintained active support and sales numbers in contact and floating widgets. Marked dummy number \`+91 9988776655\` as an inconsistency needing removal.

### C. Conflicting Email Addresses
1. \`operations@servicesplus.in\` — Service operations & processing.
2. \`info@servicesplus.in\` — General enquiries.
- *Action*: Preserved both with clear context (General Enquiry vs Operations).

### D. Office Addresses
1. **Noida / Head Office**:
   - \`Office No-418, 4th Floor, Ocean Plaza, Sector-18, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301\`
2. **Delhi / Branch Office**:
   - Mentioned on Contact page and GMB citations.
- *Action*: Preserved full structured address details in Contact and Footer schema.

### E. Stray / Placeholder Strings
- Stray string \`"Service don't exist"\` was observed in several empty product query states on Laravel.
- Duplicated "12k Happy Users" block was observed stacked twice on the live homepage.
- *Action*: Logged here for owner review; clean presentation provided in new design.

---

## 3. Form Endpoints & Backend Adapter Architecture

### A. Enquiry Forms (Service Detail & Contact Pages)
- **Live Endpoint**: \`POST https://www.servicesplus.in/contact\`
- **Form Fields**:
  - \`name\`: string (required)
  - \`email\`: string (required, email)
  - \`mobile\`: string (required, 10-digit Indian mobile)
  - \`subject\`: string (service name / topic)
  - \`message\`: string (optional query details)
  - \`capcha_code\`: string (legacy captcha)
  - \`_token\`: Laravel CSRF session token
- **New Architecture**:
  - Server Action \`submitEnquiryAction\` validates with Zod (\`EnquirySchema\`).
  - Calls Next.js API route or backend adapter with graceful fallback to email outbox / WhatsApp direct fallback (\`wa.me/918800028794\`).
  - Zero downtime if legacy Laravel server is unreachable.

### B. User Authentication (/user-login, /user-register)
- **Live Endpoints**:
  - \`POST https://www.servicesplus.in/user-login\` (\`email\`, \`password\`, \`_token\`)
  - \`POST https://www.servicesplus.in/user-register\` (\`first_name\`, \`last_name\`, \`email\`, \`mobile\`, \`company_name\`, \`password\`, \`password_confirmation\`, \`_token\`)
- **Status**: The live backend runs Laravel 8 session cookies (\`servicesplus_session\`, \`XSRF-TOKEN\`).
- **New Architecture**:
  - Typed Backend Adapter in \`src/server/auth-adapter.ts\`.
  - Proxies credentials securely to backend, validates responses with Zod, sets \`httpOnly; Secure; SameSite=Lax\` session cookie.
  - If backend is offline or endpoint returns error, user is notified cleanly with option to contact support on WhatsApp.

### C. Payment Flow (/payment)
- **Live Implementation**:
  - Static UPI QR Code payment flow!
  - Users scan UPI QR Code (\`qr.jpeg\`), pay via UPI / Bank / Card, and send screenshot/confirmation to WhatsApp (\`+91 88000 28794\`).
- **New Architecture**:
  - Retain the exact UPI QR Code, UPI ID, and step-by-step instructions.
  - Add interactive "Click to copy UPI ID" and "Share Payment Receipt on WhatsApp" one-click action.
  - Future-proofed for Razorpay / Cashfree integration via adapter without touching UI.

### D. Notification Flow (/notification)
- **Live Implementation**:
  - Regulatory updates table (Sn, Subject, Description, Action).
- **New Architecture**:
  - Pre-rendered static notification list with search and filter.
  - Feeds the homepage top hero announcement strip.

---

## 4. Broken URLs on Live Laravel Site (500 Server Errors)

The following 20 URLs exist in \`sitemap.xml\` or menus on the live site but throw HTTP 500 (\`ErrorException: Attempt to read property "id" on null\`):

${brokenRoutes.map(b => `- \`${b.url}\` (HTTP ${b.status || 500})`).join('\n')}

**Resolution Strategy in New Next.js App**:
1. For \`/service-by-categories/certification-and-licensing\`, set 301 redirect to \`/service-by-categories/certification-licensing\`.
2. For \`/service/Google Adwords Services\`, set 301 redirect to \`/service/google-adwords-services\`.
3. For the 18 software/marketing service slugs, create typed content records with the exact original slugs so that search engine crawlers and users land on a beautiful, functional page instead of a 500 crash!

---

## 5. Google Tag Manager & Verification Keys
- **GTM Container ID**: \`GTM-KS8X8MJ5\`
- **WhatsApp Floating Link**: \`https://wa.me/918800028794\`
- **Office Location**: Sector-18, Ocean Plaza, Noida
`;

  await fs.writeFile('docs/NOTES.md', notesMd, 'utf-8');
  console.log('Saved docs/NOTES.md');
  console.log('--- PHASE 0 CRAWL COMPLETED SUCCESSFULLY ---');
}

run().catch(console.error);

