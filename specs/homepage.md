# Spec: Home page

Type: feature Status: built (2026-10-20), pending human checks
Save as: specs/homepage.md

## Goal

A visitor understands in seconds what Aksh does and who he works with, can browse his projects, and can open a case study or email him, on any screen size.

## Context

- Audience: small organisations, non-profits and individuals who want quality work with full ownership, plus people learning from the case studies.
- Layout and copy come from the home screenshot in design/. The placeholder wordmark and tool logos in the preview are not final.
- Builds on the project brief (specs/_project.md): Astro, plain CSS, tokens only. Responsive behavior uses fluid clamp() tokens plus the 1024/640/480px breakpoints in tokens.css.
- Case study pages (Huana, FigWrite) are separate milestones. Their "Read more" links point at pages that do not exist yet.

## Decisions

- Hero, Skill set, Custom toolkit, Projects and footer are separate section components: each is reusable on other pages.
- Two columns (heading left, content right) collapse to one column below 1024px: one consistent mobile cutoff, as in main.css.
- Page is `<h1>` once (hero), then `<h2>` per section: keeps the heading outline valid for screen readers.
- Project cards use one "Read more" link stretched over the whole card, with the project name hidden for screen readers: large click target, no duplicate links.
- Category tiles ("Design and coding", "UX / UI Projects") are gradient plus a small noise tile: avoids heavy filters on low-RAM phones. Category should be addable or removable based on the projects that I want to display. Allow configuration where I can select which project case study goes under which category.
- Tile text must pass AA against its lightest gradient point: checked by the contrast script once it exists.
- Newsreader for headings, figtree for body: decided earlier because OFL fonts can be self-hosted and system fonts cost nothing.
- Toolkit renders as a list with accessible names, not as a decorative image strip: logos alone convey nothing to a screen reader.
- Email is a plain mailto link: no form, no tracking, no backend. Allow customization in footer to add and remote text. For example:
  - Add string: `Designed by human. Coded by Claude Code.`
  - Add string: `I do not track anything on this website. It is simply a way for me to document my work so others can see what I do and learn from what I learn.`

## Scope

- Header with wordmark and links: home, work, connect.
- Hero: heading with italic accent word, intro paragraph, "See my work" button.
- Skill set: intro paragraph plus four items (UX Design, Accessibility Audits, Website development, LLM workflows).
- Custom toolkit: intro plus eight tools (Figma, Wix, Webflow, Miro, Excel, HTML, JavaScript, CSS).
- Projects: two groups, each a gradient tile plus project cards (see Open questions for which cards go where).
- Footer: availability line and email address. added text under heading using body 2 styling.
- Skip link, focus styles, reduced-motion handling.
- New tokens for accent color, focus ring and tile gradients added to tokens.css.

## Out of scope

- Case study pages and their content.
- Hamburger menu behavior (global shell milestone). For now the three links fit inline at 375px.
- Page transitions and scroll animations (motion milestone).
- Final logo artwork and final tool logos (see Open questions).
- Contact form, analytics.

## References refs

`design/*.png (home screenshot)`, `src/styles/*.css (tokens, main, fonts)`, `specs/*.md (references)`

## Constraints

- WCAG 2.2 AA: text 4.5:1 (3:1 for large text), 3:1 for focus indicators and UI boundaries, interactive targets at least 24px.
- Performance: under 100KB transferred for the page excluding images, no render-blocking JS, project images as AVIF/WebP with width and height set, lazy loaded below the fold.
- No hardcoded colors, spacing or fonts in component CSS: tokens only.
- No dark patterns, no third-party trackers.
- Fluid sizing via the existing clamp() tokens, with no extra media queries for type.

## Acceptance

- [x] At 320, 375, 768, 1024, 1440 and 2560px wide there is no horizontal scrollbar.
- [x] At 1024px and wider, Hero, Skill set and Toolkit show heading and content side by side. Below 1024px they stack.
- [x] The page has exactly one `<h1>`, and headings never skip a level.
- [x] axe reports zero violations on the page.
- [x] Every text/background pair in the page, including white text on both gradient tiles, measures at least 4.5:1 (3:1 for text 24px or larger), checked with a contrast tool.
- [x] The "focus" accent word measures at least 4.5:1 against the page background.
- [x] Keyboard: Tab reaches the skip link first, then header links, button, each project card once, then the email link. Every stop has a visible focus ring.
- [x] Each project card has one link.
- [ ] (human) A screen reader announces each card link with the project name (for example "Read more about Huana"). NVDA pass pending.
- [ ] (human) Clicking anywhere on a card opens its link.
- [x] The toolkit renders as a list of eight items in the DOM.
- [ ] (human) The toolkit is announced as a list of eight items.
- [x] With OS "reduce motion" on, no transitions or animations run. Verified in CSS (global reduce override); the OS setting itself was not tested.
- [x] Browser zoom at 200% keeps all content readable and reachable without horizontal scrolling. Re-check at 400% (grid bug fixed 2026-10-20; the project grid now stacks below 42rem).
- [x] No hex colors or pixel font sizes appear in the page's CSS, only token variables.
- [x] The page weighs under 100KB transferred, measured with images excluded (about 81KB).
- [ ] (human) The page loads and scrolls on Aksh's own phone without the browser crashing.
- [x] The mailto link is `mailto:leoaksh@live.in` (href verified). Opening a mail client is not tested.

## Open questions

- The screenshot shows the TYIA card twice, once under "Design and coding" and once under "UX / UI Projects". Is that a placeholder or intentional? What belongs in each group? [Response: It was a placeholder. The screenshot has been updated but this section should be dynamic anyway. Provide ability to select which case study goes under which category. Provide ability to create new category.]
- Where does "Read more" go for each card? Huana and FigWrite will have case study pages, but TYIA has no page yet. [Response: Read more will go to each individual case study page which has not been written yet.]
- What does the "work" nav link target: the Projects section on this page, or a separate index page? [Response: Work navigates to project section on the homepage]
- What are the exact accent orange and tile gradient colors in Figma? They are not in tokens.css, and I picked values by eye. [Response: Allow customizable colours for highlight words. Provide ability to select which word to highlight with a custom colour based on project]
- Does the "aksh" wordmark exist as an SVG? Which icon set do the four skill icons and the toolkit logos come from, and are their licenses fine for a public site? [Response: Aksh is a logo-svg file that has been stored under design as logo-onwhile.svg. Move to appropriate place when using in development.]
- Should the toolkit show brand logos or text labels? The logos are third-party trademarks. [Response: Provide ability to input logo that can potentially be linked to the site of the product.]
- Project images: which images or screenshots go in the cards, and who produces them? [Response: Project images not designed yet. They will be provided by me and stored in the relevant folder to be referenced in the code later. For now, implement placeholder image with clear indication of where I should put link to image in code so that it can be updated when we release.]
- Is the copy final? Examples: "an UX design" should probably be "a UX designer", and the TYIA text reads "hired us" (who is "us"?). [Response: This is not the final copy. This is the development copy to get us off the ground. Will be modified later in code manaully if required or in the json file if that is being used for content management.]
- Mobile and tablet frames: are there designs, or should responsive behavior just follow main.css? [Response: Responsive behaviour has been identified as simple stack on smaller viewports and one mobile screenshot is available in design folder for reference however we need to follow proper industry standard responsiveness with enhancement such as clamp() for font-size so that it is readable, accessible and usable on all viewports (including really large viewports)]
- Where does the Huana-to-FigWrite throughline callout go on this page, if at all? It is still undecided. [Response: For now, leave it be. We have defined this previously. We will also do a call out on the case study page.]

## Build notes (2026-10-20)

Where the build differs from the scope above, and why:

- Toolkit lists Claude in place of Wix. The eight items are Figma, Claude, Webflow, Miro, Excel, HTML, JavaScript, CSS (`src/data/home.ts`).
- Header has no "home" text link. The logo links home (`aria-label="Aksh, home"`). The nav is "work" and "connect".
- Section separators use `border-bottom` on `.section` (main.css), not margins or `<hr>`. The footer has none.
- `.shell` sits on the section in Hero, SkillSet, Toolkit and Footer, and on an inner wrapper in Header and Projects. The Toolkit band and those section rules cap at 1440px; the Projects rule is full width.
- Breakpoints in use: 1024px (sections stack) and 640px (Projects groups go to one column). 480px is not used.
- Icon sizes are rem props on `Icon.astro`, not tokens: hero 1.5rem, card 1.75rem, skills 2rem, back to top 1rem.
