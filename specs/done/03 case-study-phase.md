Context: read CLAUDE.md, specs/_project.md and specs/homepage.md first. Do not read docs/. This is my session tracker and will be updated at the end of the session.
We are on main after merging the homepage PR. This session covers Milestone 9 (case study
template) so I can start writing my first case study (Huana). Use the Astro docs MCP to
confirm current Astro 7 APIs before writing code. Do not rely on memory for content
collections, MDX or astro:assets.

Work phase by phase. After each phase: run `npm run format` and `npm run check`, commit,
give me a short summary of what changed and why, then STOP and wait for my review.

Phase 0 — Branch and spec
- Create branch `feat/case-study-template`.
- Write specs/case-study.md using SPEC.md.template. Cover the decisions below and list
  open questions. Stop for my approval before any code.

Phase 1 — MDX
- Add the official MDX integration (`npx astro add mdx`). Show me what it changed in
  astro.config.mjs and package.json.
- Update CLAUDE.md and specs/_project.md: case studies are MDX, not plain Markdown.

Phase 2 — Content collection
- Create the `work` collection with a typed schema. Fields: title, summary, category,
  layout (enum, e.g. "default" | "wide"), accent (token name), cover (image() helper,
  optional, with required alt), date, draft (boolean).
- Case study images live in src/assets/work/<slug>/ and render with astro:assets <Image />
  (AVIF/WebP, explicit dimensions, lazy below the fold).
- Propose, but DO NOT implement without asking, whether homepage project cards should read
  from this collection instead of src/data/home.ts. Slugs must match the existing
  /work/<slug> links.

Phase 3 — Layout and routing
- src/pages/work/[slug].astro with getStaticPaths. Exclude drafts in production builds.
- CaseStudy layout that switches on the `layout` frontmatter field.
- Side nav generated from ## headings (via render() headings). Sticky, offset by the
  header height, 100dvh. Lowercase labels.
- Below 1024px: a native <details> page-nav disclosure. No JS.

Phase 4 — Starter components (usable inside MDX)
- Callout (tones: note, insight, warning; semantic markup, not colour alone).
- StatCard (value + label; never invent numbers; values come from my content only).
- DataTable wrapper: <caption> required, horizontal-scroll region that is keyboard
  focusable with a role and label, so wide tables never cause page scroll at 320px.
- Figure (Image + figcaption).
- Plain markdown tables and fenced code must also look right without wrappers (Shiki at
  build time, theme passes AAA contrast against our tokens).
- Add each component to a simple test page so I can see every variant.
- Out of scope: CodeWindow (Milestone 10), CommitTimeline, motion.

Phase 5 — Huana skeleton
- Create src/content/work/huana.mdx, draft: true, with placeholder ## headings and one
  example of each component, clearly marked as placeholder text. I will write the real
  content myself.
- Add a short "How to write a case study" section to README.md: where the file goes,
  frontmatter fields, how to import components, where images go, how to preview.

Rules for every phase: zero client JS, tokens only in component CSS, AAA text contrast,
WCAG 2.2 AA, under 100KB per page excluding lazy images, run `npm run a11y` after builds
that add pages, minimal comments, no invented metrics or claims.

## Approved plan and decisions (2026-10-21)

Approved by the user before any code. The five phases below replace the Phase 0 to 5 split above; the original text is kept for traceability.

1. MDX and docs: add `@astrojs/mdx`, update CLAUDE.md and `specs/_project.md`, add `specs/_component.template.md`, record this plan.
2. `work` content collection with typed schema.
3. Layout, routing (`/work/[slug]`) and side nav from headings.
4. Starter components in `src/components/case-study/` plus a dev-only `/components` page driven by the registry `src/data/components.ts`.
5. Huana draft skeleton (`huana.mdx`, `draft: true`) and README "How to write a case study".

Decisions:

- `/components` is dev-only for now: it is not in the production build.
- Strictly zero client JS. No copy button on code blocks.
- The TYIA card and link are left alone (known 404, out of scope).
- No separate `specs/case-study.md`. This plan is the contract. Original Phase 0 (spec file, approval gate) is replaced by this plan and the user's approval.
- One commit per phase, approved by the user for this build. The orchestrator commits.
- Branch is `feat/case-study-template`, as originally specified.

### Change log

- 2026-10-21: Phase 0 "write specs/case-study.md" replaced by this plan and approval gate. Why: the plan is the contract; a separate spec adds no information.
- 2026-10-21: "Commit, then STOP after each phase" now means one commit per phase made by the orchestrator, with review between phases. Why: user-approved workflow for this build.
- 2026-10-21: Phase 4 "simple test page" changed to a dev-only `/components` page driven by `src/data/components.ts`. Why: one registry feeds the page and future components; keeps test content out of production.
- 2026-10-21: Added `specs/_component.template.md` for requesting new components. Why: repeatable way to spec each component.
- 2026-10-21: Frontmatter `layout` renamed to `width`. Why: MDX reserves `layout` and treated its value as a module import.
- 2026-10-21: StatCard shows the label above the value. Why: a valid `dl` needs dt before dd, and reordering with CSS was rejected.
- 2026-10-21: DataTable takes `caption` as a prop and injects it as the table's first child. Why: a caption inside a nested markdown table is not possible, and this keeps the HTML valid.
- 2026-10-21: Wide plain markdown tables: use DataTable. Why: a global table override would nest a second scroll region inside DataTable.
- 2026-10-21: Custom Shiki theme `src/styles/code-theme.json`, based on github-dark-high-contrast (MIT, from Shiki) with one colour raised (markup.ignored). Why: every token colour must reach 7:1; the minimum is 9.23:1.
- 2026-10-21: Figure uses Picture (AVIF/WebP) for raster images and Image for SVG. Why: Picture errors on SVG sources.
- 2026-10-21: Homepage cards stay on src/data/home.ts. Why: TYIA has no case study and card fields (srName, card image) are not in the collection. Revisit once Huana and FigWrite are published.
- 2026-10-21: Header links changed to /#projects and /#connect. Why: they must reach the homepage from case study pages.
- 2026-10-21: /components is dev-only (route [dev].astro returns no paths in production).
- 2026-10-21: Phases 1 to 5 built (MDX and docs; collection; layout, routing, side nav; components and /components; Huana draft skeleton, template and README). Added templates/case-study.mdx as the copy-me starter.
