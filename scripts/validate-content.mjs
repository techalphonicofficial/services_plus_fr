import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';

const ServiceItemSchema = z.object({
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

async function validateAllContent() {
  console.log('--- VALIDATING TYPED CONTENT STORE ---');
  const itemsDir = path.join(process.cwd(), 'src', 'content', 'services', 'items');
  const files = await fs.readdir(itemsDir);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  let errors = 0;
  for (const file of jsonFiles) {
    const raw = await fs.readFile(path.join(itemsDir, file), 'utf-8');
    const parsed = JSON.parse(raw);
    const result = ServiceItemSchema.safeParse(parsed);
    if (!result.success) {
      console.error(`Validation failed for ${file}:`, result.error.format());
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`FAILED: ${errors} service files had schema violations.`);
    process.exit(1);
  }

  console.log(`PASSED: All ${jsonFiles.length} service files are strictly valid according to Zod schema.`);
}

validateAllContent().catch(err => {
  console.error(err);
  process.exit(1);
});

