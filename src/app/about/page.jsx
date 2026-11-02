import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import {
  StartupDuotoneIcon,
  ComplianceDuotoneIcon
} from "../../components/ui/DuotoneIcons";
import { ChevronRight, MapPin } from "lucide-react";

export const metadata = {
  title: "About Us | Services Plus",
  description:
    "Services Plus has served for over thirteen years as a lighthouse for excellence and reliability in business process management, digital transformation, and technology services.",
  alternates: {
    canonical: "https://www.servicesplus.in/about"
  }
};

export default function AboutPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="w-full flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">About Us</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-sp-border py-12 lg:py-16 relative sp-plus-grid">
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
          <p className="text-xs font-semibold text-sp-primary mb-2.5 flex items-center gap-1.5">
            <span aria-hidden="true">+</span>
            <span>Since 2017 &middot; 13+ Years Domain Standing</span>
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-sp-ink tracking-[-0.02em] leading-[1.06] mb-5 max-w-[26ch]">
            Your Perfect Partner in Business Registration and Compliance Services in India
          </h1>
          <p className="text-base sm:text-[17px] text-sp-slate max-w-[65ch] leading-[1.6]">
            Services Plus has served for over thirteen years as a lighthouse for excellence and reliability in business process management, digital transformation, and technology services. More than a mere service provider, we pride ourselves on being your strategic partner to empower growth, adaptability, and long-lasting success in the quickly changing world of business.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 pt-14 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Card hoverLift={false} className="lg:col-span-7 p-8 sm:p-10 bg-white">
            <p className="text-xs font-semibold text-sp-primary mb-2 tabular-nums">
              01 &middot; Corporate Narrative
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-sp-ink mb-5">
              Our Mission &amp; Purpose
            </h2>
            <div className="space-y-4 text-base text-sp-slate leading-[1.6] max-w-[65ch]">
              <p>
                That was the mission with which we set up Services Plus: to empower organizations across diverse industry verticals in changing the game when it comes to operational effectiveness and innovation in technology through process redesign. In fact, we have grown in capacity as our clients&apos; requirements grow in enabling them to embrace market realities in the modern context with confidence.
              </p>
              <p>
                Going into business is a thrilling adventure, but it can also be exceptionally stressful. Simplifying to register a company at Services Plus meets all legal requirements without a player&apos;s fuss, and our experts lead you through the steps—from structure, right through to the preparation of documents. The paperwork is done while you concentrate on what you do best, which is growing your business.
              </p>
              <p>
                Understanding the Goods and Services Tax (GST) is daunting for most businesses. GST services are meant to help you understand regulations and comply with them without forgetting tax efficiency. We offer an end-to-end solution that has both GST registration and filing returns and deductions for efficient tax use.
              </p>
            </div>
          </Card>

          {/* Right 5 Cols: Office & Team Photo Slot + Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverLift={false} className="p-4 bg-white">
              <div className="relative w-full h-64 rounded-sp-sm overflow-hidden bg-sp-bg border border-sp-border">
                <Image
                  src="/assets/images/about-us_avif-8aa54286.png"
                  alt="Services Plus Office & Advisory Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-xs text-sp-slate">
                <span className="inline-flex items-center gap-1.5 font-medium text-sp-ink">
                  <MapPin className="w-3.5 h-3.5 text-sp-primary" />
                  Ocean Plaza, Sector-18, Noida
                </span>
                <span className="tabular-nums text-sp-primary font-semibold">
                  Head Office
                </span>
              </div>
            </Card>

            <Card hoverLift={false} className="p-6 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-display font-bold text-sp-primary tabular-nums">
                  02
                </span>
                <StartupDuotoneIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-sp-ink mb-2">
                Decade of Excellence
              </h3>
              <p className="text-sm text-sp-slate leading-relaxed">
                With more than 10 years of strong relationships in business process management, regulatory services, and digital transformation, we have consistently built alliances with myriads of clients.
              </p>
            </Card>

            <Card hoverLift={false} className="p-6 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-display font-bold text-sp-primary tabular-nums">
                  03
                </span>
                <ComplianceDuotoneIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-sp-ink mb-2">
                Client-First Methodology
              </h3>
              <p className="text-sm text-sp-slate leading-relaxed">
                For Services Plus, clarity and collaboration are critical. This philosophy led us to develop an integrated client-first approach acting as a troubleshooter from startup to annual compliance.
              </p>
            </Card>
          </div>
        </div>

        {/* Light Tinted Consultation Bar */}
        <Card hoverLift={false} variant="tint" className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-display font-semibold text-sp-ink">
              Connect with our Noida advisory desk
            </h2>
            <p className="text-sm text-sp-slate mt-1">
              Discuss company incorporation, trademark filing, or annual ROC compliance with our team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button href="/contact" size="md" showPlus>
              Contact Us
            </Button>
            <Button
              href="https://wa.me/918800028794"
              variant="outline"
              size="md"
              external
            >
              WhatsApp (+91 88000 28794)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
