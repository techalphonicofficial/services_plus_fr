import { permanentRedirect } from "next/navigation";
import { blogPostPath } from "@/lib/siteConfig";

// Posts live at /blog-detail/<slug> on this website (/blog/<slug> redirects there).
export default async function BlogPostRedirect({ params }) {
  const { slug } = await params;
  permanentRedirect(blogPostPath(slug));
}
