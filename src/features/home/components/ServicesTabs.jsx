"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { NAV_CATEGORIES } from "../../../content/navigation";
import { Card } from "../../../components/ui/Card";
import {
  CATEGORY_DUOTONE_ICONS,
  StartupDuotoneIcon
} from "../../../components/ui/DuotoneIcons";

const SPRING_REVEAL = {
  type: "spring",
  stiffness: 120,
  damping: 20
};

function PracticeCard({
  category,
  idx,
  hoveredSlug,
  setHoveredSlug,
  flexValue
}) {
  const Icon = CATEGORY_DUOTONE_ICONS[category.slug] || StartupDuotoneIcon;
  const indexLabel = `0${idx + 1}`;
  const isHovered = hoveredSlug === category.slug;
  const isAnyOtherHovered = hoveredSlug !== null && !isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING_REVEAL, delay: idx * 0.05 }}
      onMouseEnter={() => setHoveredSlug(category.slug)}
      onFocus={() => setHoveredSlug(category.slug)}
      style={{ flex: flexValue }}
      className={`min-w-0 transition-[flex,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex,transform] ${
        isHovered
          ? "md:-translate-y-0.5 z-10"
          : isAnyOtherHovered
          ? "md:scale-[0.992] opacity-95"
          : "scale-100 opacity-100"
      }`}
    >
      <Card
        hoverLift={false}
        className={`h-full p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isHovered
            ? "border-sp-primary shadow-sp-lift bg-white"
            : isAnyOtherHovered
            ? "border-sp-border bg-white/90 shadow-none"
            : "border-sp-border bg-white shadow-sp-soft"
        }`}
      >
        <div>
          {/* Top row: Large Tabular Index (01-05) + Custom Duotone Icon */}
          <div className="flex items-start justify-between mb-6">
            <span
              aria-hidden="true"
              className={`text-3xl sm:text-4xl font-display font-bold tabular-nums leading-none transition-all duration-300 origin-left ${
                isHovered
                  ? "text-sp-navy scale-[1.03]"
                  : "text-[#64748B] group-hover/card:text-sp-primary"
              }`}
            >
              {indexLabel}
            </span>
            <div
              className={`w-11 h-11 rounded-sp-sm border flex items-center justify-center shrink-0 transition-all duration-300 ${
                isHovered
                  ? "bg-[#EAE0CF]/65 border-sp-primary/40 scale-105"
                  : "bg-sp-bg border-sp-border"
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
          </div>

          {/* Title + One line of text */}
          <h3
            className={`text-xl font-semibold transition-colors duration-300 mb-1.5 truncate ${
              isHovered ? "text-sp-primary" : "text-sp-ink"
            }`}
          >
            <Link href={category.href}>{category.title}</Link>
          </h3>
          <p className="text-sm text-sp-slate truncate mb-6">
            {category.description}
          </p>

          {/* 3 Service Links */}
          <ul className="divide-y divide-sp-border border-y border-sp-border">
            {category.topServices.slice(0, 3).map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.href}
                  className="group/link flex items-center justify-between py-2.5 text-sm font-medium text-sp-ink hover:text-sp-primary transition-colors"
                >
                  <span className="truncate pr-3">{service.title}</span>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                      isHovered
                        ? "text-sp-primary translate-x-0.5 group-hover/link:translate-x-1.5"
                        : "text-sp-slate group-hover/link:text-sp-primary group-hover/link:translate-x-1"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Footer */}
        <div className="pt-5 flex items-center justify-between gap-2 text-xs font-semibold">
          <Link
            href="/contact"
            className="text-sp-slate hover:text-sp-primary transition-colors whitespace-nowrap"
          >
            Get a quote
          </Link>
          <Link
            href={category.href}
            className="inline-flex items-center gap-1.5 text-sp-primary whitespace-nowrap truncate"
          >
            <span className="truncate">All {category.title}</span>
            <ArrowRight
              className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : "group-hover/card:translate-x-1"
              }`}
            />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

function ServicesTabs() {
  const [hoveredSlug, setHoveredSlug] = useState(null);

  const topRow = NAV_CATEGORIES.slice(0, 2);
  const bottomRow = NAV_CATEGORIES.slice(2, 5);

  const isTopRowHovered = topRow.some((c) => c.slug === hoveredSlug);
  const isBottomRowHovered = bottomRow.some((c) => c.slug === hoveredSlug);

  return (
    <section className="py-24 lg:py-32 bg-sp-bg relative">
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8">
        {/* Asymmetric Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-primary mb-3 flex items-center gap-1.5">
              <span className="text-sp-accent" aria-hidden="true">+</span>
              <span>Practice Areas &amp; Statutory Filings</span>
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-display font-semibold text-sp-ink tracking-[-0.02em] leading-[1.1] max-w-[22ch]">
              Comprehensive Legal and Business Support for Growing Enterprises
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-sp-slate leading-[1.6] max-w-[56ch]">
              The Services Plus company provides legal and compliance services for entrepreneurs and growing enterprises. One-stop solutions from setup to government registration.
            </p>
          </div>
        </div>

        {/* 5 Indexed Practice Cards (01-05) — Expand on hover & squeeze sibling cards */}
        <div
          className="flex flex-col gap-6"
          onMouseLeave={() => setHoveredSlug(null)}
        >
          {/* Row 1: 01 Startup & 02 Trademark */}
          <div className="flex flex-col md:flex-row gap-6">
            {topRow.map((category, idx) => {
              const flexValue = !isTopRowHovered
                ? "1 1 0%"
                : hoveredSlug === category.slug
                ? "1.12 1 0%"
                : "0.88 1 0%";

              return (
                <PracticeCard
                  key={category.slug}
                  category={category}
                  idx={idx}
                  hoveredSlug={hoveredSlug}
                  setHoveredSlug={setHoveredSlug}
                  flexValue={flexValue}
                />
              );
            })}
          </div>

          {/* Row 2: 03 Taxes, 04 Compliance, 05 Certification & Licensing */}
          <div className="flex flex-col md:flex-row gap-6">
            {bottomRow.map((category, idx) => {
              const flexValue = !isBottomRowHovered
                ? "1 1 0%"
                : hoveredSlug === category.slug
                ? "1.16 1 0%"
                : "0.92 1 0%";

              return (
                <PracticeCard
                  key={category.slug}
                  category={category}
                  idx={idx + 2}
                  hoveredSlug={hoveredSlug}
                  setHoveredSlug={setHoveredSlug}
                  flexValue={flexValue}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ServicesTabs };
