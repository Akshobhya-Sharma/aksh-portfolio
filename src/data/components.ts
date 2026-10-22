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
    ],
    howTo: [
      "Use a Callout for a point you want readers to stop and notice. Pick a tone: note for context, insight for something you learned, warning for a risk or limit. Keep it to a few sentences. The tone label shows in text, so it works without colour.",
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
