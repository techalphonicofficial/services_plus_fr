import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 412, height: 915 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const h2 = page.locator('h2:has-text("Frequently Asked Questions")');
  await h2.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -20));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'test_faq_original_mobile.png' });

  await browser.close();
})();

