import { BlogPostPage } from "@/components/tax-alphonic/blog/BlogPages";
import { getBlogPost } from "@/service/blogService";
import { createMetadata } from "@/lib/seoMetadata";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import LegacyBlogPostPage, { generateMetadata as legacyMetadata } from "@/features/legacy/LegacyBlogPostPage";

/*
 * /blog-detail/<slug>: one live CMS post (admin: Blog; drafts / scheduled / expired posts are not
 * returned). A slug the CMS doesn't have yet still shows the old post from src/content.
 */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return legacyMetadata({ params });

  const metadata = createMetadata({ ...post, canonicalUrl: post.canonicalUrl || `${SITE_URL}${post.path}` });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.date || undefined } };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return <LegacyBlogPostPage params={params} />;

  const url = `${SITE_URL}${post.path}`;
  const schema = post.schemaMarkup || {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.image || undefined,
    datePublished: post.date || undefined,
    dateModified: post.updatedAt || undefined,
    author: post.author?.name ? { "@type": "Person", name: post.author.name } : { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
  };

  return (
    <>
      <JsonLd value={schema} />
      {post.faqs.length > 0 && (
        <JsonLd value={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }} />
      )}
      <BlogPostPage post={post} url={url} />
    </>
  );
}
