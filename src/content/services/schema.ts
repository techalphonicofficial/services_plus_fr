import { z } from 'zod';

export const ServiceItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  canonical: z.string().url(),
  h1: z.string().min(1),
  category: z.string().min(1),
  overview: z.string(),
  benefits: z.array(z.string()),
  documents: z.array(z.string()),
  process: z.array(z.string()),
  eligibility: z.array(z.string()),
  pricing: z.object({
    price: z.string().optional(),
    note: z.string().optional(),
  }),
  faqs: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })
  ),
  sections: z.array(
    z.object({
      heading: z.string(),
      paragraphs: z.array(z.string()),
    })
  ),
  breadcrumbs: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    })
  ),
});

export type ServiceItem = z.infer<typeof ServiceItemSchema>;
