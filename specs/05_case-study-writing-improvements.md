# Improvements to be made
These are improvements that I am spotting as I write my case studies.

## List

| What | Where | Fix |
| -- | -- | -- |
| Disable build pipeline | Github | Disable the pipeline. I don't need it yet. |
| Image grid | Components | Add a cool image grid to display mockups | Give dynamic component that auto-adjusts based on number of images in it. |
| Blurry images | Figure, Cover | Images are blurry because of compression. |
| Separator colour | in case studies | Wherever I use `---` separator, make it colour of our border-bottom, i.e. --color-neutral-200 (check before implementation) |
| Style h2 section background | Case studies | Allow me to add different background for sections so that I can separate them (just like homepage) |
| Difficult to copy component code | /components | Give me a way to copy the `import...` statement AND give me a way to copy the actual code, separate from each other. Currently, clicking one line selects the whole paragraph and does not let me select just one line (for e.g. <stat card>) |
| Flow diagrams | Case studies | Give me a way to render mermaid diagrams or ascii diagrams that are accessible |
| Click image to expand | Case studies | Give my users a way to either zoom and pan images or click to expand images in a light box. This should be a cool interaction |
| Quote box | Case studies | I need a quote box so I can highlight sentences, messages or quotes |
| Grey callout | Case studies | Give me a neutral grey call out, same style, just different colour for when I want to call out something mildly and not in blue, purpose or yellow |

## Decisions (2026-10-26)
The no-client-JS rule stays. Nothing below may ship client JS.

| Item | Decision |
| -- | -- |
| Disable build pipeline | Keep `deploy.yml`, switch its trigger to `workflow_dispatch` only (manual run, easy to re-enable). Update the CLAUDE.md deploy note. |
| Image grid | New `ImageGrid` component, CSS grid. Layout adapts to image count (1, 2, 3, 4, 5+). Responsive down to 320px, no overflow. Alt text required per image, optional caption. |
| Blurry images | Investigate the cause (source size, Astro image quality, srcset/sizes, CSS upscaling) in Figure and the cover, then fix. Report before/after. |
| Separator colour | `hr` / `---` in case studies uses the same token as the section border-bottom (confirm it is `--color-neutral-200`). |
| Section background | Opt-in wrapper `<Section tone="...">`. Only wrapped sections get a background; unwrapped ones keep the site background. Reuse homepage section tokens. Text contrast >= 4.5:1. |
| Copy component code | No JS, no copy buttons. On /components, the import line and the usage code are separate blocks, and a single line can be selected on its own. |
| Flow diagrams | ASCII diagrams in a component that renders `<pre>` with a required text alternative. No Mermaid. |
| Click image to expand | No-JS `ZoomCanvas`: framed scroll box with a `minHeight` prop, image centred. Zoom levels via native radio buttons (Fit / 2x / 3x). Pan via native scroll (keyboard-focusable region). Lightbox is not built. |
| Quote box | `Quote` component on `<blockquote>`, styled. `cite` is optional; without it, it is a highlighted statement. |
| Grey callout | New Callout tone `muted`. Same layout as other tones. Label uses neutral-700 or darker. Added to `npm run contrast`. |

New components (`ImageGrid`, `ZoomCanvas`, `Quote`, `Section`, ASCII diagram) each get a registry entry in `src/data/components.ts` and a live example on /components.