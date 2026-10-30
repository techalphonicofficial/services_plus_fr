import fs from "node:fs";
import path from "node:path";
import { BlogItemSchema } from "./schema";
const ITEMS_DIR = path.join(process.cwd(), "src", "content", "blogs", "items");
function getAllBlogs() {
  if (!fs.existsSync(ITEMS_DIR)) return [];
  const files = fs.readdirSync(ITEMS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(ITEMS_DIR, file), "utf-8");
    const parsed = JSON.parse(raw);
    const validated = BlogItemSchema.safeParse(parsed);
    if (!validated.success) {
      console.error(`Invalid blog file ${file}:`, validated.error.format());
      throw new Error(`Content validation failed for blog ${file}`);
    }
    return validated.data;
  });
}
function getBlogBySlug(slug) {
  const filePath = path.join(ITEMS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  const validated = BlogItemSchema.safeParse(parsed);
  if (!validated.success) {
    console.error(`Invalid blog file ${slug}.json:`, validated.error.format());
    return null;
  }
  return validated.data;
}
export {
  getAllBlogs,
  getBlogBySlug
};
