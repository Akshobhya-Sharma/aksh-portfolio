# Spec: Portfolio website (uxaksh.ca)

Type: project Status: draft
Save as: specs/\_project.md

## Goal

Visitors can read Aksh's case studies and find how to contact him, on any device, including low-RAM phones, with every page usable by keyboard and screen reader.

## Context

- Audience: people learning from the process (informational first), recruiters and small-project clients second.
- Prior decisions came from two earlier chats: the session handoff (session_handoff_v1.0.txt) and the stack discussion. Two finished case study drafts exist (Huana, FigWrite) but are to be rewritten. Treat their git-derived facts as real and do not invent metrics.
- Aksh's own phone crashes on heavy pages, so low memory use is a real requirement, not a nice-to-have.
- Existing files: tokens.css (from Figma variable export) and main.css (base and layout). Both need the fixes listed below.
- Aksh has not used Astro before. Keep setup steps explicit.
- This repository is being used to develop the portfolio website: `D:\codebase\Repositories\aksh-portfolio`, also available in this workspace.

## Decisions

- Astro, static output: ships no JS by default, outputs plain HTML/CSS that GitHub Pages serves.
- Plain CSS with custom properties, no Tailwind: Aksh wants clean, readable code and already has tokens.css and main.css.
- No client-side UI framework (no React): keeps JS payload and memory use low.
- Case studies are MDX files in an Astro content collection (`@astrojs/mdx`): adding one means adding one file, and components can be imported inside it. Plain Markdown tables and fenced code still work.
- Side nav is generated from case study headings: no manual nav upkeep.
- Shiki for the fake IDE code window: highlights at build time, zero client JS.
- Noise gradient is a small pre-rendered tile over a CSS gradient, with a build-time contrast check: avoids heavy live SVG filters and enforces accessible text on backgrounds.
- Mobile nav uses native `<details>` or a button with `aria-expanded`: works without JS, accessible by default.
- Animation is CSS only, transform and opacity, with a reduced-motion fallback: cheap on memory and respects user settings.
- Cross-document View Transitions as progressive enhancement: page transitions without a JS router.
- GitHub Actions deploys to GitHub Pages, custom domain via CNAME: free, and the source stays in the repo.
- A dev-only `/components` page (driven by `src/data/components.ts`) shows every case-study component and variant; a `/styleguide` page may follow: the closest thing to a visual workspace, and an accessibility test bench.
- Claude Code governed by a CLAUDE.md: keeps generated code consistent with these rules.
- Visual editors (e.g. Caret) are not in the core stack: they add a React and sync layer this site does not need.
- Decorative-only greys (neutral-100 to 400) are never used for text: their contrast is too low per tokens.css notes.
- Do not invent prompt or message counts for case studies: explicit earlier decision to preserve credibility.

## Scope

- Home page: hero, skill set, custom toolkit, projects, contact footer.
- Case study pages (FigWrite, Huana) from MDX, with side nav, tables, stat cards, commit timeline, code window.
- Global header, footer, mobile menu, mobile page-nav disclosure.
- Section theme variants (plain, tinted, gradient, dark).
- Noise gradient generator with automated contrast check.
- Micro animations and page transitions.
- Styleguide page.
- Deploy to uxaksh.ca with HTTPS.
- Fixes to tokens.css and main.css (below).

### Required CSS fixes

tokens.css

- Add `--space-24`, used in clamp minimums but missing from the scale.
- Add `@font-face` for Newsreader and Figtree (self-hosted woff2, `font-display: swap`). Replaces Gambetta Variable and Satoshi Variable.
- Add link hover/visited states and a focus ring token.
- Add section theme tokens, each with a contrast-verified text pair.

main.css

- Remove double horizontal padding: `.shell` and `section` both add it.
- Fix `.full-bleed`: `100vw` causes sideways scroll when a scrollbar exists.
- Change `.side-nav` height from `100vh` to `100dvh`.
- Offset `.side-nav` sticky top by the sticky header height.
- Change bare `section` selector to `.section` so it does not style every section site-wide.
- Build the mobile replacement for the hidden side nav (below 1024px nothing replaces it today).
- Header hide-on-scroll: never hide while a header element has focus, and disable the transition under `prefers-reduced-motion`.
- Add global heading styles using the type-scale tokens, `:focus-visible` styles, a skip link, a `prefers-reduced-motion` block, and a prose max line length.
- Check whether `.side-nav .nav-label` should be uppercase: the screenshots appear lowercase, so verify against Figma.
- Change `.grid-auto` minmax to `min(220px, 100%)` to avoid overflow at 320px.

## Out of scope

- CMS, backend, database, user accounts, comments.
- Tailwind or any UI framework.
- Visual drag-and-drop editor.
- Additional case studies beyond Huana and FigWrite.
- Marketing plan for Huana.
- Fabricated metrics.
- Analytics and tracking (nothing decided; see Open questions).

## Design refs

design/*.png, src/styles/tokens.css

## Tech stack documentation

Astro docs has been added as an MCP server that allows for reading of latest Astro docs. The URL to the MCP server for Astro docs is `https://mcp.docs.astro.build/mcp`.

## Constraints

- Accessibility: WCAG 2.2 AA minimum, AAA for font contrast and readability. Keyboard reachable, visible focus, reduced-motion respected.
- Performance: under 150KB transferred per page excluding lazy-loaded images, no render-blocking JS, images as AVIF/WebP with explicit dimensions, animate transform and opacity only.
- Ethics: no dark patterns, transparent about cost and stack, public-good focus.
- Stack: Astro, plain CSS, open-source tooling only.
- Cost: no paid services beyond the existing domain.
- Privacy: no third-party trackers by default.
- Deadline: none stated.

## Acceptance

- [ ] `npm run build` completes with no errors and outputs static files only.
- [ ] https://uxaksh.ca loads over HTTPS from GitHub Pages.
- [ ] Adding a new `.mdx` file to `src/content/work/` produces a new case study page without editing any other file.
- [ ] Every page passes an automated axe scan with zero violations.
- [ ] Every page can be fully operated by keyboard alone, with a visible focus indicator and a working skip link.
- [ ] Contrast script fails the build when a text color on a gradient or noise background is below AA, and passes on all shipped backgrounds.
- [ ] No page exceeds 150KB transferred, excluding lazy-loaded images, measured in browser dev tools.
- [ ] No page has a horizontal scrollbar at 320px, 375px, 768px, 1024px, 1440px and 2560px widths.
- [ ] Below 1024px the side nav is replaced by a working page-navigation disclosure and a main menu, both operable by keyboard and screen reader.
- [ ] With "reduce motion" enabled in the OS, no transitions or animations play.
- [ ] Case study side nav items match the page's `##` headings and scroll to the right section.
- [ ] Pages load and scroll on Aksh's own phone without the browser crashing.
- [ ] No hardcoded color, spacing or font values appear in component CSS (all reference tokens).
- [ ] The fake IDE code block is either labelled for screen readers or hidden from them, and the build shows it highlighted with no client JS.

## Open questions

- Accessibility target: the earlier plan aimed for AAA text contrast on noise gradients, but this brief says AA. Which applies to text on gradient backgrounds? [Response: AAA for text so that it is always readable.]
- Font licensing: do the Gambetta and Satoshi licenses allow self-hosting on a public site? [Response: Use Newsreader and Figtree instead. Implemented in src/styles/fonts.css.]
- Side-nav label case: uppercase in main.css, lowercase in the screenshots. Which is correct? [Response: Use lowercase.]
- Which pages exist beyond home and the two case studies? The header shows "work" and "connect"; is "work" a separate index page, or does it link to the Projects section on home? [Response: To begin with, work should anchor to the projects section; connect should anchor to bottom so that footer is exposed. Footer contains the contact email.]
- Where does the cross-project throughline (accessibility-agent practice started in Huana, carried into FigWrite) appear on the site? Earlier guess was a site-level callout, not decided. [Response: use the combination. A one-line callout on the home page, plus a “carried over from Huana” section in FigWrite and a “where this practice started” note in Huana. It needs no new page, and it avoids repeating the story twice. it should only claim what the git history and your notes actually show (the review passes, the accessibility audit and the findings table), with no invented numbers.]
- What are the exact file names in design/, and does design/tokens.md match the existing src/styles/tokens.css? If they differ, which wins? [Response: There is no design/tokens.md. We will use tokens.css as a base and build on it as required. The design/*.png files are screenshots. Landing page is homepage, case study page is a generic template to show how case studies can look but I am open to better design as long as the look and feel remain the same. Mobile page is just to show that everything should stack automatically on smaller viewports.]
- Are there mobile and tablet designs, or only desktop? Responsive behavior is currently inferred from main.css. [Response: Responsive behaviour is indicated via screenshot but also must follow industry standard and best practices.]
- Case study content: drafts are to be rewritten. What is the new structure and approval process? [Response: I will write case study manually as I please. The tech stack should allow me to implement various layouts, designs, content patterns, images and other features which will be described for implementation when I reach that stage.]
- Images listed as "recommend image of..." markers still need to be produced (Figma exports, screenshots, diagrams). [Response: I will manually provide all this when the build is happening. At the moment, I want to start building.]
- Whether to collect any analytics (none decided; no-trackers is only the default). [Reponse: No trackers needed. I want to keep my site clear of any such tools and respect user privacy.]
- Actual prompt and message counts: unavailable. Claude Code transcripts may partly exist; unresolved. [Response: Do not worry about this. We will come back to it later.]
- Domain renewal cost and DNS provider for uxaksh.ca are not stated. [Response: I have access to namesilo which is where I have my uxaksh.ca domain.]

## Stack and why

- Astro (static): zero JS by default, component and Markdown workflow, outputs plain files for GitHub Pages.
- Plain CSS with custom properties: clean, readable, already written.
- TypeScript: not decided. Astro works with plain JS. See Open questions if needed.
- MDX via Astro content collections (`@astrojs/mdx`, MIT): case studies as files, with components usable inside.
- Shiki: build-time code highlighting.
- Node scripts (`make-noise.mjs`, `check-contrast.mjs`): generate noise tiles and enforce contrast without runtime cost.
- Database: none, content is files.
- Auth: none, site is public.

## Hosting

GitHub Pages deployed by GitHub Actions (`withastro/action`), custom domain via `public/CNAME` and DNS. Roughly $0 per month, plus the existing domain renewal.

## Milestones

1. Scaffold and deploy: Node, Astro project, git repo, blank page live on uxaksh.ca over HTTPS, CLAUDE.md added.
2. Foundation: tokens.css and main.css with all fixes applied, fonts, Base layout, skip link, focus styles.
3. Global shell: header, footer, main menu with mobile hamburger.
4. Styleguide page: components and variants as they are built, running axe against it.
5. Home: hero.
6. Noise gradient generator and contrast check script (needed by the gradient project cards).
7. Home: skill set and custom toolkit.
8. Home: projects section and contact footer.
9. Case study template: content collection, `CaseStudy` layout, side nav from headings, mobile page-nav disclosure, `DataTable`, `StatCard`, `Callout`, `Figure`. Built 2026-10-21 on feat/case-study-template (dev-only /components page; `CommitTimeline` not built yet). Closed 2026-10-24 with specs 03 and 04 (callout polish).
10. CodeWindow component (fake IDE, Shiki).
11. Case study: FigWrite (rewritten content, images).
12. Case study: Huana (rewritten content, images).
13. Motion: micro animations and page transitions, with reduced-motion handling.
14. Final audit: axe, keyboard-only pass, throttled CPU and real-phone test, page-weight check, fix list closed out.
