import { notFound } from "next/navigation";
import Link from "next/link";
import { NAV_CATEGORIES } from "../../../content/navigation";
import { getServicesByCategory } from "../../../content/services";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ArrowRight, Shield, ChevronRight } from "lucide-react";
export async function generateStaticParams() {
  return [
    { slug: "startup" },
    { slug: "trademark" },
    { slug: "taxes" },
    { slug: "compliance" },
    { slug: "certification-licensing" }
  ];
}
export async function generateMetadata({
  params
}) {
  const { slug } = await params;
  const category = NAV_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return { title: "Category Not Found | Services Plus" };
  }
  return {
    title: `${category.title} Services in India | Services Plus`,
    description: category.description,
    alternates: {
      canonical: `https://www.servicesplus.in/service-by-categories/${slug}`
    },
    openGraph: {
      title: `${category.title} Services in India | Services Plus`,
      description: category.description,
      url: `https://www.servicesplus.in/service-by-categories/${slug}`,
      siteName: "Services Plus"
    }
  };
}
export default async function CategoryLandingPage({ params }) {
  const { slug } = await params;
  const category = NAV_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }
  const categoryServices = getServicesByCategory(slug);
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
          <span className="text-sp-ink font-semibold">{category.title}</span>
        </div>
      </div>

      {
    /* Category Hero Header */
  }
      <section className="bg-white border-b border-sp-tint/80 py-16 relative sp-plus-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Authorized Corporate Practice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-sp-ink tracking-tight mb-4">
            {category.title} Services
          </h1>
          <p className="text-base text-sp-slate max-w-2xl mx-auto leading-relaxed mb-8">
            {category.description} Comprehensive filing, documentation, and advisory support backed by verified corporate lawyers and chartered accountants.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
    href={`https://wa.me/918800028794?text=${encodeURIComponent(
      `Hi ServicesPlus, I need consultation regarding ${category.title} services.`
    )}`}
    external
    showPlus
  >
              Get Custom Quote
            </Button>
            <Button href="/contact" variant="outline">
              Contact Advisory Desk
            </Button>
          </div>
        </div>
      </section>

      {
    /* Services Grid */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-sp-ink">
              All {category.title} Solutions ({categoryServices.length})
            </h2>
            <p className="text-xs text-sp-slate mt-1">
              Select a service below to view required documents, turnaround times, and submit an enquiry.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryServices.map((service) => <Card
    key={service.slug}
    className="p-6 flex flex-col justify-between group bg-white"
  >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-sp-tint text-sp-primary flex items-center justify-center font-mono font-bold text-sm">
                    +
                  </span>
                  <span className="text-[11px] font-mono text-sp-slate bg-sp-bg px-2 py-0.5 rounded border border-sp-tint/60">
                    Online Filing
                  </span>
                </div>
                <h3 className="text-base font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-2">
                  <Link href={`/service/${service.slug}`}>{service.title}</Link>
                </h3>
                <p className="text-xs text-sp-slate leading-relaxed line-clamp-3 mb-4">
                  {service.metaDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-sp-tint/80 flex items-center justify-between">
                <span className="text-xs font-mono text-sp-primary font-semibold">
                  Get a quote
                </span>
                <Link
    href={`/service/${service.slug}`}
    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary group-hover:translate-x-1 transition-transform"
  >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>)}
        </div>
      </section>
    </div>;
}
