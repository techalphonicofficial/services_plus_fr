import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

const LATEST_POSTS = [
  {
    title: 'Trademark Registration: Protecting Your Brand',
    slug: 'trademark-registration-protecting-your-brand',
    href: '/blog-detail/trademark-registration-protecting-your-brand',
    summary:
      'Learn why safeguarding your trademark is essential for protecting your business reputation, avoiding brand copying, and securing exclusive intellectual property rights.',
    category: 'Trademark',
    date: '2026-02-15',
    image: '/assets/images/solution_17326727-baf8e9fd.png',
  },
  {
    title: 'Tax Information and Services: A Comprehensive Guide',
    slug: 'tax-information-and-services-a-comprehensive-guide',
    href: '/blog-detail/tax-information-and-services-a-comprehensive-guide',
    summary:
      'A thorough breakdown of direct and indirect taxes in India, key filing schedules, TDS obligations, and strategies for optimal corporate tax compliance.',
    category: 'Taxation',
    date: '2026-02-10',
    image: '/assets/images/bar-chart-c163e24a.png',
  },
  {
    title: 'Demystifying Income Tax Services: Your Comprehensive Guide',
    slug: 'demystifying-income-tax-services-your-comprehensive-guide',
    href: '/blog-detail/demystifying-income-tax-services-your-comprehensive-guide',
    summary:
      'Understanding income tax return categories (ITR-1 through ITR-7), addressing scrutiny notices, and maximizing lawful deductions under the Indian Income Tax Act.',
    category: 'Income Tax',
    date: '2026-02-05',
    image: '/assets/images/expertise_17378291-111a0903.png',
  },
];

export function LatestBlogs() {
  return (
    <section className="py-20 bg-white border-t border-sp-tint/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full mb-3">
              Knowledge Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-ink">
              Latest Insights &amp; Compliance Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sp-primary hover:underline mt-4 md:mt-0 font-mono"
          >
            <span>Explore all 90+ articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LATEST_POSTS.map(post => (
            <Card
              key={post.slug}
              className="flex flex-col justify-between overflow-hidden group bg-white border border-sp-tint"
            >
              <div>
                <div className="relative w-full h-48 bg-sp-bg overflow-hidden flex items-center justify-center p-6 border-b border-sp-tint/60">
                  <div className="relative w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="absolute top-4 left-4 text-[11px] font-mono font-bold bg-white/90 text-sp-primary px-2.5 py-1 rounded-md shadow-2xs border border-sp-tint">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-sp-slate mb-3 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      Services Plus Team
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-2 line-clamp-2">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-sp-slate leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={post.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
