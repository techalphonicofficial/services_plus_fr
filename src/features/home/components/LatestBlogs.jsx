import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import {
  TrademarkDuotoneIcon,
  TaxesDuotoneIcon,
  ComplianceDuotoneIcon
} from "../../../components/ui/DuotoneIcons";

const LATEST_POSTS = [
  {
    index: "01",
    title: "Trademark Registration: Protecting Your Brand",
    slug: "trademark-registration-protecting-your-brand",
    href: "/blog-detail/trademark-registration-protecting-your-brand",
    summary:
      "Learn why safeguarding your trademark is essential for protecting your business reputation, avoiding brand copying, and securing exclusive intellectual property rights.",
    category: "Trademark",
    date: "2026-02-15",
    icon: TrademarkDuotoneIcon
  },
  {
    index: "02",
    title: "Tax Information and Services: A Comprehensive Guide",
    slug: "tax-information-and-services-a-comprehensive-guide",
    href: "/blog-detail/tax-information-and-services-a-comprehensive-guide",
    summary:
      "A thorough breakdown of direct and indirect taxes in India, key filing schedules, TDS obligations, and strategies for optimal corporate tax compliance.",
    category: "Taxation",
    date: "2026-02-10",
    icon: TaxesDuotoneIcon
  },
  {
    index: "03",
    title: "Demystifying Income Tax Services: Your Comprehensive Guide",
    slug: "demystifying-income-tax-services-your-comprehensive-guide",
    href: "/blog-detail/demystifying-income-tax-services-your-comprehensive-guide",
    summary:
      "Understanding income tax return categories (ITR-1 through ITR-7), addressing scrutiny notices, and maximizing lawful deductions under the Indian Income Tax Act.",
    category: "Income Tax",
    date: "2026-02-05",
    icon: ComplianceDuotoneIcon
  }
];

function LatestBlogs() {
  const [featured, ...secondary] = LATEST_POSTS;
  const FeaturedIcon = featured.icon;

  return (
    <section className="py-24 lg:py-32 bg-white border-t border-sp-border">
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-primary mb-2.5 flex items-center justify-center md:justify-start gap-1.5">
              <span className="text-sp-accent" aria-hidden="true">+</span>
              <span>Regulatory Research &amp; Guides</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-sp-ink tracking-[-0.02em]">
              Latest Insights &amp; Compliance Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sp-primary hover:underline whitespace-nowrap"
          >
            <span>Explore all 90+ articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric Editorial Layout: 1 Featured Lead (Left 6 Cols) + 2 Stacked Briefings (Right 6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 6 Cols: Featured Article */}
          <Card className="lg:col-span-6 p-7 sm:p-9 flex flex-col justify-between bg-sp-bg/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="text-2xl font-display font-bold text-[#64748B] tabular-nums">
                    {featured.index}
                  </span>
                  <span className="text-xs font-semibold text-sp-ink bg-white px-2.5 py-0.5 rounded-sp-sm border border-sp-border">
                    {featured.category}
                  </span>
                </div>
                <div className="w-11 h-11 rounded-sp-sm bg-white border border-sp-border flex items-center justify-center">
                  <FeaturedIcon className="w-6 h-6" />
                </div>
              </div>

              <p className="text-xs text-sp-slate tabular-nums mb-2">
                Published {featured.date} &middot; Services Plus Editorial
              </p>

              <h3 className="text-2xl font-semibold text-sp-ink group-hover/card:text-sp-primary transition-colors mb-3 leading-snug">
                <Link href={featured.href}>{featured.title}</Link>
              </h3>

              <p className="text-base text-sp-slate leading-[1.6] max-w-[58ch] mb-6">
                {featured.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-sp-border flex items-center justify-between">
              <span className="text-xs text-sp-slate font-medium">
                Intellectual Property Act, 1999
              </span>
              <Link
                href={featured.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sp-primary group-hover/card:translate-x-1 transition-transform whitespace-nowrap"
              >
                <span>Read briefing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>

          {/* Right 6 Cols: 2 Stacked Briefings */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {secondary.map((post) => {
              const Icon = post.icon;
              return (
                <Card
                  key={post.slug}
                  className="flex-1 p-6 sm:p-7 flex flex-col justify-between bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span aria-hidden="true" className="text-xl font-display font-bold text-[#64748B] tabular-nums">
                          {post.index}
                        </span>
                        <span className="text-xs font-semibold text-sp-ink bg-sp-bg px-2.5 py-0.5 rounded-sp-sm border border-sp-border">
                          {post.category}
                        </span>
                        <span className="text-xs text-sp-slate tabular-nums">
                          {post.date}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-sp-sm bg-sp-bg border border-sp-border flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-sp-ink group-hover/card:text-sp-primary transition-colors mb-2 leading-snug">
                      <Link href={post.href}>{post.title}</Link>
                    </h3>

                    <p className="text-sm text-sp-slate leading-relaxed line-clamp-2 mb-4 max-w-[60ch]">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-sp-border flex items-center justify-between">
                    <span className="text-xs text-sp-slate">Compliance Guide</span>
                    <Link
                      href={post.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary group-hover/card:translate-x-1 transition-transform whitespace-nowrap"
                    >
                      <span>Read briefing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { LatestBlogs };
