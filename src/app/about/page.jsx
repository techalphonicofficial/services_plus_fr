import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Shield, CheckCircle2, ChevronRight, Award, Users, Clock } from 'lucide-react';

export const metadata = {
  title: 'About Us | Services Plus',
  description:
    'Services Plus has served for over thirteen years as a lighthouse for excellence and reliability in business process management, digital transformation, and technology services.',
  alternates: {
    canonical: 'https://www.servicesplus.in/about',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />
          <span className="text-sp-ink font-semibold">About Us</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-sp-tint/80 py-16 relative sp-plus-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Since 2017 &bull; Trusted Corporate Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-sp-ink tracking-tight mb-6">
            Your Perfect Partner in Business Registration and Compliance Services in India
          </h1>
          <p className="text-base sm:text-lg text-sp-slate max-w-3xl mx-auto leading-relaxed">
            Services Plus has served for over thirteen years as a lighthouse for excellence and reliability in business process management, digital transformation, and technology services. More than a mere service provider, we pride ourselves on being your strategic partner to empower growth, adaptability, and long-lasting success in the quickly changing world of business.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12">
        <Card className="p-8 sm:p-12 bg-white">
          <h2 className="text-2xl font-bold text-sp-ink mb-4">Our Mission &amp; Purpose</h2>
          <div className="space-y-4 text-sm sm:text-base text-sp-slate leading-relaxed">
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

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-sp-tint text-sp-primary flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-sp-ink mb-2">Decade of Excellence</h3>
            <p className="text-xs sm:text-sm text-sp-slate leading-relaxed">
              With more than 10 years of strong relationships in business process management, regulatory services, and digital transformation, we have consistently built alliances with myriads of clients.
            </p>
          </Card>

          <Card className="p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-sp-tint text-sp-primary flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-sp-ink mb-2">Client-First Methodology</h3>
            <p className="text-xs sm:text-sm text-sp-slate leading-relaxed">
              For Services Plus, clarity and collaboration are absolutely critical. This philosophy led us to develop an integrated and tightly packaged client-first approach acting as a troubleshooter from startup to annual compliance.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-sp-navy text-white text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to empower your business?</h2>
          <p className="text-xs sm:text-sm text-sp-sky max-w-lg mx-auto">
            Connect with our corporate advisory desk for free initial structure consulting.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button href="/contact" size="md" showPlus className="bg-white text-sp-navy hover:bg-sp-bg">
              Contact Us Today
            </Button>
            <Button
              href="https://wa.me/918800028794"
              variant="outline"
              size="md"
              external
              className="border-sp-sky/40 text-white bg-transparent hover:bg-white/10"
            >
              WhatsApp (+91 88000 28794)
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
