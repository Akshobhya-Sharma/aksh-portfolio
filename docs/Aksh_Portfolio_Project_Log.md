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
