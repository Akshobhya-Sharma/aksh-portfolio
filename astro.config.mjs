// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // Custom domain via public/CNAME; static output for GitHub Pages
  site: "https://uxaksh.ca",

  output: "static",
  integrations: [mdx()],
});
