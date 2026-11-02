import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const phase = process.argv[2] || 'after';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'category-startup', path: '/service-by-categories/startup' },
  { name: 'service-private-limited', path: '/service/private-limited-company' },
];

const WIDTHS = [360, 768, 1024, 1440, 1920];

async function run() {
  const outDir = path.join(process.cwd(), 'docs', 'design-review', phase);
  const rootReviewDir = path.join(process.cwd(), 'docs', 'design-review');
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(rootReviewDir, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  try {
    for (const pageDef of PAGES) {
      for (const width of WIDTHS) {
        const height = width < 768 ? 800 : 900;
        const context = await browser.newContext({
          viewport: { width, height },
          deviceScaleFactor: 1,
        });
        const page = await context.newPage();

        await page.goto(`${baseUrl}${pageDef.path}`, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(400);

        const viewportFile = path.join(outDir, `${pageDef.name}-${width}px.png`);
        const fullFile = path.join(outDir, `${pageDef.name}-${width}px-full.png`);
        const rootFile = path.join(rootReviewDir, `${phase}-${pageDef.name}-${width}px.png`);

        await page.screenshot({ path: viewportFile, fullPage: false });
        await page.screenshot({ path: fullFile, fullPage: true });
        await fs.copyFile(viewportFile, rootFile);

        console.log(`Captured [${phase}] ${pageDef.name} @ ${width}x${height}`);
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

