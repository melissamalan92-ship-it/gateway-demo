import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Blog posts and rooms are markdown files written by the editor at /admin.
// Photos live in src/assets so Astro resizes and compresses them at build time.

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const rooms = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/rooms" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().default(10),
      building: z.string().optional(),
      sleeps: z.number().optional(),
      summary: z.string(),
      price: z.string().optional(),
      features: z.array(z.string()).default([]),
      photos: z.array(z.object({ image: image(), alt: z.string().optional() })).default([]),
      available: z.boolean().default(true),
    }),
});

export const collections = { blog, rooms };
