import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogs, getBlogBySlug } from "../../../content/blogs";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ChevronRight, ArrowRight, MessageCircle } from "lucide-react";

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((b) => ({
    slug: b.slug
  }));
}

export async function generateMetadata({ params }) {
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

  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate overflow-x-auto no-scrollbar">
          {blog.breadcrumbs.map((b, idx) => {
            const isLast = idx === blog.breadcrumbs.length - 1;
            return (
              <React.Fragment key={b.href}>
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
                )}
                {isLast ? (
                  <span className="text-sp-ink font-semibold truncate">
                    {b.label}
                  </span>
                ) : (
                  <Link href={b.href} className="hover:text-sp-primary truncate">
                    {b.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <header className="mb-8">
          <p className="text-xs font-semibold text-sp-primary mb-2.5 flex items-center gap-1.5">
            <span aria-hidden="true">+</span>
            <span>{blog.category}</span>
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-sp-ink tracking-[-0.02em] mb-4 leading-[1.06]">
            {blog.h1}
          </h1>
          <div className="flex items-center gap-3 text-xs text-sp-slate tabular-nums pb-6 border-b border-sp-border">
            <span>Published {blog.publishedAt}</span>
            <span>&middot;</span>
            <span>{blog.author}</span>
          </div>
        </header>

        <Card hoverLift={false} className="bg-white p-6 sm:p-10 space-y-8">
          {blog.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              {sec.heading && (
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-sp-ink tracking-[-0.02em] pt-2">
                  {sec.heading}
                </h2>
              )}
              <div className="text-base text-sp-slate leading-[1.6] space-y-3 max-w-[65ch]">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {/* In-Article Consultation Banner */}
          <div className="mt-10 p-6 rounded-sp-md bg-sp-tint/45 border border-sp-border-strong flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="font-semibold text-base text-sp-ink mb-1">
                Need assistance with {blog.title}?
              </h3>
              <p className="text-xs text-sp-slate">
                Speak directly with our corporate legal and tax advisors.
              </p>
            </div>
            <Button
              href="https://wa.me/918800028794?text=Hi%2C%20I%20read%20your%20article%20on%20ServicesPlus%20and%20need%20expert%20consultation."
              size="sm"
              external
              showPlus
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </Button>
          </div>
        </Card>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-sp-border">
            <h2 className="text-2xl font-display font-semibold text-sp-ink mb-6">
              Related Briefings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel, idx) => (
                <Card
                  key={rel.slug}
                  className="p-5 flex flex-col justify-between bg-white"
                >
                  <div>
                    <span className="text-lg font-display font-bold text-sp-primary tabular-nums block mb-2">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-semibold text-sp-ink group-hover/card:text-sp-primary transition-colors mb-2 line-clamp-2">
                      <Link href={`/blog-detail/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-xs text-sp-slate line-clamp-3 leading-relaxed mb-4">
                      {rel.summary}
                    </p>
                  </div>
                  <Link
                    href={`/blog-detail/${rel.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary group-hover/card:translate-x-1 transition-transform"
                  >
                    <span>Read briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
