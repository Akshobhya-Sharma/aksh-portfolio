# Project: Aksh portfolio

Static portfolio: homepage and UX case studies. Keyboard and screen-reader first, low memory use. Viewed locally for now; uxaksh.ca is not connected.

## Stack

- Astro 7 (static, zero client JS), `@astrojs/mdx` (case studies are MDX, not plain Markdown), TypeScript strict, plain CSS custom properties, Node 24 (`.nvmrc`), npm
- Prettier 3 with prettier-plugin-astro (dev only)
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` on push to main. `site` in astro.config.mjs and `public/CNAME` are staged for uxaksh.ca. No `base` is set, so a github.io/<repo> deploy would 404 assets.

## Commands

- Install `npm install` · Dev `npm run dev` · Build `npm run build`
- Format `npm run format` (writes) · `npm run format:check` (read-only)
- Lint `npm run lint` · Types `npm run typecheck` · Contrast `npm run contrast`
- A11y `npm run a11y` (needs a build; Chrome/Edge or CHROME_PATH; axe WCAG 2.2 AA) also audits built /work/* pages at 1280px and 320px; `npm run a11y:dev` audits /components.
- Gate `npm run check`: format:check, lint, typecheck, build, contrast, check:registry. No test runner yet.

## Structure

- `src/data/home.ts`: all homepage content (typed; colours are token names)
- `src/components/`: Header, Hero, SkillSet, Toolkit, Projects, CategoryTile, ProjectCard, Footer, Icon
- `src/content.config.ts` (`work` collection), `src/content/work/*.mdx` (case studies; use `width`, not `layout`, in frontmatter), `src/pages/work/[slug].astro`, `src/layouts/CaseStudy.astro`
- `src/components/case-study/`: Callout, StatGrid/StatCard, DataTable, Figure (MDX components), SideNav/PageNavList. Registry `src/data/components.ts` drives the dev-only `/components` page (`src/pages/[dev].astro`, not in the build); `npm run check:registry` verifies its import paths. Code theme: `src/styles/code-theme.json` (contrast-checked).
- Case study workflow: copy `templates/case-study.mdx` (not matched by the glob) to `src/content/work/<slug>.mdx`. Each case study needs at least one `##` heading (side nav is built from them). New component: spec from `specs/_component.template.md` into `specs/components/<name>.md`, build in `src/components/case-study/`, add a registry entry and a live example on `[dev].astro`, then run `check`, `a11y`, `a11y:dev`. Draft entries show in dev only.
- `src/layouts/BaseLayout.astro`: skip link markup, font preloads, style imports
- `src/styles/`: `tokens.css` (tokens), `main.css` (focus ring, reduced motion, shell, sections), `fonts.css`
- `public/fonts`, `public/images`, `src/assets/logo.svg`, `eslint.config.js`, `.prettierrc`, `.prettierignore`
- `specs/`: contracts; `_project.md` is the site brief. Specs stay flat in `specs/`, numbered by the user. Never move them into subfolders (no `specs/done/`). `design/` (PNG) and `docs/` are gitignored. Open design/ only when asked.

## Conventions

- Run `npm run format` before committing. `check` fails on unformatted files. specs/, docs/, design/ and case_studies/ are excluded from Prettier.
- Keep code comments minimal. Comment only where intent is not obvious.
- Component CSS uses tokens only: no hex, px spacing or font literals.
- Callout tones use `--color-callout-{note,insight,warning}` and `-bg` from tokens.css. `npm run contrast` checks each tone's label, body and border.
- Tables: every table goes through `DataTable` (it takes a `caption`). Plain Markdown tables get no caption.
- `.shell` (max 1440px) sits on the section in Hero, SkillSet, Toolkit and Footer, and on an inner wrapper in Header and Projects. The Toolkit band and those section rules stop at 1440px; the Projects rule is full width.
- Section separators: `.section` uses `border-bottom` (main.css), not margin or `<hr>`. Footer opts out.
- Breakpoints: below 1024px stacks two-column sections (main.css). Below 42rem makes Projects groups one column (Projects.astro, rem so it also stacks at 400% zoom).
- Project cards: `.card__link::after` stretches over the card. The h4 and summary are `position: relative; z-index: 1`, so their text is selectable. Clicking the image, padding or empty space opens the link; clicking text does not. Keep this when editing cards.
- Icons: `Icon.astro` inlines Phosphor SVGs at build time; pick by name in home.ts. Sizes are rem props at call sites, not tokens.
- Homepage copy and data go in `src/data/home.ts`, not in components.
- Lists with list-style reset keep `role="list"`; the no-redundant-roles disable there is intentional.
- Motion: transform, opacity and colour transitions only under `prefers-reduced-motion: no-preference`. main.css has a global reduce override.
- Text contrast aims AAA (7:1+). Accent colours and white on tile cores are for large text only.
- Nav: "work" and "connect" links; the logo links home. Nav labels are lowercase. Back to top is `<a href="#top">`.
- Images: `public/images/`, explicit width and height. Placeholder: `image: placeholder()` in home.ts.
- Hygiene: `.nvmrc` (Node 24), `.editorconfig` (LF, 2 spaces), `.gitattributes` (text=auto; CNAME eol=lf), `.vscode/extensions.json` (Astro, Prettier, ESLint), `.github/dependabot.yml` (npm and actions, monthly, dev deps grouped).

## Do not

- Add client JS, islands, UI frameworks, Tailwind, a CMS, analytics or trackers.
- Use neutral-100 to 400 greys for text.
- Invent metrics or claims not backed by git history or notes.
- Exceed 100KB transferred per page, excluding lazy images (homepage is about 79KB).

## Next up

- Case studies: hand-written one by one from `templates/case-study.mdx`. `/work/huana` stays `draft: true` as a placeholder. `/work/figwrite` has no file yet. TYIA has no page (out of scope). Homepage links to `/work/huana` and `/work/figwrite` 404 in prod until these exist. Signal Fire card is in the design, not the spec.
- Toolkit logos: each becomes a clickable brand logo with alt text and a hover tooltip (tap on mobile/tablet) showing a one-line description. Do after layout and copy are final.
- Real project images and per-project accents (placeholders now).
- DataTable: duplicate id when two tables on a page share a caption (DataTable.astro:12-13). `scope="col"` on every th; row-header tables unsupported.
- `.gitattributes` forces LF. If an old Windows checkout still fails `format:check` on CRLF files, run `git add --renormalize .` once.
- `npm audit`: 4 high, dev-only, in the lint chain (braces via astro-eslint-parser). No non-breaking fix; accepted. None in prod.
- Human checks pending: NVDA and VoiceOver on case study components, Windows High Contrast, 400% zoom, keyboard walkthrough, phone.
- Comment-minimising pass at the final stage.
- Domain: connect uxaksh.ca at production. Verify it in GitHub Settings > Pages first (subdomain takeover risk).

## Reference

Human project log (not for agent context, local only, gitignored): `docs/Aksh_Portfolio_Project_Log.md`
