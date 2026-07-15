import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Add a course: create `src/content/courses/<slug>.md` with this frontmatter.
 * Body markdown = long description shown on the course detail page.
 */
const courseSchema = z.object({
  title: z.string(),
  build: z.string(),
  summary: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  topics: z.array(z.string()).default([]),
  duration: z.string().optional(),
  format: z.enum(['in-person', 'hybrid', 'online']).default('in-person'),
  status: z.enum(['coming-soon', 'open', 'full']).default('coming-soon'),
  featured: z.boolean().default(false),
  order: z.number().default(100),
  outcomes: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/courses' }),
  schema: courseSchema,
});

export const collections = { courses };

export type CourseFrontmatter = z.infer<typeof courseSchema>;
