import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// category ids match `categories` in src/data/home.ts.
// accent is a full token name (as in home.ts AccentToken): use as `var(--${accent})`.
const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        category: z.enum(["design-coding", "ux-ui"]),
        layout: z.enum(["default", "wide"]).default("default"),
        accent: z.enum([
          "color-accent-home",
          "color-accent-huana",
          "color-accent-figwrite",
          "color-accent-tyia",
        ]),
        cover: z.object({ src: image(), alt: z.string().min(1) }).optional(),
        date: z.coerce.date(),
        draft: z.boolean().default(false),
      })
      .strict(),
});

export const collections = { work };
