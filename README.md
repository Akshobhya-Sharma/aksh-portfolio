# aksh-portfolio

Portfolio site for Aksh: a homepage and UX case studies. Static output, no client JavaScript, built for keyboard and screen-reader use first. Two case studies are published: Huana and Figwrite. The custom domain (uxaksh.ca) is being connected to GitHub Pages and is not live yet.

## Stack

- [Astro](https://astro.build) 7, static output, TypeScript (strict)
- Plain CSS with custom properties (no Tailwind, no UI framework)
- Self-hosted fonts (Newsreader, Figtree)
- Icons from [Phosphor](https://phosphoricons.com), inlined at build time
- Node 24, npm

## Requirements

- Node 24 (the version in `.nvmrc`). Node 22.22 or newer also works.
- For `npm run a11y` only: a local Chrome or Edge, or set `CHROME_PATH`

## Scripts

| Command                  | What it does                                                  | Needs                        |
| ------------------------ | ------------------------------------------------------------- | ---------------------------- |
| `npm install`            | Install dependencies                                          | Node                         |
| `npm run dev`            | Local dev server                                              | Node                         |
| `npm run build`          | Static build to `dist/`                                       | Node                         |
| `npm run format`         | Prettier: format the project in place                         | Node                         |
| `npm run format:check`   | Prettier: fail if any file is unformatted                     | Node                         |
| `npm run preview`        | Serve the built `dist/`                                       | a build                      |
| `npm run lint`           | ESLint (including jsx-a11y rules)                             | Node                         |
| `npm run typecheck`      | `astro check` (TypeScript and Astro)                          | Node                         |
| `npm run contrast`       | Checks text and accent colours against the backgrounds        | Node                         |
| `npm run a11y`           | axe scan (WCAG 2.2 AA) of the built site                      | a build, plus Chrome or Edge |
| `npm run a11y:dev`       | axe scan of `/components` and `/work/huana` on the dev server | Chrome or Edge               |
| `npm run check:registry` | Checks the component registry and template import paths       | Node                         |
| `npm run check`          | format check, lint, typecheck, build, contrast and registry   | Node                         |

`npm run a11y` builds nothing itself: run `npm run build` first. It serves `dist/` on port 4399 and does not download a browser.

## Contributor setup

1. `nvm use` (reads `.nvmrc`, Node 24), then `npm install`.
2. Install the recommended VS Code extensions from `.vscode/extensions.json` (Astro, Prettier, ESLint). VS Code offers them when you open the folder.
3. Run `npm run format`, then `npm run check`. The check fails on unformatted files.

## Project structure

```
src/
  data/home.ts          All homepage content (edit this to change the page)
  components/           Header, Hero, SkillSet, Toolkit, Projects, CategoryTile,
                        ProjectCard, Footer, Icon, Link (new-tab handling for
                        off-site links)
  layouts/BaseLayout.astro  Skip link markup, font preloads, style imports
  pages/index.astro     The homepage
  styles/               tokens.css (design tokens), main.css (focus ring, reduced
                        motion, shell, sections), fonts.css
  assets/logo.svg, assets/work/<slug>/ (case study images)
  content/work/         Case studies (.mdx); content.config.ts defines the schema
  components/case-study/  MDX components; registry in data/components.ts
  pages/work/[slug].astro  Case study route; pages/[dev].astro is /components (dev only)
public/
  fonts/                Self-hosted woff2 and OFL licence files
  images/               Homepage card images (placeholder.svg kept for new cards)
  CNAME                 Custom domain for GitHub Pages (staged, see Deploy)
  favicon.svg           Site icon (SVG only)
scripts/                a11y.mjs, contrast-check.mjs, check-registry.mjs
templates/              case-study.mdx (copy into src/content/work)
specs/                  Feature specs (the build contract)
design/                 Figma screenshots (PNG). Gitignored: not in clones.
docs/                   Case-study cheat sheet and project log. Gitignored: local only.
.github/                Deploy workflow and Dependabot config
eslint.config.js        ESLint flat config (Astro, TypeScript, jsx-a11y)
.prettierrc, .prettierignore   Prettier config (specs/ and docs/ are excluded)
.editorconfig           Editor basics (LF, 2 spaces)
.gitattributes          text=auto (LF line endings)
.nvmrc                  Node version (24)
```

## Editing content

All homepage text, links, projects and icons live in `src/data/home.ts`. Components do not hold copy.

- **Categories:** add `{ id, title, gradient }` to `categories`. Gradient is `"tile-blue"` or `"tile-green"`. A category with no projects is not rendered.
- **Projects:** add an entry to `projects` with a unique `slug`, a `categoryId` that matches a category, an `accent` and an `image`. Change `categoryId` to move a card. Array order is page order. The `slug` is used for `/work/<slug>`; see How to write a case study.
- **Images:** put the file in `public/images/`, then set the project's `image` to `{ src: "/images/<file>", alt: "...", width, height }`. Give real pixel dimensions. Use `alt: ""` for purely decorative images. Do not start alt text with "image" or "photo".
- **Accents:** `accent` is a token name. To add one, define `--color-accent-<name>` in `src/styles/tokens.css`, add it to `accentTokens`, and run `npm run contrast`. Remove the token when its project is removed. Accents must reach 4.5:1 on the page background.
- **Gradients:** the `--tile-*` values in `tokens.css`. White text on them must stay at 4.5:1 or better; `npm run contrast` checks this.
- **Icons:** set a skill's `icon` to any Phosphor icon name, for example `"microscope"`. Browse names at phosphoricons.com.
- **Footer:** `footer.availability` and `footer.linkedin` make up the first line (the LinkedIn link opens in a new tab). `footer.email` sets the mailto link. `footer.extraLines` sets the small print lines below it.

## How to write a case study

1. Copy `templates/case-study.mdx` to `src/content/work/<slug>.mdx`. The slug is the URL (`/work/<slug>`) and must match the project's `slug` in `src/data/home.ts`.
2. Fill in the frontmatter. Unknown or misspelled keys fail the build.
   - `title`, `summary` (also the meta description), `category` and `accent` (use the values in `home.ts`), `date`, `draft`.
   - `width`: `default` (about 70 characters per line) or `wide`. It is not called `layout` because MDX reserves that key.
   - `cover` (optional): `src` and `alt`. The alt text is required when there is a cover.
3. `draft: true` shows the page in `npm run dev` only and leaves it out of the build. Set it to `false` to publish.
4. Components are imported at the top of the file. Open `/components` in dev for copy-ready import lines and snippets.
5. Images go in `src/assets/work/<slug>/`. Show them with `Figure`: write alt text that says what the image is for, and use `alt=""` with `decorative` only for decoration.
6. Each `##` heading becomes an item in the "on this page" nav. Use sentence case; the nav lowercases it.
7. Links: write normal Markdown links. Links to other sites open in a new tab automatically, with an icon and screen-reader text saying so. Same-site and `mailto:` links open in the same tab.
8. Spell out abbreviations on first use, with the short form in brackets: "large language model (LLM)".
9. Preview with `npm run dev`, then open `/work/<slug>` and `/components`.
10. Before publishing, set `draft: false` and run `npm run check` and `npm run a11y`.

## How to add a component

1. Spec: copy `specs/_component.template.md` to the next numbered file in `specs/` (`specs/NN <name>.md`), fill it in, and ask Claude to build it.
2. Build: the component goes in `src/components/case-study/`. Tokens only, no client JS.
3. Register: add an entry to `src/data/components.ts` (id, name, import line, variants with snippets, how-to text), then add its live example to `src/pages/[dev].astro`.
4. Check it on `/components` in dev.
5. Run `npm run check`, `npm run a11y` and `npm run a11y:dev`.

## Design tokens

`src/styles/tokens.css` is the only place for colours, spacing, type sizes and focus styles. Component CSS refers to tokens and does not hard-code values.

## Layout conventions

- `.shell` (max width 1440px, centred) sits on the section element in Hero, SkillSet, Toolkit and Footer, and on an inner wrapper in Header and Projects. The Toolkit light band and the section rules in those sections stop at 1440px; the Projects rule is full width.
- Section separators use `border-bottom` on `.section` (main.css), not margins or `<hr>`. The footer has none.
- Breakpoints: below 1024px stacks two-column sections; below 42rem makes the Projects card groups and ImageGrid one column. That breakpoint is in rem so grids also stack at high zoom. ImageGrid never shows more than three columns.
- Project cards: the title and summary sit above the stretched link, so their text can be selected. Clicking the image, padding or empty space opens the case study; clicking text does not.

## Fonts and icons, with licences

- **Newsreader** (headings), SIL Open Font License 1.1. Licence: `public/fonts/OFL-Newsreader.txt`
- **Figtree** (body text), SIL Open Font License 1.1. Licence: `public/fonts/OFL-Figtree.txt`
- Font files are woff2 in `public/fonts/`, loaded with `font-display: swap` from `src/styles/fonts.css`. `BaseLayout.astro` preloads the two critical weights.
- **Phosphor Icons** (`@phosphor-icons/core`), MIT licence. Used at build time only. The package is about 18MB installed, but none of it is shipped to the browser. Icon sizes are rem props on `Icon.astro`, not tokens: hero button 1.5rem, card button 1.75rem, skills 2rem, back to top and external-link icon 1rem.

## Deploy and domain

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages. It runs manually only (`workflow_dispatch`); a push to `main` does not deploy.

The custom domain, uxaksh.ca, is being connected. `site` in `astro.config.mjs` and `public/CNAME` are staged for it. There is no `base` setting, so until the domain is connected, a Pages deploy at the `github.io/<repo>` path would 404 its assets. Verify the domain in GitHub Settings > Pages before adding DNS records (takeover risk), then turn on Enforce HTTPS once the certificate is issued.

## Accessibility and performance targets

- WCAG 2.2 AA is the floor; text contrast aims for AAA (7:1 or better).
- No client JavaScript. Limit: 150KB transferred per page, excluding lazy-loaded images. The homepage is about 79KB; `/work/figwrite` is about 117KB at desktop width, mostly its cover.
- Images are AVIF with a WebP fallback. Case-study images use quality 90; covers use AVIF 75 and WebP 90, which measured smaller and closer to the source than a single quality.
- Motion is limited to transform, opacity and colour. Colour transitions run only under `prefers-reduced-motion: no-preference`, and a global reduce override in `main.css` covers the rest.
