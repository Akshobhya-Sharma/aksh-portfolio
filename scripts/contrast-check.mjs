// Dev-only: asserts accent tokens >= 4.5:1 on the page bg, white >= 4.5:1 on every tile core/edge,
// and the text/UI colour pairs used by the page, cards (default and hover) and toolkit section.
// The tile noise overlay is black at low alpha, so it only darkens: white contrast can only improve.
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const hex = {};
for (const [, name, value] of css.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)) hex[name] = value;

const lum = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const bg = hex["--color-primary-bg"];
const checks = [
  ...Object.keys(hex)
    .filter((n) => n.startsWith("--color-accent-"))
    .map((n) => [`${n} on bg`, ratio(hex[n], bg)]),
  ...Object.keys(hex)
    .filter((n) => /^--tile-.+-(core|edge)$/.test(n))
    .map((n) => [`white on ${n}`, ratio("#ffffff", hex[n])]),
];

// [foreground, background, minimum, label]
const pairs = [
  ["--color-dark", "--color-primary-bg", 7, "body text on bg"],
  ["--color-link", "--color-primary-bg", 7, "links on bg"],
  ["--color-neutral-600", "--color-primary-bg", 7, "secondary text on bg"],
  ["--color-dark", "--color-light", 7, "text on light (toolkit, card hover)"],
  ["--color-link", "--color-light", 7, "links on light"],
  ["--color-neutral-600", "--color-light", 7, "secondary text on light"],
  ["--color-light", "--color-dark", 7, "card link text on hover/focus; CTA text"],
  ["--color-light", "--color-neutral-700", 7, "CTA hover text"],
  ["--color-dark", "--color-primary-bg", 7, "card link and icon (default)"],
  ["--color-dark", "--color-light", 3, "card icon circle on hover (UI 3:1)"],
  ["--color-neutral-400", "--color-light", 3, "toolkit tool border on light (UI 3:1)"],
  [
    "--color-neutral-400",
    "--color-primary-bg",
    3,
    "callout, table and card borders on bg (UI 3:1)",
  ],
  ...["note", "insight", "warning"].flatMap((t) => [
    [`--color-callout-${t}`, `--color-callout-${t}-bg`, 7, `callout ${t} label on tint`],
    ["--color-dark", `--color-callout-${t}-bg`, 7, `callout ${t} body text on tint`],
    ["--color-neutral-400", `--color-callout-${t}-bg`, 3, `callout ${t} border on tint (UI 3:1)`],
  ]),
  // Muted callout reuses the neutral tint; its label and border are neutral-700
  [
    "--color-neutral-700",
    "--color-neutral-tint",
    7,
    "callout muted label, Quote cite and border on tint",
  ],
  ["--color-dark", "--color-neutral-tint", 7, "callout muted, Quote and Section body text on tint"],
  ["--color-neutral-400", "--color-neutral-tint", 3, "callout muted border on tint (UI 3:1)"],
  ["--color-link", "--color-neutral-tint", 7, "Section tint links"],
  ["--color-neutral-600", "--color-neutral-tint", 7, "Section tint secondary text"],
];
for (const [fg, bgName, min, label] of pairs)
  checks.push([`${label} (${fg} on ${bgName})`, ratio(hex[fg], hex[bgName]), min]);

// Code theme (src/styles/code-theme.json): every token colour >= 7:1 on the editor background
// (Shiki ignores per-scope backgrounds).
const theme = JSON.parse(
  readFileSync(new URL("../src/styles/code-theme.json", import.meta.url), "utf8"),
);
const codeBg = theme.colors["editor.background"];
const tokenColours = [["editor.foreground", theme.colors["editor.foreground"], codeBg]];
for (const t of theme.tokenColors) {
  const fg = t.settings?.foreground;
  if (fg && /^#[0-9a-f]{6}$/i.test(fg))
    tokenColours.push([[].concat(t.scope ?? []).join(","), fg, codeBg]);
}
let minCode = Infinity;
for (const [, fg, bgc] of tokenColours) minCode = Math.min(minCode, ratio(fg, bgc));
checks.push([`code theme: lowest of ${tokenColours.length} token colours`, minCode, 7]);

let failed = false;
for (const [label, r, min = 4.5] of checks) {
  const ok = r >= min;
  if (!ok) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"} ${r.toFixed(2)}:1 (min ${min})  ${label}`);
}
process.exit(failed ? 1 : 0);
