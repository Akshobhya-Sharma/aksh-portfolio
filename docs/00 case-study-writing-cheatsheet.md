# Case study writing cheatsheet

Everything you need to write a case study in this repo, based on how the existing files (`huana.mdx`, `templates/case-study.mdx`) and components are set up.

Start every new case study by copying `templates/case-study.mdx` to `src/content/work/<slug>.mdx`. The slug becomes the URL (`/work/<slug>`) and must match the slug in `src/data/home.ts`.

---

## 1. Frontmatter (top of the file)

```yaml
---
title: Project name
summary: One-line summary.
category: design-coding # design-coding or ux-ui
accent: color-accent-huana # a token name from src/data/home.ts
width: default # default or wide (never "layout")
date: 2026-01-01 # YYYY-MM-DD
draft: true # true = dev only, left out of the build; set false to publish
cover:
  src: ../../assets/work/<slug>/cover.png
  alt: What the image shows
---
```

- `title` is the h1. `summary` appears under the title and is used as the meta description.
- `draft: true` hides the page in production. Set it to `false` when it's ready.
- `cover` is optional. Its `src` is a plain relative path with forward slashes (`../../assets/...`), not an import.

---

## 2. Imports (below the frontmatter)

Import each component you use, and import each image you show with `<Figure>`:

```js
import Callout from "../../components/case-study/Callout.astro";
import StatGrid from "../../components/case-study/StatGrid.astro";
import StatCard from "../../components/case-study/StatCard.astro";
import DataTable from "../../components/case-study/DataTable.astro";
import Figure from "../../components/case-study/Figure.astro";

import researchPhase from "../../assets/work/<slug>/research-phase.png";
```

Use `../../assets/work/<slug>/file.ext` for every image. Put the files in `src/assets/work/<slug>/`.

---

## 3. Headings

- Use `##` for main sections. Each `##` becomes an item in the "on this page" nav. Keep at least one `##` on the page, or the layout breaks at desktop widths.
- `###` and `####` are for sub-sections. They're not listed in the nav.
- Use sentence case: "What research told me", not "What Research Told Me".

```mdx
## Research

### What research told me
```

---

## 4. Text, bold, and links

- Plain paragraphs need a **blank line** between them.
- Bold: `**text**`. Code or a tool name: `` `text` ``.
- Links to pages on this site use a root-relative path starting with `/`:

  ```mdx
  You can read more in the [work section](/#projects).
  ```

  `/#projects` goes to the home page and scrolls to the projects section. Don't leave the parentheses empty. A link without a URL inside `()` renders as plain text.

---

## 5. Lists

**Bullets:**

```mdx
- First point
- Second point
```

**Numbered:**

```mdx
1. First step
2. Second step
```

**Nested (sub-items):** indent the sub-items by 3 spaces to line up under `7. ` (or 2 spaces under `- `), with a blank line before the list.

```mdx
7. UI audit
   - page-by-page restyle to match Figma
   - responsive polish
```

- Don't put a list inside a `>` blockquote. The `>` stops it being a list.
- Markdown can't write `7a`, `7b`. The nested list shows `1.`, `2.` by default, and this site doesn't yet style nested lists. Options are in the "Open items" section below.
- Keep list items on their own lines. Don't run `-` items together in one paragraph.

---

## 6. Callouts

Four tones: `note`, `insight`, `warning`, `muted`.

```mdx
<Callout tone="insight" title="Short title">

Body text here.

</Callout>
```

- The `title` is one bold line above the body. Keep it short.
- **Blank lines are required** after the opening tag and before `</Callout>`. Without them, Prettier joins everything into one paragraph and lists stop working.
- Don't indent the body. Prettier can turn indented lines into a code block.
- The body can hold lists, bold text and links (see sections 4 and 5).
- `muted` is a neutral grey for a mild aside. Its label reads "Aside". Use it when a point should not look like a note, a tip or a warning:

  ```mdx
  <Callout tone="muted" title="Short title">

  Body text here.

  </Callout>
  ```

```mdx
<Callout tone="note">

- Point one.
- Point two.

</Callout>
```

---

## 7. Quotes

Use `<Quote>` to highlight a sentence, a message or a spoken line. Only quote real words from your notes or research.

With a person (the `cite` is shown under the quote, with quote marks):

```mdx
<Quote cite="Placeholder name, placeholder role">
Placeholder spoken line.
</Quote>
```

As a highlighted statement (no `cite`, no quote marks):

```mdx
<Quote>
Placeholder highlighted statement.
</Quote>
```

- Use one `<Quote>` pair per quote. Several paragraphs inside one Quote are fine.

---

## 8. Sections

Wrap a group of content in `<Section>` to give it a background. Content that isn't wrapped keeps the site background.

- Two tones: `light` and `tint` (the neutral tint). Text stays high contrast on both.

```mdx
<Section tone="tint">

Placeholder text.

</Section>
```

With a heading, add `labelledby` set to the heading's id, so screen readers can name the section:

```mdx
<Section tone="light" labelledby="placeholder-heading">

## Placeholder heading

Placeholder text.

</Section>
```

- The id is the heading text in lowercase, with spaces as hyphens and punctuation removed. "What research told me" becomes `what-research-told-me`. If the id doesn't match, the section has no name for screen readers.
- Without `labelledby`, Section is a plain wrapper, not a named region.
- Put a blank line between the tags and the content.

---

## 9. Separators

Use `---` to separate two parts of a page that are not one section. It draws a line in the same colour as the section borders.

```mdx
Paragraph above.

---

Paragraph below.
```

- Put a blank line on both sides of `---`. Without it, the line above turns into a heading.
- Use it sparingly. A `##` heading already separates sections.

---

## 10. Stat cards

Only use numbers you can back up from your notes or git history. Never invent metrics.

```mdx
<StatGrid>
  <StatCard value="18" label="Days spent on end-to-end process" />
  <StatCard value="41" label="Total commits to release for testing" />
</StatGrid>
```

- `StatCard` must sit inside `StatGrid`.
- `value` is the number, `label` says what it measures.

---

## 11. Tables

Every table goes through `DataTable`, and `caption` is required:

```mdx
<DataTable caption="Tech stack for Huana web-app">

| Stack                 | Purpose                                      |
| --------------------- | -------------------------------------------- |
| React, Vite, Tailwind | Familiarity and ease of design customization |
| Supabase              | For email auth only                          |

</DataTable>
```

- Leave a blank line after `<DataTable>` and before `</DataTable>`.
- A table without `DataTable` has no caption, and screen readers can't tell what it's for.
- Give the caption a unique text. Two tables on one page with the same caption share an id (see the "open items" list).

---

## 12. Images and figures

Use `<Figure>` for one image with a caption. Use `<ImageGrid>` for several mockups together, and `<ZoomCanvas>` for a large diagram or screenshot that readers may need to inspect (both below):

```mdx
<Figure
  src={researchPhase}
  alt="Research phase showing empathy maps, user personas, and feature prioritization matrix"
  caption="All the research I needed to do before I began design work."
/>
```

- `src` takes the imported variable inside `{ }`, never a quoted path.
- `alt` describes what the image shows and why it's there. Don't start with "image of" or "picture of" (screen readers already say it).
- Don't put backticks in `alt`. Screen readers read them out.
- `alt=""` only with `decorative`, for images that are pure decoration.
- `caption` is optional. Keep it short, one line.
- `Figure` serves AVIF and WebP for raster images. SVGs pass through unchanged.
- Export screenshots at 1920px wide or more for a full-width image. Smaller sources are not enlarged, so a 1280px image looks soft at full width.

### ImageGrid: several images

Import each image, then list them in reading order:

```js
import ImageGrid from "../../components/case-study/ImageGrid.astro";

import firstDraft1 from "../../assets/work/<slug>/first-draft-1.png";
import firstDraft2 from "../../assets/work/<slug>/first-draft-2.png";
import firstDraft3 from "../../assets/work/<slug>/first-draft-3.png";
```

```mdx
<ImageGrid
  label="First design drafts"
  caption="Placeholder caption for the whole group."
  images={[
    { src: firstDraft1, alt: "Placeholder: what the first draft shows", caption: "Placeholder caption" },
    { src: firstDraft2, alt: "Placeholder: what the second draft shows" },
    { src: firstDraft3, alt: "Placeholder: what the third draft shows" },
  ]}
/>
```

- `alt` is required on every image. The build fails without it. Use `alt=""` only for decoration.
- `label` names the list for screen readers (it becomes the list's `aria-label`). It is not shown on the page.
- An image `caption` sits under that image. The grid `caption` sits under the whole group. Both are optional.
- The layout follows the count: 1 is full width, 2 is two columns, 3 is three columns, 4 is a 2×2 grid, and 5 or more fit as many columns as the width allows (at least 12rem each). Below 42rem every layout is one column.
- One image: `<ImageGrid images={[{ src: firstDraft1, alt: "Placeholder: what it shows" }]} />`

### ZoomCanvas: small or wide images readers can zoom

Use it for a small or wide diagram. Readers pick Fit, 2x or 3x, then scroll inside the frame. It works without JavaScript.

```js
import ZoomCanvas from "../../components/case-study/ZoomCanvas.astro";

import flowDiagram from "../../assets/work/<slug>/flow-diagram.svg";
```

```mdx
<ZoomCanvas
  id="flow-diagram"
  src={flowDiagram}
  alt="Placeholder: describe the diagram"
  caption="Placeholder caption"
  height="16rem"
/>
```

- `id` is required. It must be non-empty, have no spaces, and be unique on the page. The build fails otherwise. Two canvases with the same `id` break each other's zoom buttons.
- `height` sets the frame height in any CSS length, such as `16rem` or `60dvh`. The default is `24rem`. The image is centred at Fit.
- `alt` says what the image shows. `caption` is optional.
- Use a PNG screenshot at 1920px wide or more if it has small text. ZoomCanvas can show images up to 2880px wide, so a larger source stays sharp when zoomed.

---

## 13. Diagrams and flowcharts

This site has no Mermaid support. Pasting Mermaid code into the `.mdx` file shows it as plain text.

### Simple flows: AsciiDiagram

Draw the flow in text. Tip: ask Claude to draw it as an ASCII box diagram, then paste the result into the fenced block.

```js
import AsciiDiagram from "../../components/case-study/AsciiDiagram.astro";
```

````mdx
<AsciiDiagram
  label="Sign-up flow"
  description="A three-step sign-up flow. A person signs up, then verifies their email, then sees a welcome page."
>

```text
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Sign up  │───▶│ Verify   │───▶│ Welcome  │
└──────────┘    └──────────┘    └──────────┘
```

</AsciiDiagram>
````

- `label` is a short name, shown in the caption. `description` is required. Screen readers read it instead of the drawing, which is hidden from them.
- Describe the steps and how they connect, in reading order. Start with what the diagram shows. Don't describe the box characters.
- Put the drawing in a fenced `text` block between the tags, with a blank line on each side. Don't pass the drawing as a prop (a template literal). MDX drops its leading spaces.
- The build fails if `label` or `description` is empty or only whitespace.
- A wide drawing scrolls sideways inside its own box.

### Flowcharts as SVG

Use this for a diagram that an ASCII drawing can't hold. The recommended process:

1. Render the diagram and export it as an SVG (mermaid.ai's export, or mermaid.live).
2. Save it as `src/assets/work/<slug>/<name>.svg`.
3. Import and use `<Figure>` (or `<ZoomCanvas>` for a wide diagram):
   ```js
   import flowDiagram from "../../assets/work/<slug>/flow-diagram.svg";
   ```
   ```mdx
   <Figure src={flowDiagram} alt="Short description of the flow" caption="..." />
   ```
4. Write the steps again as a numbered list right after the figure. This is the accessible version of the diagram. The list must cover every box and arrow.
5. Check text contrast in the SVG: 4.5:1 for text, 3:1 for arrows and borders. Don't rely on colour alone.
6. Check the diagram on a phone width and in dark mode, if the site's dark theme applies. The SVG colours don't change automatically.

---

## 14. Writing rules for this site

- **Don't invent claims or metrics.** Use only what's in your notes, git history or project files.
- **Don't use placeholder text in published pages.** Remove every line starting with `PLACEHOLDER`, and every `[value]`-style example, before setting `draft: false`.
- **Sentence case headings and captions.**
- **Plain language, short sentences.** Keep paragraphs to a few lines.
- **Remove template comments** (`{/* ... */}`) before publishing. They don't show on the page, but they clutter the file.
- **Remove unused imports** like `placeholder` once you no longer use them.

---

## 15. Accessibility checklist

- Every `<Figure>`, `<ImageGrid>` image and `<ZoomCanvas>` has meaningful `alt` text.
- Every `<AsciiDiagram>` has a `description`. Every `<Section>` with `labelledby` matches a heading id.
- Every `<ZoomCanvas>` has its own `id`.
- Every `<DataTable>` has a `caption`.
- Every heading is in order: one `##` for each main section, `###` below it. Don't skip levels.
- Links say where they go. Avoid "click here".
- Information isn't conveyed by colour alone (colour-coded callouts still need the label, which they have).
- Text colour is high contrast. The site aims for 7:1 for text.
- Test the page with the keyboard only.

---

## 16. Checking your work

Run these from the project root:

| Command | What it checks |
| ------- | -------------- |
| `npm run dev` | Preview the page at `localhost:4321/work/<slug>`. Draft pages show in dev. |
| `npm run format` | Formats every file. Run this before committing. |
| `npm run check` | Full gate: formatting, lint, types, build, contrast, registry |
| `npm run a11y` | Axe WCAG 2.2 AA audit of built `/work/*` pages (needs a build, Chrome or Edge) |

Before you publish:

1. Set `draft: false`.
2. Run `npm run check`.
3. Run `npm run a11y`.
4. Check the page in a browser at phone width and at 400% zoom.

---

## 17. Common problems

| Symptom | Likely cause | Fix |
| ------- | ------------ | --- |
| Image shows as a broken link | Path relative to the wrong folder, or a `/assets/...` URL | Use `../../assets/work/<slug>/file.png` in frontmatter, or import it and use `{variable}` in the body |
| List renders as one paragraph | No blank line after the opening tag or before the closing tag | Add a blank line on both sides |
| List items show as plain text with `-` | Items joined on one line, or indented 4+ spaces | One item per line, no extra indent |
| Nested list isn't indented | Missing indent, or the list is inside `>` | Remove the `>`, indent by 3 spaces |
| `Figure` throws an error about alt | `alt` is empty and `decorative` is not set | Write a real alt, or add `decorative` |
| `DataTable` throws "child must be a table" | Table isn't directly inside the tags | Keep the table as the only child of `<DataTable>` |
| Page missing from production | `draft: true` | Set it to `false` |
| Link goes nowhere | Empty parentheses, or a relative URL to a page that doesn't exist | Use `/#projects` or another real path |
| Build fails with an AsciiDiagram error about `label` or `description` | One of the two props is empty or only spaces | Fill in both with real text |
| ASCII drawing loses its spaces or lines up wrong | Drawing is not in a fenced `text` block, or there is no blank line around it | Use the fenced block with a blank line on each side |
| Build fails with a ZoomCanvas error about `id` | `id` is empty or contains spaces | Use a non-empty id with no spaces, such as `flow-diagram` |
| Zoom buttons on one `ZoomCanvas` don't work | Two canvases on the page share an `id` | Give each one a unique `id` |
| Build fails with an ImageGrid error about `alt` | An image has no `alt` | Write `alt`, or use `alt=""` only for decoration |
| Section has no name for screen readers | `labelledby` doesn't match the heading's id | Use the heading text as a lowercase, hyphenated id (section 8) |

---

## 18. Open items (decisions not made yet)

- **Nested list numbering (`7a`, `7b`).** Options: letters under the number (`a.`, `b.`) with a one-line CSS rule, or a CSS counter version that builds `7a` from the parent. Neither is set up yet.
- **Flowchart-as-SVG.** Works with `<Figure>` or `<ZoomCanvas>` today. A Mermaid integration isn't set up and would add a dependency.
- **`DataTable` captions.** Two tables with the same caption on one page share an id. Give captions unique text until this is fixed.
- **Case study images in `public/images/`.** Home page cards use `public/images/` with URL paths (`/images/file.png`). Case studies use `src/assets/` with imports. Don't mix them.
- **Accessibility checks pending.** Screen reader checks (NVDA, VoiceOver) on case study components haven't been done yet.
- **Quote marks.** How screen readers announce the curly quote marks around a cited `<Quote>` hasn't been checked yet.

---

## Quick reference

```mdx
---
title: ...
summary: ...
category: design-coding
accent: color-accent-<name>
width: default
date: YYYY-MM-DD
draft: true
cover:
  src: ../../assets/work/<slug>/cover.png
  alt: ...
---

import Figure from "../../components/case-study/Figure.astro";
import someImage from "../../assets/work/<slug>/some-image.png";

## Section

Paragraph text.

<Callout tone="insight" title="Short title">

- Point one.
- Point two.

</Callout>

<Figure src={someImage} alt="What it shows and why" caption="Short caption." />

<StatGrid>
  <StatCard value="..." label="..." />
</StatGrid>

<DataTable caption="What this table shows">

| A   | B   |
| --- | --- |
| ... | ... |

</DataTable>
```
