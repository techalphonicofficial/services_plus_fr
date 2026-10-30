import { z } from "zod";
const BlogItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  canonical: z.string().url(),
  h1: z.string().min(1),
  summary: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      paragraphs: z.array(z.string())
    })
  ),
  author: z.string(),
  publishedAt: z.string(),
  category: z.string(),
  breadcrumbs: z.array(
    z.object({
      label: z.string(),
      href: z.string()
    })
  )
});
export {
  BlogItemSchema
};
