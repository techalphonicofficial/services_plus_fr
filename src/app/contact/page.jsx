import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { StickyEnquiryCard } from '../../features/enquiry/components/StickyEnquiryCard';
import { MapPin, Phone, Mail, Clock, ChevronRight, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Services Plus',
  description:
    'Get in touch with Services Plus corporate legal and tax advisory desks in Noida and Delhi. Helplines: +91 88000 28794, +91 9899184918.',
  alternates: {
    canonical: 'https://www.servicesplus.in/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />
          <span className="text-sp-ink font-semibold">Contact Us</span>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-sp-tint/80 py-16 relative sp-plus-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full mb-4">
            We Are Here to Assist You
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-sp-ink tracking-tight mb-4">
            Connect with Our Legal &amp; Business Advisors
          </h1>
          <p className="text-base text-sp-slate max-w-2xl mx-auto leading-relaxed">
            Reach out by phone, email, WhatsApp, or schedule an in-person meeting at our Noida or Delhi offices.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Offices & Helplines */}
          <div className="lg:col-span-7 space-y-6">
            {/* Offices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sp-primary mb-3">
                  <MapPin className="w-4 h-4 text-sp-primary" />
                  <span>Head Office (Noida)</span>
                </div>
                <p className="text-xs sm:text-sm text-sp-slate leading-relaxed mb-4">
                  Office No-418, 4th Floor, Ocean Plaza, Sector-18, Noida, Gautam Buddha Nagar, Uttar Pradesh — 201301
                </p>
                <div className="text-xs font-mono text-sp-ink font-semibold">
                  Landmark: Near Sector 18 Metro Station
                </div>
              </Card>

              <Card className="p-6 bg-white">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sp-primary mb-3">
                  <MapPin className="w-4 h-4 text-sp-primary" />
                  <span>Corporate Desk (Delhi)</span>
                </div>
                <p className="text-xs sm:text-sm text-sp-slate leading-relaxed mb-4">
                  Services Plus Corporate Desk, Connaught Place / Barakhamba Road, New Delhi — 110001
                </p>
                <div className="text-xs font-mono text-sp-ink font-semibold">
                  By Prior Appointment Only
                </div>
              </Card>
            </div>

            {/* Helpline Numbers */}
            <Card className="p-6 sm:p-8 bg-white">
              <h2 className="text-lg font-bold text-sp-ink mb-4">Direct Helplines</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-sp-slate uppercase">Sales &amp; Consultations</p>
                  <a
                    href="tel:+918800028794"
                    className="text-base font-bold text-sp-primary hover:underline font-mono block"
                  >
                    (+91) 88000 28794
                  </a>
                  <p className="text-[11px] text-sp-slate">Available 9:30 AM – 7:00 PM</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-mono text-sp-slate uppercase">Support &amp; Status</p>
                  <a
                    href="tel:+919899184918"
                    className="text-base font-bold text-sp-primary hover:underline font-mono block"
                  >
                    (+91) 9899184918
                  </a>
                  <p className="text-[11px] text-sp-slate">Existing client queries</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-sp-tint/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-sp-slate">
                  <Mail className="w-4 h-4 text-sp-primary shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:info@servicesplus.in" className="text-sp-primary font-semibold hover:underline">
                      info@servicesplus.in
                    </a>{' '}
                    /{' '}
                    <a href="mailto:operations@servicesplus.in" className="text-sp-primary font-semibold hover:underline">
                      operations@servicesplus.in
                    </a>
                  </span>
                </div>

                <a
                  href="https://wa.me/918800028794"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </Card>
          </div>

          {/* Right 5 Columns: Enquiry Card */}
          <div className="lg:col-span-5">
            <StickyEnquiryCard serviceName="General Consultation" />
          </div>
        </div>
      </main>
    </div>
  );
}
