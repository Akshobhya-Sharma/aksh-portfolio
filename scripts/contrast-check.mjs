// Dev-only: asserts accent tokens >= 4.5:1 on the page bg, white >= 4.5:1 on every tile core/edge,
// and the text/UI colour pairs used by the page, cards (default and hover) and toolkit section.
// The tile noise overlay is black at low alpha, so it only darkens: white contrast can only improve.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
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

const bg = hex['--color-primary-bg'];
const checks = [
	...Object.keys(hex)
		.filter((n) => n.startsWith('--color-accent-'))
		.map((n) => [`${n} on bg`, ratio(hex[n], bg)]),
	...Object.keys(hex)
		.filter((n) => /^--tile-.+-(core|edge)$/.test(n))
		.map((n) => [`white on ${n}`, ratio('#ffffff', hex[n])]),
];

// [foreground, background, minimum, label]
const pairs = [
	['--color-dark', '--color-primary-bg', 7, 'body text on bg'],
	['--color-link', '--color-primary-bg', 7, 'links on bg'],
	['--color-neutral-600', '--color-primary-bg', 7, 'secondary text on bg'],
	['--color-dark', '--color-light', 7, 'text on light (toolkit, card hover)'],
	['--color-link', '--color-light', 7, 'links on light'],
	['--color-neutral-600', '--color-light', 7, 'secondary text on light'],
	['--color-light', '--color-dark', 7, 'button text / card icon arrow (default)'],
	['--color-light', '--color-neutral-700', 7, 'CTA hover text'],
	['--color-dark', '--color-light', 3, 'card hover icon arrow and button border (UI 3:1)'],
	['--color-neutral-400', '--color-light', 3, 'toolkit tool border on light (UI 3:1)'],
];
for (const [fg, bgName, min, label] of pairs) checks.push([`${label} (${fg} on ${bgName})`, ratio(hex[fg], hex[bgName]), min]);

let failed = false;
for (const [label, r, min = 4.5] of checks) {
	const ok = r >= min;
	if (!ok) failed = true;
	console.log(`${ok ? "PASS" : "FAIL"} ${r.toFixed(2)}:1 (min ${min})  ${label}`);
}
process.exit(failed ? 1 : 0);
