# aksh-portfolio

Portfolio site for Aksh: a homepage and UX case studies. Static output, no client JavaScript, built for keyboard and screen-reader use first. The site is on GitHub and viewed locally with `npm run dev`. The custom domain (uxaksh.ca) is not connected yet.

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

| Command                | What it does                                                     | Needs                        |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------- |
| `npm install`          | Install dependencies                                             | Node                         |
| `npm run dev`          | Local dev server                                                 | Node                         |
| `npm run build`        | Static build to `dist/`                                          | Node                         |
| `npm run format`       | Prettier: format the project in place                            | Node                         |
| `npm run format:check` | Prettier: fail if any file is unformatted                        | Node                         |
| `npm run preview`      | Serve the built `dist/`                                          | a build                      |
| `npm run lint`         | ESLint (including jsx-a11y rules)                                | Node                         |
| `npm run typecheck`    | `astro check` (TypeScript and Astro)                             | Node                         |
| `npm run contrast`     | Checks text and accent colours against the backgrounds           | Node                         |
| `npm run a11y`         | axe scan (WCAG 2.2 AA) of the built site                         | a build, plus Chrome or Edge |
| `npm run check`        | format check, lint, typecheck, build and contrast, in that order | Node                         |

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
                        ProjectCard, Footer, Icon
  layouts/BaseLayout.astro  Skip link markup, font preloads, style imports
  pages/index.astro     The homepage
  styles/               tokens.css (design tokens), main.css (focus ring, reduced
                        motion, shell, sections), fonts.css
  assets/logo.svg
public/
  fonts/                Self-hosted woff2 and OFL licence files
  images/               Project images (placeholder.svg for now)
  CNAME                 Custom domain for GitHub Pages (staged, see Deploy)
scripts/                a11y.mjs, contrast-check.mjs
specs/                  Feature specs (the build contract)
design/                 Figma screenshots (PNG). Gitignored: not in clones.
docs/                   Local project log. Gitignored: not in the repo.
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
- **Projects:** add an entry to `projects` with a unique `slug`, a `categoryId` that matches a category, an `accent` and an `image`. Change `categoryId` to move a card. Array order is page order. The `slug` is used for `/work/<slug>`, which is not built yet.
- **Images:** put the file in `public/images/`, then replace the project's `image: placeholder()` with `{ src: "/images/<file>", alt: "...", width, height }`. Give real pixel dimensions. Use `alt: ""` for purely decorative images. Do not start alt text with "image" or "photo".
- **Accents:** `accent` is a token name. To add one, define `--color-accent-<name>` in `src/styles/tokens.css`, add it to `AccentToken`, and run `npm run contrast`. Accents must reach 4.5:1 on the page background.
- **Gradients:** the `--tile-*` values in `tokens.css`. White text on them must stay at 4.5:1 or better; `npm run contrast` checks this.
- **Icons:** set a skill's `icon` to any Phosphor icon name, for example `"microscope"`. Browse names at phosphoricons.com.
- **Footer:** `footer.email` sets the mailto link. `footer.extraLines` sets the small print lines below it.

## Design tokens

`src/styles/tokens.css` is the only place for colours, spacing, type sizes and focus styles. Component CSS refers to tokens and does not hard-code values.

## Layout conventions

- `.shell` (max width 1440px, centred) sits on the section element in Hero, SkillSet, Toolkit and Footer, and on an inner wrapper in Header and Projects. The Toolkit light band and the section rules in those sections stop at 1440px; the Projects rule is full width.
- Section separators use `border-bottom` on `.section` (main.css), not margins or `<hr>`. The footer has none.
- Breakpoints: below 1024px stacks two-column sections; below 42rem makes the Projects card groups one column. The Projects breakpoint is in rem so the grid also stacks at high zoom.
- Project cards: the title and summary sit above the stretched link, so their text can be selected. Clicking the image, padding or empty space opens the case study; clicking text does not.

## Fonts and icons, with licences

- **Newsreader** (headings), SIL Open Font License 1.1. Licence: `public/fonts/OFL-Newsreader.txt`
- **Figtree** (body text), SIL Open Font License 1.1. Licence: `public/fonts/OFL-Figtree.txt`
- Font files are woff2 in `public/fonts/`, loaded with `font-display: swap` from `src/styles/fonts.css`. `BaseLayout.astro` preloads the two critical weights.
- **Phosphor Icons** (`@phosphor-icons/core`), MIT licence. Used at build time only. The package is about 18MB installed, but none of it is shipped to the browser. Icon sizes are rem props on `Icon.astro`, not tokens: hero button 1.5rem, card button 1.75rem, skills 2rem, back to top 1rem.

## Deploy and domain

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

The custom domain, uxaksh.ca, is not connected yet. It will be connected at production. `site` in `astro.config.mjs` and `public/CNAME` are staged for it. There is no `base` setting, so until the domain is connected, a Pages deploy at the `github.io/<repo>` path would 404 its assets. Before pointing DNS at GitHub, verify the domain in GitHub Settings > Pages (subdomain takeover risk).

## Accessibility and performance targets

- WCAG 2.2 AA is the floor; text contrast aims for AAA (7:1 or better).
- No client JavaScript on the homepage. Page weight is about 79KB transferred, against a 100KB limit per page.
- Motion is limited to transform, opacity and colour. Colour transitions run only under `prefers-reduced-motion: no-preference`, and a global reduce override in `main.css` covers the rest.
