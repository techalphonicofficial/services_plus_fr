import { notFound } from "next/navigation";
import Link from "next/link";
import { NAV_CATEGORIES } from "../../content/navigation";
import { getServicesByCategory } from "../../content/services";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  CATEGORY_DUOTONE_ICONS,
  StartupDuotoneIcon
} from "../../components/ui/DuotoneIcons";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";

export async function generateStaticParams() {
  return [
    { slug: "startup" },
    { slug: "trademark" },
    { slug: "taxes" },
    { slug: "compliance" },
    { slug: "certification-licensing" }
  ];
}

export async function generateMetadata({ params }) {
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
  const categoryIndex = NAV_CATEGORIES.findIndex((c) => c.slug === slug);
  const category = NAV_CATEGORIES[categoryIndex];
  if (!category) {
    notFound();
  }

  const categoryServices = getServicesByCategory(slug);
  const CategoryIcon = CATEGORY_DUOTONE_ICONS[slug] || StartupDuotoneIcon;

  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="w-full flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">{category.title}</span>
        </div>
      </div>

      {/* Asymmetric Category Hero Header */}
      <section className="bg-white border-b border-sp-border py-12 lg:py-16 relative sp-plus-grid overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Category Index, Display H1, Description & Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-sp-primary">
                <span className="tabular-nums">0{categoryIndex + 1} / 05</span>
                <span aria-hidden="true">+</span>
                <span>Practice Directory &middot; {categoryServices.length} Services</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-display font-bold text-sp-ink tracking-[-0.02em] leading-[1.05]">
                {category.title} Services
              </h1>

              <p className="text-base sm:text-[17px] text-sp-slate leading-[1.6] max-w-[60ch]">
                {category.description} Complete documentation, statutory portal filing, and advisory support by Chartered Accountants, Company Secretaries, and corporate legal professionals.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Button
                  href={`https://wa.me/918800028794?text=${encodeURIComponent(
                    `Hi ServicesPlus, I need consultation regarding ${category.title} services.`
                  )}`}
                  external
                  showPlus
                >
                  Get a quote
                </Button>
                <Button href="/contact" variant="outline">
                  <MessageCircle className="w-4 h-4 text-sp-primary" />
                  <span>Contact Advisory Desk</span>
                </Button>
              </div>
            </div>

            {/* Right 5 Columns: Practice Category Switcher Ledger */}
            <div className="lg:col-span-5">
              <Card hoverLift={false} className="p-5 bg-sp-bg/70 border-sp-border-strong">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-sp-border">
                  <span className="text-xs font-semibold text-sp-ink">
                    All Practice Categories
                  </span>
                  <span className="text-xs text-sp-slate tabular-nums">01–05</span>
                </div>
                <div className="space-y-1.5">
                  {NAV_CATEGORIES.map((cat, idx) => {
                    const isCurrent = cat.slug === slug;
                    const Icon =
                      CATEGORY_DUOTONE_ICONS[cat.slug] || StartupDuotoneIcon;
                    return (
                      <Link
                        key={cat.slug}
                        href={cat.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-sp-sm text-xs font-medium transition-colors ${
                          isCurrent
                            ? "bg-sp-primary text-white font-semibold shadow-sp-soft"
                            : "bg-white hover:bg-sp-tint/40 text-sp-ink border border-sp-border"
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`tabular-nums ${
                              isCurrent ? "text-sp-sky" : "text-sp-primary"
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          {!isCurrent && <Icon className="w-4 h-4 shrink-0" />}
                          <span className="truncate">{cat.title}</span>
                        </span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isCurrent ? "text-white" : "text-sp-slate"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Filings Strip (Top Curated Services in Category) */}
      <section className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 pt-14">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <p className="text-xs font-semibold text-sp-primary mb-1 flex items-center gap-1.5">
              <span aria-hidden="true">+</span>
              <span>Core Practice Filings</span>
            </p>
            <h2 className="text-2xl font-display font-semibold text-sp-ink tracking-[-0.02em]">
              Most Requested in {category.title}
            </h2>
          </div>
          <span className="text-xs text-sp-slate tabular-nums">
            Top {Math.min(4, category.topServices.length)} Tracks
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 border-b border-sp-border">
          {category.topServices.slice(0, 4).map((topSrv, idx) => (
            <Link
              key={topSrv.slug}
              href={topSrv.href}
              className="group/top bg-white rounded-sp-md border border-sp-border-strong hover:border-sp-primary p-5 shadow-sp-soft hover:shadow-sp-lift hover:-translate-y-[2px] transition-all flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-display font-bold text-sp-primary tabular-nums">
                    0{idx + 1}
                  </span>
                  <CategoryIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-sp-ink group-hover/top:text-sp-primary transition-colors mb-1">
                  {topSrv.title}
                </h3>
              </div>
              <div className="pt-4 mt-3 border-t border-sp-border flex items-center justify-between text-xs font-semibold text-sp-primary">
                <span>Filing guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/top:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Complete Category Directory */}
      <section className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-sp-ink tracking-[-0.02em]">
              All {category.title} Solutions{" "}
              <span className="text-sp-primary tabular-nums">
                ({categoryServices.length})
              </span>
            </h2>
            <p className="text-sm text-sp-slate mt-1">
              Select a service below to review required documents, step-by-step filing procedures, and submit an enquiry.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryServices.map((service, idx) => {
            const tabularIdx = String(idx + 1).padStart(2, "0");
            return (
              <Card
                key={service.slug}
                className="p-6 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl font-display font-bold text-sp-primary/80 group-hover/card:text-sp-primary tabular-nums leading-none transition-colors">
                      {tabularIdx}
                    </span>
                    <div className="w-9 h-9 rounded-sp-sm bg-sp-bg border border-sp-border flex items-center justify-center shrink-0">
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-sp-ink group-hover/card:text-sp-primary transition-colors mb-2 leading-snug">
                    <Link href={`/service/${service.slug}`}>{service.title}</Link>
                  </h3>

                  <p className="text-sm text-sp-slate leading-relaxed line-clamp-2 mb-5">
                    {service.metaDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-sp-border flex items-center justify-between text-xs font-semibold">
                  <Link
                    href="/contact"
                    className="text-sp-slate hover:text-sp-primary transition-colors whitespace-nowrap"
                  >
                    Get a quote
                  </Link>
                  <Link
                    href={`/service/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sp-primary group-hover/card:translate-x-1 transition-transform whitespace-nowrap"
                  >
                    <span>View {service.title.split(":")[0].slice(0, 22)}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
