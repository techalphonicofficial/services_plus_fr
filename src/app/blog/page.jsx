import Link from "next/link";
import { getAllBlogs } from "../../content/blogs";
import { Card } from "../../components/ui/Card";
import { DocumentationDuotoneIcon } from "../../components/ui/DuotoneIcons";
import { ArrowRight, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Corporate Legal, Tax & Compliance Blogs | Services Plus",
  description:
    "Comprehensive guides and regulatory insights on company formation, GST filing, trademark protection, and statutory compliance in India.",
  alternates: {
    canonical: "https://www.servicesplus.in/blog"
  },
  openGraph: {
    title: "Corporate Legal, Tax & Compliance Blogs | Services Plus",
    description:
      "Comprehensive guides and regulatory insights on company formation, GST filing, trademark protection, and statutory compliance in India.",
    url: "https://www.servicesplus.in/blog",
    siteName: "Services Plus"
  }
};

export default function BlogIndexPage() {
  const blogs = getAllBlogs();

  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="w-full flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">Blogs</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-sp-border py-12 lg:py-16 relative sp-plus-grid">
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
          <p className="text-xs font-semibold text-sp-primary mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">+</span>
            <span>Knowledge Base &amp; Regulatory Briefings</span>
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-sp-ink tracking-[-0.02em] mb-4">
            Services Plus Knowledge Hub
          </h1>
          <p className="text-base sm:text-[17px] text-sp-slate max-w-[60ch] leading-[1.6]">
            Practical compliance guides and regulatory updates written by chartered accountants and corporate attorneys.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 pt-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-semibold text-sp-slate tabular-nums">
            Showing all {blogs.length} articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => {
            const tabularIdx = String(idx + 1).padStart(2, "0");
            return (
              <Card
                key={blog.slug}
                className="p-6 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl font-display font-bold text-sp-primary tabular-nums">
                        {tabularIdx}
                      </span>
                      <span className="text-xs font-semibold text-sp-primary bg-sp-tint/60 px-2.5 py-0.5 rounded-sp-sm border border-sp-border">
                        {blog.category}
                      </span>
                    </div>
                    <DocumentationDuotoneIcon className="w-5 h-5 shrink-0" />
                  </div>

                  <p className="text-xs text-sp-slate tabular-nums mb-2">
                    {blog.publishedAt} &middot; Legal Team
                  </p>

                  <h2 className="text-lg font-semibold text-sp-ink group-hover/card:text-sp-primary transition-colors mb-2.5 line-clamp-2 leading-snug">
                    <Link href={`/blog-detail/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-sm text-sp-slate leading-relaxed line-clamp-3 mb-6">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-sp-border flex items-center justify-between text-xs font-semibold">
                  <span className="text-sp-slate">Briefing</span>
                  <Link
                    href={`/blog-detail/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-sp-primary group-hover/card:translate-x-1 transition-transform"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
