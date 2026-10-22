// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import codeTheme from "./src/styles/code-theme.json" with { type: "json" };

// https://astro.build/config
export default defineConfig({
  // Custom domain via public/CNAME; static output for GitHub Pages
  site: "https://uxaksh.ca",

  output: "static",
  // scripts/contrast-check.mjs checks every token colour in this theme at 7:1
  markdown: {
    shikiConfig: { theme: /** @type {import("shiki").ThemeRegistration} */ (codeTheme) },
  },
  integrations: [mdx()],
});
