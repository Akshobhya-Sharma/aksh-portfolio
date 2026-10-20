# Aksh Portfolio — Project Log

## 2026-10-19 — Project scaffolded

**Done:** Astro project generated with `create-astro` (minimal template, strict TypeScript) on branch `chore/scaffold`. ESLint with Astro + jsx-a11y (strict) rules, `astro check` for types, GitHub Pages deploy workflow, `public/CNAME` for uxaksh.ca. Placeholder home page only.

**Stack:** Astro 7 (static output), plain CSS with custom properties, TypeScript (strict), Node 24, npm, GitHub Actions → GitHub Pages.

**Key decisions (from `specs/_project.md`):**
- Astro static output: no JS by default; plain HTML/CSS that GitHub Pages serves.
- Plain CSS + custom properties, no Tailwind: clean, readable code; tokens.css and main.css already exist.
- No client UI framework: keeps JS and memory low (Aksh's phone crashes on heavy pages).
- Case studies as Markdown in a content collection: a new case study is one new file.
- Side nav generated from headings: no manual nav upkeep.
- Shiki for code windows: build-time highlighting, zero client JS.
- Noise tile over CSS gradient + build-time contrast check: cheap rendering, enforced readable text (AAA for text).
- CSS-only motion with reduced-motion fallback; cross-document View Transitions as enhancement.
- Fonts: Newsreader and Figtree (self-hosted) replace Gambetta/Satoshi over licensing.
- No analytics or trackers: privacy by default.
- GitHub Pages + NameSilo DNS: ~$0/month beyond the domain.

**Scaffold decisions:**
- TypeScript strict (brief left it open): enables `astro check` and typed content collections; no runtime cost.
- ESLint pinned to v9: eslint-plugin-jsx-a11y does not support ESLint 10 yet.
- `npm audit` reports 5 high issues in the dev-only lint chain (braces via astro-eslint-parser); not shipped to the site. Revisit when eslint-plugin-astro updates.

**Next:** finish Milestone 1 (Pages + DNS live on uxaksh.ca), then Milestone 2 foundation (move and fix tokens.css/main.css).

## 2026-10-20 — Homepage built (specs/homepage.md, then specs/homepage-improvement.md)

**Done:** Homepage built in four phases plus an improvement pass, on branch `feat/phase-development`, not committed. Hero, skill set, toolkit, projects (data-driven categories and cards), contact footer. Specs: `specs/homepage.md` (build) and `specs/homepage-improvement.md` (polish). Spec not yet archived to `specs/done/`.

**Gate 1 decisions:**
- AA is the pass bar; text aims for AAA.
- Tokens moved from `setup_docs/` to `src/styles/`. There is no `design/tokens.md`; `tokens.css` is the source.
- Fonts self-hosted (woff2 in `public/fonts`, OFL licences alongside). No @fontsource npm packages.
- axe added as a gate (`npm run a11y`).
- Highlight colour is per project; the homepage has its own accent.
- Contact email: leoaksh@live.in.
- Nav labels lowercase.
- Read-more links go to `/work/<slug>`, which 404 until the case study milestones.

**Phase 1, foundation:**
- `git mv` of tokens.css and main.css into `src/styles/`. Font-size px tokens converted to rem.
- New tokens: accents (home, huana, figwrite, tyia), `--color-focus`, tile gradients (blue and green, core and edge), `--noise-image`, `--target-size`, focus-ring tokens, `--space-24`. `--color-white` added later.
- New `src/styles/fonts.css`; woff2 and OFL licences in `public/fonts`, taken from the @fontsource tarballs.
- New `src/layouts/BaseLayout.astro`: skip link, `:focus-visible` ring plus forced-colors, reduced-motion reset, font preloads.
- Removed from main.css: old header, side-nav, main-grid, footer and full-bleed rules.

**Phase 2, content and shell:**
- `src/data/home.ts` as a typed content model (colours as token names, never hex).
- `src/assets/logo.svg` switched to `currentColor`.
- New Header, Hero, SkillSet and Toolkit components.
- Toolkit `ul` has `role="list"` with an eslint-disable for no-redundant-roles.

**Phase 3, projects:**
- New Projects, CategoryTile and ProjectCard components. Categories are data-driven; a category with no projects is not rendered.
- One stretched "Read more about X" link per card; the focus ring is drawn on the card.
- `public/images/placeholder.svg` for projects without images.
- `scripts/contrast-check.mjs` (`npm run contrast`, included in `npm run check`).
- Tile colours swapped to match the design: design and coding is blue, UX/UI is green.

**Phase 4, footer and a11y gate:**
- New Footer.astro: sr-only h2 "Connect", mailto link, `extraLines` from home.ts.
- `scripts/a11y.mjs` (`npm run a11y`): needs `npm run build` first; uses local Chrome/Edge or `CHROME_PATH`; serves with `astro preview` on port 4399; axe with WCAG 2.2 AA and best-practice tags.

**Improvement pass:**
- New `src/components/Icon.astro` inlines Phosphor SVGs at build time. Icon chosen per item in home.ts. Skills: microscope, wheelchair, code-block, robot. CTA: arrow-down. Cards: arrow-circle-right. Back to top: arrow-up.
- Back to top is a plain `<a href="#top">`, no JS. Placeholder alt is `""`. `tabindex` removed from main.
- Newsreader 400 removed; tile and card headings use 300.
- Hero is two columns at 1024px and up. Sections separated by a 1px neutral-200 bottom border. Skills in an auto-fit grid.
- Toolkit: intro beside the tools; full-width `--color-light` background.
- Cards equal height with Read more pinned to the bottom. Hover and focus: light background, outline, dark button border, inverted icon circle. Transitions only under `prefers-reduced-motion: no-preference`.
- Removed unused `.grid*` utilities, `main:focus`, `--nav-max-width` and `--nav-icon-size`.
- The "No islands detected" message in the Astro toolbar is expected: the page ships zero JS.

**Verification:**
- `npm run check` passes. axe reports 0 violations.
- Contrast: all text pairs at 7:1 or better, except accents (5.55 to 10.85 on bg) and white on tile cores (5.75 and 6.53). Those are used for large text only.
- No horizontal scroll from 320px to 2560px.
- Tab order: skip link, logo, home, work, connect, See my work, 3 cards, email, Back to top.
- Weight: about 78.8KB loaded (HTML 5.3KB gz, CSS 3.0KB gz, fonts 70.5KB). It was about 100.3KB before the rework.

**Dependencies (dev only, none shipped in the page):**
- axe-core (MPL-2.0): a11y gate.
- puppeteer-core (Apache-2.0): drives the local browser for the a11y gate. No browser download.
- @phosphor-icons/core 2.1.1 (MIT): icon source, build time only, about 18MB installed.
- @types/node 22 (MIT).
- `npm audit` reports known dev-only issues. Not shipped.

**Open items:**
- Real project images and per-project accent colours (placeholders now).
- Toolkit logos.
- Case study pages (the `/work/<slug>` links 404 until built).
- Signal Fire card is in the design but not in the spec.
- No formatter config: home.ts uses double quotes and 2-space indent, other files differ. Prettier optional.
- Manual checks still to do: design match, focus-visible card state, 200% zoom, screen reader, phone.
- Section rule and toolkit background span full width; the design shows them inset.
