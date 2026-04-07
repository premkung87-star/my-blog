import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** 'en' | 'th' — used for html[lang] and og:locale */
    lang: z.enum(['en', 'th']).default('en'),
    /** Post format type */
    postType: z.enum(['Essay', 'Note', 'Lesson', 'Story']).optional(),
    /** Optional cover image path relative to /public */
    cover: z.string().optional(),
    /** Series name — groups posts into a series with prev/next nav */
    series: z.string().optional(),
    /** Order within series (1, 2, 3...) */
    seriesOrder: z.number().optional(),
  }),
});

export const collections = { blog };
