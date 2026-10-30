# Project: Aksh portfolio

Static portfolio: homepage and UX case studies. Keyboard and screen-reader first, low memory use. Two case studies are published (`/work/huana`, `/work/figwrite`). uxaksh.ca is being connected to GitHub Pages; not live yet.

## Stack

- Astro 7 (static, zero client JS), `@astrojs/mdx` (case studies are MDX, not plain Markdown), TypeScript strict, plain CSS custom properties, Node 24 (`.nvmrc`), npm
- Prettier 3 with prettier-plugin-astro (dev only)
- Deploy: GitHub Pages via `.github/workflows/deploy.yml`, manual only (`workflow_dispatch`); a push to main does not deploy. `site` in astro.config.mjs and `public/CNAME` are staged for uxaksh.ca. No `base` is set, so a github.io/<repo> deploy would 404 assets.

## Commands

- Install `npm install` · Dev `npm run dev` · Build `npm run build`
- Format `npm run format` (writes) · `npm run format:check` (read-only)
- Lint `npm run lint` · Types `npm run typecheck` · Contrast `npm run contrast`
- A11y `npm run a11y` (needs a build; Chrome/Edge or CHROME_PATH; axe WCAG 2.2 AA) audits the homepage and built `/work/*` pages at 1280px and 320px. `npm run a11y:dev` audits `/components` and `/work/huana` on the dev server.
- Gate `npm run check`: format:check, lint, typecheck, build, contrast, check:registry. No test runner yet.

## Structure

- `src/data/home.ts`: all homepage content (typed; colours are token names). Homepage copy goes here, not in components.
- `src/components/`: Header, Hero, SkillSet, Toolkit, Projects, CategoryTile, ProjectCard, Footer, Icon, Link
- `src/content.config.ts` (`work` collection), `src/content/work/*.mdx` (use `width`, not `layout`, in frontmatter), `src/pages/work/[slug].astro`, `src/layouts/CaseStudy.astro`
- `src/components/case-study/`: Callout, Quote, Section, StatGrid/StatCard, DataTable, Figure, ImageGrid, ZoomCanvas, AsciiDiagram, SideNav/PageNavList. CaseImage is the shared image pipeline (AVIF/WebP, quality 90, widths and sizes) for Figure, ImageGrid and ZoomCanvas. The cover is built in CaseStudy.astro with `getImage`: AVIF at quality 75 plus WebP at 90 (`<Picture>` takes one quality for all formats; AVIF 75 measured smaller and closer to source than WebP 90).
- Registry `src/data/components.ts` drives the dev-only `/components` page (`src/pages/[dev].astro`, not in the build). `npm run check:registry` verifies its import paths. Code theme: `src/styles/code-theme.json` (contrast-checked).
- Case study workflow: copy `templates/case-study.mdx` (not matched by the glob) to `src/content/work/<slug>.mdx`. Each case study needs at least one `##` heading (side nav). Drafts show in dev only.
- New component: copy `specs/_component.template.md` to the next numbered spec, `specs/NN <name>.md`, build in `src/components/case-study/`, add a registry entry and a live example on `[dev].astro`, then run `check`, `a11y`, `a11y:dev`.
- `src/layouts/BaseLayout.astro` (skip link, font preloads, style imports). `src/styles/`: `tokens.css`, `main.css`, `prose.css` (case-study prose), `fonts.css`.
- `public/fonts`, `public/images`, `src/assets/logo.svg`, `eslint.config.js`, `.prettierrc`, `.prettierignore`
- `specs/`: contracts; `_project.md` is the site brief. Specs stay flat in `specs/`, numbered by the user, never in subfolders (no `specs/done/`). Agents never rename, move or reorganise specs; a new spec, component specs included, is `specs/NN <name>.md` with the next number. `design/` (PNG) is gitignored; open it only when asked. `docs/` is gitignored (local only): the case-study cheat sheet and the human log.

## Conventions

- Run `npm run format` before committing. `check` fails on unformatted files. specs/, docs/, design/ and case_studies/ are excluded from Prettier.
- Keep code comments minimal. Comment only where intent is not obvious.
- Component CSS uses tokens only: no hex, px spacing or font literals.
- Callout tones use `--color-callout-{note,insight,warning}` and `-bg` from tokens.css. `muted` uses neutral-700 on `--color-neutral-tint`, also the Quote and Section tint. `npm run contrast` checks each tone's label, body and border.
- Case-study interactivity is CSS only: ZoomCanvas uses native radios with `:has()` and scroll; AsciiDiagram takes a fenced `text` block in its slot (raw template literals in MDX lose leading spaces). `hr` in case studies uses neutral-200, like the section borders.
- Links: `Link.astro` renders every `<a>` in case studies (MDX `a` is mapped to it in `[slug].astro`) and the footer LinkedIn link. Off-site http(s) links open in a new tab with `rel="noopener noreferrer"`, a visually hidden "(opens in a new tab)" and an `arrow-square-out` icon. Same-site, hash and mailto links stay plain. Authors write normal Markdown links.
- Abbreviations: spell out on first use with the short form in brackets, e.g. "large language model (LLM)".
- Media under a heading: an h2/h3/h4 followed directly by a `figure` (Figure, ImageGrid, ZoomCanvas) gets `--space-24` above it, in the content column and in Section.
- Tables: every table goes through `DataTable` (it takes a `caption`). Plain Markdown tables get no caption.
- `.shell` (max 1440px) sits on the section in Hero, SkillSet, Toolkit and Footer, and on an inner wrapper in Header and Projects. The Toolkit band and those section rules stop at 1440px; the Projects rule is full width.
- Section separators: `.section` uses `border-bottom` (main.css), not margin or `<hr>`. Footer opts out.
- Breakpoints: below 1024px stacks two-column sections (main.css). Below 42rem makes Projects groups and ImageGrid one column (rem, so it also stacks at 400% zoom). ImageGrid: 1 full width, 2 and 4 in two columns, 3 in three, 5+ at most three columns.
- Project cards: `.card__link::after` stretches over the card. The h4 and summary are `position: relative; z-index: 1`, so their text is selectable. Clicking the image, padding or empty space opens the link; clicking text does not. Keep this when editing cards.
- Icons: `Icon.astro` inlines Phosphor SVGs at build time; pick by name in home.ts. Sizes are rem props at call sites, not tokens.
- Lists with list-style reset keep `role="list"`; the no-redundant-roles disable there is intentional.
- Motion: transform, opacity and colour transitions only under `prefers-reduced-motion: no-preference`. main.css has a global reduce override.
- Text contrast aims AAA (7:1+). Accent colours and white on tile cores are for large text only.
- Nav: "work" and "connect" links; the logo links home. Nav labels are lowercase. Back to top is `<a href="#top">`.
- Images: `public/images/` for homepage cards (set in home.ts), with explicit width and height. Case studies import from `src/assets/`.
- Hygiene: `.nvmrc` (Node 24), `.editorconfig` (LF, 2 spaces), `.gitattributes` (text=auto; CNAME eol=lf), `.vscode/extensions.json` (Astro, Prettier, ESLint), `.github/dependabot.yml` (npm and actions, monthly, dev deps grouped).

## Do not

- Add client JS, islands, UI frameworks, Tailwind, a CMS, analytics or trackers.
- Use neutral-100 to 400 greys for text.
- Invent metrics or claims not backed by git history or notes.
- Exceed 150KB transferred per page, excluding lazy images (homepage about 79KB, `/work/figwrite` about 117KB at 1280px).

## Next up

- Case studies: Huana and Figwrite are published (`draft: false`). New ones are hand-written from `templates/case-study.mdx`; add the card, accent token (`accentTokens`) and category (`categoryIds`) in home.ts with it. Signal Fire card is in the design, not the spec.
- Toolkit logos: each becomes a clickable brand logo with alt text and a hover tooltip (tap on mobile/tablet) showing a one-line description. Do after layout and copy are final.
- Homepage card images are raw PNGs in `public/images/` (about 272KB and 222KB, lazy), not optimised. Move them through `astro:assets`. `placeholder.svg` stays for future cards. Accent tokens in tokens.css still carry "PLACEHOLDER" comments.
- DataTable: duplicate id when two tables on a page share a caption (DataTable.astro:12-13). `scope="col"` on every th; row-header tables unsupported.
- `.gitattributes` forces LF. If an old Windows checkout still fails `format:check` on CRLF files, run `git add --renormalize .` once.
- Human checks pending: NVDA and VoiceOver on case study components, Windows High Contrast, 400% zoom, keyboard walkthrough, phone.
- Comment-minimising pass at the final stage.
- Domain and deploy: the user is connecting uxaksh.ca to the repo (domain verified in GitHub Settings > Pages first; add DNS only after, then Enforce HTTPS). Then the deploy workflow: pin actions to SHAs and move `pages`/`id-token: write` to the deploy job.
- Case-study copy: MVP is not spelled out on first use in either case study.

## Reference

Human project log (not for agent context, local only, gitignored): `docs/Aksh_Portfolio_Project_Log.md`
