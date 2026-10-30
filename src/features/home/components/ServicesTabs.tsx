'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { NAV_CATEGORIES } from '../../../content/navigation';
import { Card } from '../../../components/ui/Card';

export function ServicesTabs() {
  const [activeTab, setActiveTab] = useState(NAV_CATEGORIES[0]?.slug || 'startup');

  const selectedCategory =
    NAV_CATEGORIES.find(c => c.slug === activeTab) || NAV_CATEGORIES[0];

  return (
    <section className="py-20 bg-sp-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full mb-3">
            Service Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-4">
            Comprehensive Legal and Business Support for Growing Enterprises
          </h2>
          <p className="text-sm sm:text-base text-sp-slate leading-relaxed">
            The Services Plus company provides legal and compliance services for entrepreneurs and growing enterprises. One-stop solutions from setup to government registration.
          </p>
        </div>

        {/* Sliding Tabs Bar */}
        <div className="flex items-center justify-center border-b border-sp-tint mb-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 p-1">
            {NAV_CATEGORIES.map(category => {
              const isActive = category.slug === activeTab;
              return (
                <button
                  key={category.slug}
                  onClick={() => setActiveTab(category.slug)}
                  className={`relative px-5 py-3 text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-sp-primary bg-white border-t-2 border-sp-primary shadow-2xs'
                      : 'text-sp-slate hover:text-sp-ink hover:bg-white/50'
                  }`}
                >
                  <span>{category.title}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sp-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory?.topServices.map(service => (
            <Card
              key={service.slug}
              className="p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-sp-tint text-sp-primary flex items-center justify-center font-mono font-bold text-sm">
                    +
                  </span>
                  {service.isPopular && (
                    <span className="text-[11px] font-mono font-semibold bg-sp-tint text-sp-primary px-2.5 py-0.5 rounded-full">
                      Most Requested
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-sp-slate leading-relaxed mb-4">
                  End-to-end documentation, government filing, and expert compliance assistance by verified legal professionals.
                </p>
                <div className="flex items-center gap-2 text-xs text-sp-slate mb-6">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Online &amp; Paperless Process</span>
                </div>
              </div>

              <div className="pt-4 border-t border-sp-tint/80 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sp-primary">
                  Get a quote
                </span>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href={selectedCategory?.href || '/'}
            className="inline-flex items-center gap-2 text-sm font-semibold text-sp-primary hover:underline font-mono"
          >
            <span>Explore all {selectedCategory?.title} solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
