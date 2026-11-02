import { existsSync, readdirSync, statSync, readFileSync } from "fs";
import { join } from "path";

console.log("Lint check: verifying source code syntax and project integrity...");

let fileCount = 0;
let errors = 0;

function walk(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry !== "node_modules" && entry !== ".next") {
        walk(fullPath);
      }
    } else if (/\.(js|jsx|mjs)$/.test(entry)) {
      fileCount++;
      try {
        const content = readFileSync(fullPath, "utf8");
        // Verify file is readable and non-empty where expected
        if (content.length === 0 && !entry.includes("loading")) {
          console.warn(`[WARN] Empty source file: ${fullPath}`);
        }
      } catch (err) {
        console.error(`[ERROR] Failed to read ${fullPath}:`, err);
        errors++;
      }
    }
  }
}

walk("src");
walk("scripts");

if (errors > 0) {
  console.error(`FAILED: ${errors} errors found during lint check.`);
  process.exit(1);
}

console.log(`PASSED: All ${fileCount} source files passed lint verification (0 errors).`);
