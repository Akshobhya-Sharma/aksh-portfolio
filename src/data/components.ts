// Registry for the dev-only /components page. importLine is exactly what an author writes
// at the top of src/content/work/<slug>.mdx. scripts/check-registry.mjs verifies the paths resolve.

export interface ComponentVariant {
  name: string;
  snippet: string;
}
export interface ComponentEntry {
  id: string;
  name: string;
  importLine: string;
  variants: ComponentVariant[];
  howTo: string[];
}

const imp = (name: string) => `import ${name} from "../../components/case-study/${name}.astro";`;

export const components: ComponentEntry[] = [
  {
    id: "callout",
    name: "Callout",
    importLine: imp("Callout"),
    variants: [
      {
        name: "note",
        snippet: `<Callout tone="note">Placeholder text for a note.</Callout>`,
      },
      {
        name: "insight",
        snippet: `<Callout tone="insight" title="Placeholder title">Placeholder text for an insight.</Callout>`,
      },
      {
        name: "warning",
        snippet: `<Callout tone="warning">Placeholder text for a warning.</Callout>`,
      },
      {
        name: "muted",
        snippet: `<Callout tone="muted">Placeholder text for a mild aside.</Callout>`,
      },
    ],
    howTo: [
      "Use a Callout for a point you want readers to stop and notice. Pick a tone: note for context, insight for something you learned, warning for a risk or limit, muted for a mild aside. Keep it to a few sentences. The tone label shows in text, so it works without colour.",
    ],
  },
  {
    id: "statcard",
    name: "StatCard",
    importLine: `${imp("StatGrid")}\n${imp("StatCard")}`,
    variants: [
      {
        name: "three in a grid",
        snippet: `<StatGrid>\n  <StatCard value="00" label="Placeholder label" />\n  <StatCard value="00" label="Placeholder label" />\n  <StatCard value="00" label="Placeholder label" />\n</StatGrid>`,
      },
    ],
    howTo: [
      "Use a StatCard for one number and what it measures. Only use values from your own notes or data. Put two or three side by side, no more. If you have no number, do not use one.",
      "Always wrap StatCards in a StatGrid.",
    ],
  },
  {
    id: "datatable",
    name: "DataTable",
    importLine: imp("DataTable"),
    variants: [
      {
        name: "markdown table",
        snippet: `<DataTable caption="Placeholder caption">\n\n| Column A | Column B | Column C | Column D |\n| -------- | -------- | -------- | -------- |\n| Placeholder | Placeholder | Placeholder | Placeholder |\n| Placeholder | Placeholder | Placeholder | Placeholder |\n\n</DataTable>`,
      },
    ],
    howTo: [
      "Wrap wide tables in DataTable. A caption is required: it names the table for screen readers. The table scrolls sideways inside its own box, which readers can reach with the keyboard. Use it for tables with three or more columns.",
      "Put a blank line between the tags and the table. Do not write a caption inside the table: DataTable adds it.",
    ],
  },
  {
    id: "figure",
    name: "Figure",
    importLine: `${imp("Figure")}\nimport placeholder from "../../assets/work/_examples/placeholder.svg";`,
    variants: [
      {
        name: "with caption",
        snippet: `<Figure src={placeholder} alt="Placeholder: describe what the image is for" caption="Placeholder caption" />`,
      },
      {
        name: "decorative",
        snippet: `<Figure src={placeholder} alt="" decorative />`,
      },
    ],
    howTo: [
      "Use a Figure for any image that needs a caption. Write alt text that says what the image is for, not what it looks like. Use an empty alt only for decoration. Keep the caption to one line where you can.",
      "Add eager only for an image at the top of the page. The example image is an SVG, which is passed through as is. Photos and screenshots (PNG, JPG) are converted to AVIF and WebP.",
    ],
  },
  {
    id: "quote",
    name: "Quote",
    importLine: imp("Quote"),
    variants: [
      {
        name: "with cite",
        snippet: `<Quote cite="Placeholder name, placeholder role">Placeholder spoken line.</Quote>`,
      },
      {
        name: "statement",
        snippet: `<Quote>Placeholder highlighted statement.</Quote>`,
      },
    ],
    howTo: [
      "Use a Quote to highlight a message or a spoken line. Add cite to credit a person. Without cite, it reads as a highlighted statement.",
    ],
  },
  {
    id: "section",
    name: "Section",
    importLine: imp("Section"),
    variants: [
      {
        name: "light",
        snippet: `<Section tone="light" labelledby="placeholder-heading">

## Placeholder heading

Placeholder text.

</Section>`,
      },
      {
        name: "tint",
        snippet: `<Section tone="tint">

Placeholder text.

</Section>`,
      },
    ],
    howTo: [
      "Wrap a section in Section to give it a background and separate it from the rest. Unwrapped sections keep the site background. Pick a tone that keeps text readable.",
      "Tones: light and tint. Put a blank line between the tags and the content. Add labelledby with a heading id to make it a named region for screen readers. Without it, Section is a plain wrapper.",
    ],
  },
  {
    id: "imagegrid",
    name: "ImageGrid",
    importLine: `${imp("ImageGrid")}
import placeholder from "../../assets/work/_examples/placeholder.svg";`,
    variants: [
      {
        name: "one image",
        snippet: `<ImageGrid images={[{ src: placeholder, alt: "Placeholder: what this image shows" }]} />`,
      },
      {
        name: "three images",
        snippet: `<ImageGrid
  label="Placeholder group name"
  caption="Placeholder overall caption"
  images={[
    { src: placeholder, alt: "Placeholder: first image", caption: "Placeholder caption" },
    { src: placeholder, alt: "Placeholder: second image" },
    { src: placeholder, alt: "Placeholder: third image" },
  ]}
/>`,
      },
      {
        name: "five images",
        snippet: `<ImageGrid
  images={[
    { src: placeholder, alt: "Placeholder: first image" },
    { src: placeholder, alt: "Placeholder: second image" },
    { src: placeholder, alt: "Placeholder: third image" },
    { src: placeholder, alt: "Placeholder: fourth image" },
    { src: placeholder, alt: "Placeholder: fifth image" },
  ]}
/>`,
      },
    ],
    howTo: [
      "Use an ImageGrid to show several mockups together. The layout adjusts to the number of images: 1, 2, 3, 4, or 5 and more. Every image needs alt text. Captions are optional.",
      "Write alt text for each image that says what it shows for the reader. Do not repeat the caption. Use an empty alt only for decoration.",
      "Import each image, then list them in reading order in the images prop. label names the list for screen readers and is optional. On a narrow screen the images stack in one column.",
    ],
  },
  {
    id: "zoomcanvas",
    name: "ZoomCanvas",
    importLine: `${imp("ZoomCanvas")}
import flow from "../../assets/work/huana/development-pipeline.svg";`,
    variants: [
      {
        name: "wide diagram",
        snippet: `<ZoomCanvas
  id="flow-diagram"
  src={flow}
  alt="Placeholder: describe the diagram"
  caption="Placeholder caption"
  height="16rem"
/>`,
      },
    ],
    howTo: [
      "Use a ZoomCanvas for a large image readers may need to inspect. Readers pick Fit, 2x or 3x, then scroll to pan. Set height to size the frame. It works without JavaScript.",
      "id must be unique on the page. height is the frame height, in rem or dvh. The image is centred at Fit.",
    ],
  },
  {
    id: "asciidiagram",
    name: "AsciiDiagram",
    importLine: imp("AsciiDiagram"),
    variants: [
      {
        name: "sign-up flow",
        snippet:
          '<AsciiDiagram\n  label="Placeholder sign-up flow"\n  description="Placeholder: a three-step sign-up flow. A person signs up, then verifies their email, then sees a welcome page."\n>\n\n```text\n┌──────────┐    ┌──────────┐    ┌──────────┐\n│ Sign up  │───▶│ Verify   │───▶│ Welcome  │\n└──────────┘    └──────────┘    └──────────┘\n```\n\n</AsciiDiagram>',
      },
    ],
    howTo: [
      "Use the ASCII diagram for simple flows. A text description is required: it is what screen readers read instead of the drawing. Describe the steps and how they connect.",
      "Describe the steps and how they connect, in reading order. Start with what the diagram shows. Do not describe the characters. Put the drawing in a fenced text block between the tags, with a blank line around it, so MDX keeps its spaces. The drawing scrolls sideways inside its own box.",
    ],
  },
  {
    id: "plain-markdown",
    name: "Plain markdown",
    importLine: "No import needed.",
    variants: [
      {
        name: "table",
        snippet: `| Column A | Column B |\n| -------- | -------- |\n| Placeholder | Placeholder |`,
      },
      {
        name: "code",
        snippet: "```ts\nconst placeholder = true;\n```",
      },
    ],
    howTo: [
      "Tables and code blocks in plain markdown are styled already. No wrapper needed.",
      "Table: use a plain markdown table for short tables with two or three columns. For wider tables, use DataTable so they scroll without moving the page.",
      "Code: use a fenced code block and add the language after the opening backticks, for example ```ts. Code is highlighted at build time.",
    ],
  },
];
