import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllServices,
  getServiceBySlug,
  getServicesByCategory,
} from '../../../content/services';
import { StickyEnquiryCard } from '../../../features/enquiry/components/StickyEnquiryCard';
import { ServiceAnchorTabs } from '../../../features/services/components/ServiceAnchorTabs';
import { ServiceFaqAccordion } from '../../../features/services/components/ServiceFaqAccordion';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import {
  ChevronRight,
  CheckCircle,
  FileText,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map(s => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Services Plus',
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: service.canonical,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: service.canonical,
      siteName: 'Services Plus',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getServicesByCategory(service.category)
    .filter(s => s.slug !== service.slug)
    .slice(0, 4);

  // Compute active anchor tabs
  const anchorTabs = [
    { id: 'overview', label: 'Overview' },
    ...(service.benefits.length > 0 ? [{ id: 'benefits', label: 'Benefits' }] : []),
    ...(service.documents.length > 0 ? [{ id: 'documents', label: 'Documents' }] : []),
    ...(service.process.length > 0 ? [{ id: 'process', label: 'Process' }] : []),
    ...(service.eligibility.length > 0 ? [{ id: 'eligibility', label: 'Eligibility' }] : []),
    ...(service.sections.length > 0 ? [{ id: 'details', label: 'Detailed Guide' }] : []),
    ...(service.faqs.length > 0 ? [{ id: 'faq', label: 'FAQs' }] : []),
  ];

  // Structured Data Schema: Service & BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.category,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Services Plus',
          telephone: '+91-8800028794',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Office No-418, 4th Floor, Ocean Plaza, Sector-18',
            addressLocality: 'Noida',
            addressRegion: 'Uttar Pradesh',
            postalCode: '201301',
            addressCountry: 'IN',
          },
        },
        url: service.canonical,
        description: service.metaDescription,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: service.breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.label,
          item: `https://www.servicesplus.in${b.href}`,
        })),
      },
    ],
  };

  return (
    <div className="bg-sp-bg min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-sp-tint/60 bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-sp-slate font-mono overflow-x-auto">
          {service.breadcrumbs.map((b, idx) => {
            const isLast = idx === service.breadcrumbs.length - 1;
            return (
              <React.Fragment key={b.href}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-sp-tint shrink-0" />}
                {isLast ? (
                  <span className="text-sp-ink font-semibold truncate">{b.label}</span>
                ) : (
                  <Link href={b.href} className="hover:text-sp-primary truncate">
                    {b.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-sp-tint/80 py-12 md:py-16 relative sp-plus-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: H1, Highlights & Fast Trust Strip */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-bold uppercase tracking-wider">
                <span>{service.category.replace('-', ' ')}</span>
                <span>•</span>
                <span>Govt. Verified</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-sp-ink tracking-tight leading-tight">
                {service.h1}
              </h1>

              <p className="text-sm sm:text-base text-sp-slate leading-relaxed pt-2">
                {service.metaDescription}
              </p>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sp-bg border border-sp-tint/70">
                  <Clock className="w-4 h-4 text-sp-primary shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-sp-ink">Fast Turnaround</p>
                    <p className="text-sp-slate text-[11px]">3-7 Business Days</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sp-bg border border-sp-tint/70">
                  <FileText className="w-4 h-4 text-sp-primary shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-sp-ink">100% Online</p>
                    <p className="text-sp-slate text-[11px]">Zero Paperwork</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sp-bg border border-sp-tint/70 col-span-2 sm:col-span-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-sp-ink">CA/CS Verified</p>
                    <p className="text-sp-slate text-[11px]">Direct Government Filing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Top summary / Mobile CTA */}
            <div className="lg:col-span-4 lg:hidden">
              <StickyEnquiryCard serviceName={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Anchor Tab Bar */}
      <ServiceAnchorTabs tabs={anchorTabs} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Body Content & Sections */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section id="overview" className="scroll-mt-36">
              <Card className="p-6 sm:p-8 bg-white">
                <h2 className="text-xl sm:text-2xl font-bold text-sp-ink mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sp-primary" />
                  Service Overview
                </h2>
                <div className="text-sm text-sp-slate leading-relaxed space-y-3">
                  <p>{service.overview || service.metaDescription}</p>
                </div>
              </Card>
            </section>

            {/* Benefits */}
            {service.benefits.length > 0 && (
              <section id="benefits" className="scroll-mt-36">
                <Card className="p-6 sm:p-8 bg-white">
                  <h2 className="text-xl sm:text-2xl font-bold text-sp-ink mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sp-primary" />
                    Key Benefits of {service.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {service.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sp-bg border border-sp-tint/60 text-xs sm:text-sm text-sp-ink"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            )}

            {/* Documents Required */}
            {service.documents.length > 0 && (
              <section id="documents" className="scroll-mt-36">
                <Card className="p-6 sm:p-8 bg-white">
                  <h2 className="text-xl sm:text-2xl font-bold text-sp-ink mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sp-primary" />
                    Documents Checklist
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {service.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sp-bg border border-sp-tint/60 text-xs sm:text-sm text-sp-ink"
                      >
                        <FileText className="w-4 h-4 text-sp-primary shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            )}

            {/* Process Steps */}
            {service.process.length > 0 && (
              <section id="process" className="scroll-mt-36">
                <Card className="p-6 sm:p-8 bg-white">
                  <h2 className="text-xl sm:text-2xl font-bold text-sp-ink mb-6 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sp-primary" />
                    Step-by-Step Filing Procedure
                  </h2>
                  <div className="space-y-4">
                    {service.process.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <span className="w-8 h-8 rounded-xl bg-sp-tint text-sp-primary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1 pt-1 text-xs sm:text-sm text-sp-slate leading-relaxed">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            )}

            {/* Eligibility */}
            {service.eligibility.length > 0 && (
              <section id="eligibility" className="scroll-mt-36">
                <Card className="p-6 sm:p-8 bg-white">
                  <h2 className="text-xl sm:text-2xl font-bold text-sp-ink mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sp-primary" />
                    Eligibility Criteria
                  </h2>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-sp-slate">
                    {service.eligibility.map((el, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-sp-primary font-mono font-bold text-sm">+</span>
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            )}

            {/* Detailed Body Sections (Render ALL content from inventory) */}
            {service.sections.length > 0 && (
              <section id="details" className="scroll-mt-36 space-y-6">
                {service.sections.map((sec, idx) => (
                  <Card key={idx} className="p-6 sm:p-8 bg-white">
                    <h3 className="text-lg sm:text-xl font-bold text-sp-ink mb-3">
                      {sec.heading}
                    </h3>
                    <div className="space-y-3 text-xs sm:text-sm text-sp-slate leading-relaxed">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </Card>
                ))}
              </section>
            )}

            {/* FAQ Accordion */}
            <ServiceFaqAccordion faqs={service.faqs} serviceTitle={service.title} />

            {/* Related Services in the Same Category */}
            {relatedServices.length > 0 && (
              <div className="pt-8 border-t border-sp-tint/80">
                <h3 className="text-xl font-bold text-sp-ink mb-4">
                  Related Services in {service.category.replace('-', ' ')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedServices.map(rel => (
                    <Card
                      key={rel.slug}
                      className="p-5 flex flex-col justify-between group bg-white"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-1.5">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-sp-slate line-clamp-2 leading-relaxed mb-4">
                          {rel.metaDescription}
                        </p>
                      </div>
                      <Link
                        href={`/service/${rel.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary group-hover:translate-x-1 transition-transform"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Columns: Sticky Enquiry Form Card (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <StickyEnquiryCard serviceName={service.title} />

            {/* Direct Helpline Card */}
            <div className="bg-sp-navy text-white rounded-2xl p-5 border border-sp-sky/20">
              <p className="text-xs font-mono text-sp-sky uppercase tracking-wider mb-2 font-semibold">
                Need Immediate Help?
              </p>
              <p className="text-xs text-sp-sky/90 leading-relaxed mb-4">
                Our senior legal advisors are available Monday to Saturday (9:30 AM – 7:00 PM IST).
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+918800028794"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sp-accent" />
                  <span>Call (+91) 88000 28794</span>
                </a>
                <a
                  href={`https://wa.me/918800028794?text=${encodeURIComponent(
                    `Hi ServicesPlus, I am looking for information on ${service.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Live Advisory</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
