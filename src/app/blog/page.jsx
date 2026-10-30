import Link from "next/link";
import { getAllBlogs } from "../../content/blogs";
import { Card } from "../../components/ui/Card";
import { ArrowRight, Calendar, User, BookOpen, ChevronRight } from "lucide-react";
export const metadata = {
  title: "Corporate Legal, Tax & Compliance Blogs | Services Plus",
  description: "Comprehensive guides and regulatory insights on company formation, GST filing, trademark protection, and statutory compliance in India.",
  alternates: {
    canonical: "https://www.servicesplus.in/blog"
  },
  openGraph: {
    title: "Corporate Legal, Tax & Compliance Blogs | Services Plus",
    description: "Comprehensive guides and regulatory insights on company formation, GST filing, trademark protection, and statutory compliance in India.",
    url: "https://www.servicesplus.in/blog",
    siteName: "Services Plus"
  }
};
export default function BlogIndexPage() {
  const blogs = getAllBlogs();
  return <div className="bg-sp-bg min-h-screen pb-20">
      {
    /* Breadcrumbs */
  }
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />
          <span className="text-sp-ink font-semibold">Blogs</span>
        </div>
      </div>

      {
    /* Hero Header */
  }
      <section className="bg-white border-b border-sp-tint/80 py-16 relative sp-plus-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base &amp; Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-sp-ink tracking-tight mb-4">
            Services Plus Knowledge Hub
          </h1>
          <p className="text-base text-sp-slate max-w-2xl mx-auto leading-relaxed">
            Stay ahead of regulatory changes with practical guides written by chartered accountants and corporate attorneys.
          </p>
        </div>
      </section>

      {
    /* Blog Cards Grid */
  }
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-mono text-sp-slate font-semibold">
            Showing all {blogs.length} articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => <Card
    key={blog.slug}
    className="p-6 flex flex-col justify-between group bg-white border border-sp-tint"
  >
              <div>
                <div className="flex items-center gap-3 text-xs text-sp-slate mb-3 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {blog.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    Legal Team
                  </span>
                </div>

                <h2 className="text-base font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-2.5 line-clamp-2">
                  <Link href={`/blog-detail/${blog.slug}`}>{blog.title}</Link>
                </h2>

                <p className="text-xs text-sp-slate leading-relaxed line-clamp-3 mb-6">
                  {blog.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-sp-tint/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-sp-primary bg-sp-tint px-2 py-0.5 rounded font-semibold">
                  {blog.category}
                </span>
                <Link
    href={`/blog-detail/${blog.slug}`}
    className="inline-flex items-center gap-1 text-xs font-semibold text-sp-primary group-hover:translate-x-1 transition-transform"
  >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>)}
        </div>
      </main>
    </div>;
}
