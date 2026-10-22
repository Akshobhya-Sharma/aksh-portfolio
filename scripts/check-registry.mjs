// Verifies every relative import in src/data/components.ts resolves from src/content/work/.
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(resolve(root, "src/data/components.ts"), "utf8");
const from = resolve(root, "src/content/work");
const imports = new Set();
// Template-literal helper paths: expand `${name}` using the names passed to imp("...").
for (const [, name] of source.matchAll(/imp\("(\w+)"\)/g))
  imports.add(`../../components/case-study/${name}.astro`);
for (const [, p] of source.matchAll(/from "(\.\.\/[^"$]+)"/g)) imports.add(p);

let failed = false;
for (const p of imports) {
  const ok = existsSync(resolve(from, p));
  if (!ok) failed = true;
  console.log(`${ok ? "OK  " : "MISSING"} ${p}`);
}
process.exit(failed ? 1 : 0);
