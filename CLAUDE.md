# Project: Aksh portfolio (uxaksh.ca)
Static portfolio: homepage and UX case studies. Keyboard and screen-reader first, low memory use.

## Stack
- Astro 7 (static output, zero client JS), TypeScript strict, plain CSS custom properties, Node 24, npm
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` on push to main; domain in `public/CNAME`

## Commands
- Install: `npm install` · Dev: `npm run dev` · Build: `npm run build`
- Lint: `npm run lint` · Types: `npm run typecheck` · Contrast: `npm run contrast`
- A11y: `npm run a11y` (needs a build first; local Chrome/Edge or CHROME_PATH; axe WCAG 2.2 AA)
- Gate: `npm run check` (lint, typecheck, build, contrast). No test runner yet.

## Structure
- `src/data/home.ts`: all homepage content (typed; colours are token names)
- `src/components/`: Header, Hero, SkillSet, Toolkit, Projects, CategoryTile, ProjectCard, Footer, Icon
- `src/layouts/BaseLayout.astro`: skip link, focus ring, reduced motion, font preloads
- `src/styles/`: `tokens.css` (token source), `main.css`, `fonts.css`
- `public/fonts` (woff2 + OFL), `public/images`, `src/assets/logo.svg`
- `specs/`: contracts (`_project.md` is the site brief). `design/`: PNG screenshots, open only when asked.

## Conventions
- Component CSS uses tokens only: no hex, px spacing or font literals.
- Homepage copy and data go in `src/data/home.ts`, not in components.
- Icons: `Icon.astro` inlines `@phosphor-icons/core` SVGs at build time; pick by name in home.ts.
- Lists whose list-style is reset keep `role="list"`; the no-redundant-roles disable there is intentional.
- Motion: transform and opacity only; transitions only under `prefers-reduced-motion: no-preference`.
- Text contrast aims AAA (7:1+). Accent colours and white on tile cores are for large text only.
- Nav labels are lowercase. Back to top is `<a href="#top">`.
- Images: `public/images/`, explicit width and height. Placeholder: `image: placeholder()` in home.ts.

## Do not
- Add client JS, islands, UI frameworks, Tailwind, a CMS, analytics or trackers.
- Use neutral-100 to 400 greys for text.
- Invent metrics or claims not backed by git history or notes.
- Exceed 100KB transferred per page, excluding lazy images (homepage is about 79KB).

## Open items
- Real project images and per-project accent colours (placeholders now). Toolkit logos.
- Signal Fire card: in the design, not in the spec.
- Case study pages: `/work/<slug>` links 404 until built.
- Manual checks: design match, card focus-visible, 200% zoom, screen reader, phone.
- Section rule and toolkit background span full width (design shows them inset).
- No formatter config: home.ts uses double quotes and 2-space indent.

## Reference
Human project log (not for agent context): `docs/Aksh_Portfolio_Project_Log.md`
