// Dev-only: runs axe-core (WCAG 2.2 AA tags) against the built site served by `astro preview`.
// Needs `npm run build` first and a local Chrome/Edge (set CHROME_PATH to override). No browser is downloaded.
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];
const executablePath = candidates.find((p) => p && existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Edge found. Set CHROME_PATH.");
  process.exit(2);
}

const port = 4399;
const server = spawn(
  process.execPath,
  ["node_modules/astro/bin/astro.mjs", "preview", "--port", String(port)],
  {
    stdio: "ignore",
  },
);
const stop = () => server.kill();

try {
  const url = `http://localhost:${port}/`;
  for (let i = 0; i < 50; i++) {
    if (
      await fetch(url).then(
        (r) => r.ok,
        () => false,
      )
    )
      break;
    await new Promise((r) => setTimeout(r, 200));
  }
  const browser = await puppeteer.launch({ executablePath, headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(axeSource);
  const { violations } = await page.evaluate(() =>
    // eslint-disable-next-line no-undef
    axe.run({ runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] }),
  );
  await browser.close();
  console.log(`axe violations: ${violations.length}`);
  for (const v of violations) {
    console.log(`- ${v.id} (${v.impact}): ${v.help}`);
    for (const n of v.nodes) console.log(`    ${n.target.join(" ")}`);
  }
  stop();
  process.exit(violations.length ? 1 : 0);
} catch (e) {
  console.error(e);
  stop();
  process.exit(2);
}
