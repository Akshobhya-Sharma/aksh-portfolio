# aksh-portfolio

Portfolio site for Aksh (uxaksh.ca): a homepage and UX case studies. Static output, no client JavaScript, built for keyboard and screen-reader use first.

## Stack

- [Astro](https://astro.build) 7, static output, TypeScript (strict)
- Plain CSS with custom properties (no Tailwind, no UI framework)
- Self-hosted fonts (Newsreader, Figtree)
- Icons from [Phosphor](https://phosphoricons.com), inlined at build time
- Node 24, npm

## Requirements

- Node 22.22 or newer (Node 24 recommended)
- For `npm run a11y` only: a local Chrome or Edge, or set `CHROME_PATH`

## Scripts

| Command | What it does | Needs |
| --- | --- | --- |
| `npm install` | Install dependencies | Node |
| `npm run dev` | Local dev server | Node |
| `npm run build` | Static build to `dist/` | Node |
| `npm run preview` | Serve the built `dist/` | a build |
| `npm run lint` | ESLint (including jsx-a11y rules) | Node |
| `npm run typecheck` | `astro check` (TypeScript and Astro) | Node |
| `npm run contrast` | Checks text and accent colours against the backgrounds | Node |
| `npm run a11y` | axe scan (WCAG 2.2 AA) of the built site | a build, plus Chrome or Edge |
| `npm run check` | lint, typecheck, build and contrast, in that order | Node |

`npm run a11y` builds nothing itself: run `npm run build` first. It serves `dist/` on port 4399 and does not download a browser.

## Project structure

```
src/
  data/home.ts          All homepage content (edit this to change the page)
  components/           Header, Hero, SkillSet, Toolkit, Projects, CategoryTile,
                        ProjectCard, Footer, Icon
  layouts/BaseLayout.astro  Skip link, focus styles, reduced motion, font preloads
  pages/index.astro     The homepage
  styles/               tokens.css (design tokens), main.css, fonts.css
  assets/logo.svg
public/
  fonts/                Self-hosted woff2 and OFL licence files
  images/               Project images (placeholder.svg for now)
  CNAME                 Custom domain for GitHub Pages
scripts/                a11y.mjs, contrast-check.mjs
specs/                  Feature specs (the build contract)
design/                 Figma screenshots (PNG)
```

## Editing content

All homepage text, links, projects and icons live in `src/data/home.ts`. Components do not hold copy.

- **Categories:** add `{ id, title, gradient }` to `categories`. Gradient is `"tile-blue"` or `"tile-green"`. A category with no projects is not rendered.
- **Projects:** add an entry to `projects` with a unique `slug`, a `categoryId` that matches a category, an `accent` and an `image`. Change `categoryId` to move a card. Array order is page order. The `slug` is used for `/work/<slug>`, which is not built yet.
- **Images:** put the file in `public/images/`, then replace the project's `image: placeholder()` with `{ src: "/images/<file>", alt: "...", width, height }`. Give real pixel dimensions. Use `alt: ""` for purely decorative images. Do not start alt text with "image" or "photo".
- **Accents:** `accent` is a token name. To add one, define `--color-accent-<name>` in `src/styles/tokens.css`, add it to `AccentToken`, and run `npm run contrast`. Accents must reach 4.5:1 on the page background.
- **Gradients:** the `--tile-*` values in `tokens.css`. White text on them must stay at 4.5:1 or better; `npm run contrast` checks this.
- **Icons:** set a skill's `icon` to any Phosphor icon name, for example `"microscope"`. Browse names at phosphoricons.com.
- **Footer:** `footer.email` sets the mailto link. `footer.extraLines` sets the small print lines below it.

## Design tokens

`src/styles/tokens.css` is the only place for colours, spacing, type sizes and focus styles. Component CSS refers to tokens and does not hard-code values.

## Fonts and icons, with licences

- **Newsreader** (headings), SIL Open Font License 1.1. Licence: `public/fonts/OFL-Newsreader.txt`
- **Figtree** (body text), SIL Open Font License 1.1. Licence: `public/fonts/OFL-Figtree.txt`
- Font files are woff2 in `public/fonts/`, loaded with `font-display: swap` from `src/styles/fonts.css`.
- **Phosphor Icons** (`@phosphor-icons/core`), MIT licence. Used at build time only. The package is about 18MB installed, but none of it is shipped to the browser.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. The custom domain is set in `public/CNAME`. Fonts are served from `public/fonts/` as static files.

## Accessibility and performance targets

- WCAG 2.2 AA is the floor; text contrast aims for AAA (7:1 or better).
- No client JavaScript on the homepage. Page weight is about 79KB transferred, against a 100KB limit per page.
- Motion is limited to transform and opacity and respects `prefers-reduced-motion`.
