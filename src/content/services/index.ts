import fs from 'node:fs';
import path from 'node:path';
import { ServiceItemSchema, type ServiceItem } from './schema';

const ITEMS_DIR = path.join(process.cwd(), 'src', 'content', 'services', 'items');

export function getAllServices(): ServiceItem[] {
  if (!fs.existsSync(ITEMS_DIR)) return [];
  const files = fs.readdirSync(ITEMS_DIR).filter(f => f.endsWith('.json'));

  return files.map(file => {
    const raw = fs.readFileSync(path.join(ITEMS_DIR, file), 'utf-8');
    const parsed = JSON.parse(raw);
    const validated = ServiceItemSchema.safeParse(parsed);
    if (!validated.success) {
      console.error(`Invalid service file ${file}:`, validated.error.format());
      throw new Error(`Content validation failed for service ${file}`);
    }
    return validated.data;
  });
}

export function getServiceBySlug(slug: string): ServiceItem | null {
  const filePath = path.join(ITEMS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(raw);
  const validated = ServiceItemSchema.safeParse(parsed);
  if (!validated.success) {
    console.error(`Invalid service file ${slug}.json:`, validated.error.format());
    return null;
  }
  return validated.data;
}

export function getServicesByCategory(categorySlug: string): ServiceItem[] {
  return getAllServices().filter(s => s.category === categorySlug);
}
