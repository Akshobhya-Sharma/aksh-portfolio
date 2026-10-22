// Dev-only: runs axe-core (WCAG 2.2 AA tags) against the built site served by `astro preview`.
// Needs `npm run build` first and a local Chrome/Edge (set CHROME_PATH to override). No browser is downloaded.
import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
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

// --dev audits /components on `astro dev` (the page is not in the build); default audits the built site.
const dev = process.argv.includes("--dev");
const port = 4399;
const server = spawn(
  process.execPath,
  ["node_modules/astro/bin/astro.mjs", dev ? "dev" : "preview", "--port", String(port)],
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
  const runAxe = (page) =>
    page.evaluate(() =>
      // eslint-disable-next-line no-undef
      axe.run(
        { exclude: [["astro-dev-toolbar"]] },
        { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
      ),
    );
  const paths = dev ? ["/components"] : ["/"];
  if (!dev && existsSync("dist/work"))
    for (const d of readdirSync("dist/work", { withFileTypes: true }))
      if (d.isDirectory()) paths.push(`/work/${d.name}/`);
  const browser = await puppeteer.launch({ executablePath, headless: true });
  const page = await browser.newPage();
  let failures = 0;
  for (const path of paths) {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${port}${path}`, { waitUntil: "networkidle0" });
    await page.evaluate(axeSource);
    const { violations } = await runAxe(page);
    // Narrow viewport: also re-run axe (mobile nav variant) and check for sideways scroll.
    await page.setViewport({ width: 320, height: 800 });
    // eslint-disable-next-line no-undef
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > 320);
    await page.evaluate(axeSource);
    const narrow = await runAxe(page);
    console.log(
      `${path}: axe violations ${violations.length} (1280px), ${narrow.violations.length} (320px); horizontal scroll at 320px: ${overflow ? "YES" : "no"}`,
    );
    for (const v of [...violations, ...narrow.violations]) {
      console.log(`- ${v.id} (${v.impact}): ${v.help}`);
      for (const n of v.nodes) console.log(`    ${n.target.join(" ")}`);
    }
    failures += violations.length + narrow.violations.length + (overflow ? 1 : 0);
  }
  await browser.close();
  stop();
  process.exit(failures ? 1 : 0);
} catch (e) {
  console.error(e);
  stop();
  process.exit(2);
}
