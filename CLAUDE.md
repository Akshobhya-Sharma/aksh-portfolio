# Project: Aksh portfolio (uxaksh.ca)
Static portfolio of UX case studies; light on memory, keyboard and screen-reader first.

## Stack
- Language/framework: Astro 7 (static output), TypeScript strict, plain CSS custom properties
- Package manager: npm (Node 24)
- Deploy target: GitHub Pages via `.github/workflows/deploy.yml` on push to main; domain in `public/CNAME`

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Test: none yet
- Lint/typecheck: `npm run lint` · `npm run typecheck`
- Build: `npm run build` · all three: `npm run check`

## Conventions
- Spec is the contract: `specs/_project.md` (milestones, CSS fixes, acceptance).
- Case studies: one Markdown file each in `src/content/work/`; side nav comes from `##` headings.
- Component CSS references tokens only: no hardcoded color, spacing or font values.
- Build-time over runtime: Shiki for code, Node scripts for noise tiles and contrast checks.

## UI
- Tokens/base CSS: `setup_docs/tokens.css`, `setup_docs/main.css` (move to `src/styles/` in Milestone 2)
- Fonts: Newsreader + Figtree, self-hosted woff2, `font-display: swap`
- Design refs: `design/*.png` are screenshots; open only when a task refers to them
- WCAG 2.2 AA floor, AAA for text contrast (including text on gradients)
- Motion: CSS transform/opacity only, disabled under `prefers-reduced-motion`
- Nav label text is lowercase

## Do not
- Add client JS frameworks, Tailwind, a CMS, analytics or trackers.
- Use neutral-100 to 400 greys for text.
- Invent metrics, prompt counts or claims not backed by git history or notes.
- Exceed 100KB transferred per page (excluding lazy images).

## Reference
Human project log (not for agent context): `docs/Aksh_Portfolio_Project_Log.md`
