import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { accentTokens, categoryIds } from "./data/home";

// category and accent enums come from src/data/home.ts.
// accent is a full token name (as in home.ts AccentToken): use as `var(--${accent})`.
const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        category: z.enum(categoryIds),
        width: z.enum(["default", "wide"]).default("default"),
        accent: z.enum(accentTokens),
        cover: z.object({ src: image(), alt: z.string().min(1) }).optional(),
        date: z.coerce.date(),
        draft: z.boolean().default(false),
      })
      .strict(),
});

export const collections = { work };
