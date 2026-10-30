import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogs, getBlogBySlug } from "../../../content/blogs";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  Calendar,
  User,
  ChevronRight,
  ArrowRight,
  MessageCircle
} from "lucide-react";
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((b) => ({
    slug: b.slug
  }));
}
export async function generateMetadata({
  params
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) {
    return { title: "Blog Not Found | Services Plus" };
  }
  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: blog.canonical
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: blog.canonical,
      type: "article",
      publishedTime: blog.publishedAt,
      siteName: "Services Plus"
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle,
      description: blog.metaDescription
    }
  };
}
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) {
    notFound();
  }
  const allBlogs = getAllBlogs();
  const relatedBlogs = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.metaDescription,
    author: {
      "@type": "Organization",
      name: "Services Plus Legal Team"
    },
    publisher: {
      "@type": "Organization",
      name: "Services Plus",
      logo: {
        "@type": "ImageObject",
        url: "https://www.servicesplus.in/assets/images/logo-h-390c5c1a.png"
      }
    },
    datePublished: blog.publishedAt,
    mainEntityOfPage: blog.canonical
  };
  return <div className="bg-sp-bg min-h-screen pb-20">
      {
    /* Inject Structured Data */
  }
      <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
  />

      {
    /* Breadcrumbs */
  }
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono overflow-x-auto">
          {blog.breadcrumbs.map((b, idx) => {
    const isLast = idx === blog.breadcrumbs.length - 1;
    return <React.Fragment key={b.href}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />}
                {isLast ? <span className="text-sp-ink font-semibold truncate">{b.label}</span> : <Link href={b.href} className="hover:text-sp-primary truncate">
                    {b.label}
                  </Link>}
              </React.Fragment>;
  })}
        </div>
      </div>

      {
    /* Article Header */
  }
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <header className="mb-8">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full mb-4">
            {blog.category}
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-sp-ink tracking-tight mb-4 leading-tight">
            {blog.h1}
          </h1>
          <div className="flex items-center gap-4 text-xs font-mono text-sp-slate pb-6 border-b border-sp-tint">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sp-primary" />
              {blog.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sp-primary" />
              {blog.author}
            </span>
          </div>
        </header>

        {
    /* Article Body */
  }
        <div className="bg-white rounded-2xl border border-sp-tint p-6 sm:p-10 shadow-sp-soft space-y-8">
          {blog.sections.map((sec, idx) => <section key={idx} className="space-y-3">
              {sec.heading && <h2 className="text-xl font-bold text-sp-ink tracking-tight pt-2">
                  {sec.heading}
                </h2>}
              <div className="text-sm text-sp-slate leading-relaxed space-y-3">
                {sec.paragraphs.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
              </div>
            </section>)}

          {
    /* In-Article Consultation Banner */
  }
          <div className="mt-12 p-6 rounded-2xl bg-sp-navy text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-base text-white mb-1">
                Have questions regarding {blog.title}?
              </h3>
              <p className="text-xs text-sp-sky">
                Get free advice from certified corporate legal and tax professionals.
              </p>
            </div>
            <Button
    href="https://wa.me/918800028794?text=Hi%2C%20I%20read%20your%20article%20on%20ServicesPlus%20and%20need%20expert%20consultation."
    variant="outline"
    size="sm"
    external
    className="shrink-0 bg-white text-sp-navy hover:bg-sp-bg"
  >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
              WhatsApp Help
            </Button>
          </div>
        </div>

        {
    /* Related Articles */
  }
        {relatedBlogs.length > 0 && <div className="mt-16 pt-12 border-t border-sp-tint">
            <h3 className="text-xl font-bold text-sp-ink mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => <Card
    key={rel.slug}
    className="p-5 flex flex-col justify-between group bg-white border border-sp-tint"
  >
                  <div>
                    <h4 className="text-sm font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-2 line-clamp-2">
                      <Link href={`/blog-detail/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-sp-slate line-clamp-3 leading-relaxed mb-4">
                      {rel.summary}
                    </p>
                  </div>
                  <Link
    href={`/blog-detail/${rel.slug}`}
    className="inline-flex items-center gap-1 text-xs font-semibold text-sp-primary group-hover:translate-x-1 transition-transform"
  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>)}
            </div>
          </div>}
      </article>
    </div>;
}
