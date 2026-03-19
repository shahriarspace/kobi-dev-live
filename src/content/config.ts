import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default("Kobi Team"),
    tags: z.array(z.string()).default([]),
    keywords: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
