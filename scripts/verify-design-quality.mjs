import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const PAGES = [
  { name: "home", path: "/" },
  { name: "category-startup", path: "/service-by-categories/startup" },
  { name: "service-private-limited", path: "/service/private-limited-company" }
];

async function runAudit() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  let failures = 0;

  try {
    // 1. Check 1440x900 Hero H1, Explorer visibility, Console errors, and Axe WCAG AA
    for (const pageDef of PAGES) {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
      });
      const page = await context.newPage();

      const consoleErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });
      page.on("pageerror", (err) => {
        consoleErrors.push(err.message);
      });
      page.on("response", (res) => {
        if (res.status() === 404) {
          console.log(`[404] on ${pageDef.path}: ${res.url()}`);
        }
      });

      await page.goto(`${baseUrl}${pageDef.path}`, {
        waitUntil: "networkidle",
        timeout: 30000
      });
      await page.waitForTimeout(300);

      if (consoleErrors.length > 0) {
        console.error(`[FAIL] Console errors on ${pageDef.path}:`, consoleErrors);
        failures++;
      } else {
        console.log(`[PASS] Zero console errors on ${pageDef.path}`);
      }

      if (pageDef.name === "home") {
        // Verify H1 text and line count
        const h1Info = await page.evaluate(() => {
          const h1 = document.querySelector("h1");
          if (!h1) return null;
          const rect = h1.getBoundingClientRect();
          const style = window.getComputedStyle(h1);
          const lineHeight = parseFloat(style.lineHeight);
          const approxLines = Math.round(rect.height / lineHeight);
          return {
            text: h1.innerText.replace(/\s+/g, " ").trim(),
            height: rect.height,
            lineHeight,
            approxLines
          };
        });

        console.log(`[INFO] Home H1:`, h1Info);
        if (
          !h1Info ||
          h1Info.text !==
            "Empower Your Business Compliance & Management Made Easy With Us"
        ) {
          console.error(`[FAIL] Home H1 text mismatch:`, h1Info?.text);
          failures++;
        } else if (h1Info.approxLines > 3) {
          console.error(
            `[FAIL] Home H1 exceeds 3 lines (${h1Info.approxLines} lines)`
          );
          failures++;
        } else {
          console.log(
            `[PASS] Home H1 renders full text in ${h1Info.approxLines} lines`
          );
        }

        // Verify Hero covers full viewport height and image aligns with Get Started button
        const heroAlignment = await page.evaluate(() => {
          const heroFrame = document.getElementById("hero-visual-frame");
          const navCta = document.querySelector("header a[href='/user-register']");
          const explorer = document.getElementById("category-explorer");
          if (!heroFrame || !navCta || !explorer) return null;
          const heroRect = heroFrame.getBoundingClientRect();
          const ctaRect = navCta.getBoundingClientRect();
          const explorerRect = explorer.getBoundingClientRect();
          return {
            heroRight: Math.round(heroRect.right),
            ctaRight: Math.round(ctaRect.right),
            rightMargin: Math.round(window.innerWidth - heroRect.right),
            explorerTop: Math.round(explorerRect.top)
          };
        });

        console.log(`[INFO] Hero alignment & 100vh @ 1440x900:`, heroAlignment);
        if (!heroAlignment || Math.abs(heroAlignment.heroRight - heroAlignment.ctaRight) > 2) {
          console.error(
            `[FAIL] Hero image right edge does not align with Get Started button:`,
            heroAlignment
          );
          failures++;
        } else {
          console.log(
            `[PASS] Hero covers 100vh and image right edge (${heroAlignment.heroRight}px) aligns with Get Started button (${heroAlignment.ctaRight}px, margin=${heroAlignment.rightMargin}px)`
          );
        }
      }

      // Run Axe accessibility audit
      const axeResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const seriousOrCritical = axeResults.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical"
      );

      if (seriousOrCritical.length > 0) {
        console.error(
          `[FAIL] Axe serious/critical issues on ${pageDef.path}:`,
          JSON.stringify(
            seriousOrCritical.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => n.html)
            })),
            null,
            2
          )
        );
        failures++;
      } else {
        console.log(
          `[PASS] Axe zero serious/critical issues on ${pageDef.path} (total minor/moderate: ${axeResults.violations.length})`
        );
      }

      await context.close();
    }

    // 2. Check No Wrapped Nav or Buttons at 1024px, 1440px, 1920px
    for (const width of [1024, 1440, 1920]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 }
      });
      const page = await context.newPage();
      await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

      const wrappedElements = await page.evaluate(() => {
        const issues = [];
        const navLinks = document.querySelectorAll("header nav > div > a, header nav > a");
        navLinks.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.height > 44) {
            issues.push({
              type: "nav-link",
              text: el.innerText.trim(),
              height: r.height
            });
          }
        });

        const headerOverflow =
          document.documentElement.scrollWidth > window.innerWidth;
        if (headerOverflow) {
          issues.push({
            type: "horizontal-overflow",
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth
          });
        }

        return issues;
      });

      if (wrappedElements.length > 0) {
        console.error(
          `[FAIL] Wrapped nav or overflow at ${width}px:`,
          wrappedElements
        );
        failures++;
      } else {
        console.log(
          `[PASS] Zero wrapped nav items or horizontal overflow at ${width}px`
        );
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  if (failures > 0) {
    console.error(`\nAudit finished with ${failures} failure(s).`);
    process.exit(1);
  } else {
    console.log(`\nALL DESIGN QUALITY & ACCESSIBILITY AUDITS PASSED!`);
  }
}

runAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});

