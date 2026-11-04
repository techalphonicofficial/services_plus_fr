import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllServices,
  getServiceBySlug,
  getServicesByCategory
} from "../../content/services";
import { StickyEnquiryCard } from "../../features/enquiry/components/StickyEnquiryCard";
import { ServiceAnchorTabs } from "../../features/services/components/ServiceAnchorTabs";
import { ServiceFaqAccordion } from "../../features/services/components/ServiceFaqAccordion";
import { Card } from "../../components/ui/Card";
import {
  CATEGORY_DUOTONE_ICONS,
  StartupDuotoneIcon,
  DocumentationDuotoneIcon,
  FilingDuotoneIcon,
  TimelineDuotoneIcon
} from "../../components/ui/DuotoneIcons";
import {
  ChevronRight,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowRight
} from "lucide-react";

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((s) => ({
    slug: s.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: "Service Not Found | Services Plus"
    };
  }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: service.canonical
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: service.canonical,
      siteName: "Services Plus",
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const relatedServices = getServicesByCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  const CategoryIcon =
    CATEGORY_DUOTONE_ICONS[service.category] || StartupDuotoneIcon;

  const anchorTabs = [
    { id: "overview", label: "Overview" },
    ...(service.benefits.length > 0 ? [{ id: "benefits", label: "Benefits" }] : []),
    ...(service.documents.length > 0
      ? [{ id: "documents", label: "Documents" }]
      : []),
    ...(service.process.length > 0 ? [{ id: "process", label: "Process" }] : []),
    ...(service.eligibility.length > 0
      ? [{ id: "eligibility", label: "Eligibility" }]
      : []),
    ...(service.sections.length > 0
      ? [{ id: "details", label: "Detailed Guide" }]
      : []),
    ...(service.faqs.length > 0 ? [{ id: "faq", label: "FAQs" }] : [])
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.category,
        provider: {
          "@type": "LocalBusiness",
          name: "Services Plus",
          telephone: "+91-8800028794",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Office No-418, 4th Floor, Ocean Plaza, Sector-18",
            addressLocality: "Noida",
            addressRegion: "Uttar Pradesh",
            postalCode: "201301",
            addressCountry: "IN"
          }
        },
        url: service.canonical,
        description: service.metaDescription
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: service.breadcrumbs.map((b, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: b.label,
          item: `https://www.servicesplus.in${b.href}`
        }))
      }
    ]
  };

  return (
    <div className="bg-sp-bg min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="w-full flex items-center gap-1.5 text-xs text-sp-slate overflow-x-auto no-scrollbar">
          {service.breadcrumbs.map((b, idx) => {
            const isLast = idx === service.breadcrumbs.length - 1;
            return (
              <React.Fragment key={b.href}>
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
                )}
                {isLast ? (
                  <span className="text-sp-ink font-semibold truncate max-w-[200px] sm:max-w-none">
                    {b.label}
                  </span>
                ) : (
                  <Link
                    href={b.href}
                    className="hover:text-sp-primary shrink-0 whitespace-nowrap transition-colors"
                  >
                    {b.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-sp-border py-12 lg:py-16 relative sp-plus-grid">
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Plain-Text Eyebrow, Display H1, Meta Description & Highlights */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-sp-primary capitalize">
                <span aria-hidden="true">+</span>
                <span>{service.category.replace("-", " & ")} Practice</span>
                <span className="text-sp-slate font-normal">&middot;</span>
                <span className="text-sp-slate font-medium">
                  Online Statutory Filing
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold text-sp-ink tracking-[-0.02em] leading-[1.06]">
                {service.h1}
              </h1>

              <p className="text-base sm:text-[17px] text-sp-slate leading-[1.6] max-w-[65ch]">
                {service.metaDescription}
              </p>

              {/* 3 Key Process Specs with Custom Duotone Icons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="flex items-center gap-3 p-3.5 rounded-sp-sm bg-sp-bg border border-sp-border">
                  <TimelineDuotoneIcon className="w-5 h-5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-sp-ink">Structured Timeline</p>
                    <p className="text-sp-slate">Prompt Portal Submission</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-sp-sm bg-sp-bg border border-sp-border">
                  <DocumentationDuotoneIcon className="w-5 h-5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-sp-ink">Digital Dossier</p>
                    <p className="text-sp-slate">100% Online Documentation</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-sp-sm bg-sp-bg border border-sp-border">
                  <FilingDuotoneIcon className="w-5 h-5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-sp-ink">Expert Review</p>
                    <p className="text-sp-slate">CA / CS / Legal Verification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Enquiry Form */}
            <div className="lg:col-span-4 lg:hidden">
              <StickyEnquiryCard serviceName={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Anchor Tab Bar with Scroll Progress */}
      <ServiceAnchorTabs tabs={anchorTabs} />

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Body Content & Sections */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <section id="overview" className="scroll-mt-36">
              <Card hoverLift={false} className="p-6 sm:p-8 bg-white">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-sm font-display font-bold text-sp-primary tabular-nums">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-semibold text-sp-ink">
                    Service Overview
                  </h2>
                </div>
                <div className="text-base text-sp-slate leading-[1.6] space-y-3 max-w-[65ch]">
                  <p>{service.overview || service.metaDescription}</p>
                </div>
                {service.pricing?.note && (
                  <div className="mt-5 pt-4 border-t border-sp-border flex flex-wrap items-center justify-between gap-2 text-xs text-sp-slate">
                    <span>{service.pricing.note}</span>
                    {service.pricing.price && (
                      <span className="font-semibold text-sp-primary tabular-nums">
                        {service.pricing.price}
                      </span>
                    )}
                  </div>
                )}
              </Card>
            </section>

            {/* Benefits */}
            {service.benefits.length > 0 && (
              <section id="benefits" className="scroll-mt-36">
                <Card hoverLift={false} className="p-6 sm:p-8 bg-white">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="text-sm font-display font-bold text-sp-primary tabular-nums">
                      02
                    </span>
                    <h2 className="text-xl sm:text-2xl font-display font-semibold text-sp-ink">
                      Key Benefits of {service.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-sp-sm bg-sp-bg border border-sp-border text-sm text-sp-ink"
                      >
                        <CheckCircle className="w-4 h-4 text-sp-primary shrink-0 mt-0.5" />
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
                <Card hoverLift={false} className="p-6 sm:p-8 bg-white">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="text-sm font-display font-bold text-sp-primary tabular-nums">
                      03
                    </span>
                    <h2 className="text-xl sm:text-2xl font-display font-semibold text-sp-ink">
                      Documents Checklist
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-sp-sm bg-sp-bg border border-sp-border text-sm text-sp-ink"
                      >
                        <span className="text-xs font-semibold text-sp-primary tabular-nums mt-0.5">
                          0{idx + 1}
                        </span>
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
                <Card hoverLift={false} className="p-6 sm:p-8 bg-white">
                  <div className="flex items-center gap-2.5 mb-6">
                    <span className="text-sm font-display font-bold text-sp-primary tabular-nums">
                      04
                    </span>
                    <h2 className="text-xl sm:text-2xl font-display font-semibold text-sp-ink">
                      Step-by-Step Filing Procedure
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {service.process.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <span className="w-8 h-8 rounded-sp-sm bg-sp-tint/70 text-sp-primary font-semibold tabular-nums text-xs flex items-center justify-center shrink-0">
                          0{idx + 1}
                        </span>
                        <div className="flex-1 pt-1 text-base text-sp-slate leading-[1.6] max-w-[65ch]">
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
                <Card hoverLift={false} className="p-6 sm:p-8 bg-white">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-sm font-display font-bold text-sp-primary tabular-nums">
                      05
                    </span>
                    <h2 className="text-xl sm:text-2xl font-display font-semibold text-sp-ink">
                      Eligibility Criteria
                    </h2>
                  </div>
                  <ul className="space-y-2.5 text-base text-sp-slate">
                    {service.eligibility.map((el, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-sp-primary font-semibold text-sm">
                          +
                        </span>
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
                {service.sections.map((sec, idx) => {
                  const tabularSec = String(idx + 1).padStart(2, "0");
                  return (
                    <Card
                      key={idx}
                      hoverLift={false}
                      className="p-6 sm:p-8 bg-white"
                    >
                      <div className="flex items-baseline gap-2.5 mb-3">
                        <span className="text-xs font-semibold text-sp-primary tabular-nums shrink-0">
                          {tabularSec}
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-sp-ink">
                          {sec.heading}
                        </h3>
                      </div>
                      <div className="space-y-3 text-base text-sp-slate leading-[1.6] max-w-[65ch]">
                        {sec.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </section>
            )}

            {/* FAQ Accordion */}
            <ServiceFaqAccordion
              faqs={service.faqs}
              serviceTitle={service.title}
            />

            {/* Related Services in the Same Category */}
            {relatedServices.length > 0 && (
              <div className="pt-8 border-t border-sp-border">
                <h2 className="text-2xl font-display font-semibold text-sp-ink mb-5">
                  Related Services in {service.category.replace("-", " & ")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedServices.map((rel, rIdx) => (
                    <Card
                      key={rel.slug}
                      className="p-5 flex flex-col justify-between bg-white"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-display font-bold text-sp-primary tabular-nums">
                            0{rIdx + 1}
                          </span>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-semibold text-sp-ink group-hover/card:text-sp-primary transition-colors mb-1.5">
                          <Link href={`/service/${rel.slug}`}>{rel.title}</Link>
                        </h3>
                        <p className="text-xs text-sp-slate line-clamp-2 leading-relaxed mb-4">
                          {rel.metaDescription}
                        </p>
                      </div>
                      <Link
                        href={`/service/${rel.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary group-hover/card:translate-x-1 transition-transform"
                      >
                        <span>View {rel.title.split(":")[0].slice(0, 24)}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Columns: Sticky Enquiry Form Card (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-5">
            <StickyEnquiryCard serviceName={service.title} />

            {/* Direct Helpline Card (Light Tinted Surface so Footer remains the single dark navy section) */}
            <Card hoverLift={false} variant="tint" className="p-5">
              <p className="text-xs font-semibold text-sp-primary mb-1.5 flex items-center gap-1">
                <span aria-hidden="true">+</span>
                <span>Direct Advisory Helpline</span>
              </p>
              <p className="text-xs text-sp-slate leading-relaxed mb-4">
                Speak with our Noida desk Monday to Saturday (9:30 AM – 7:00 PM IST).
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+918800028794"
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-sp-btn bg-white hover:bg-sp-bg border border-sp-border-strong text-sp-ink text-xs font-semibold tabular-nums transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-sp-primary" />
                  <span>Call (+91) 88000 28794</span>
                </a>
                <a
                  href={`https://wa.me/918800028794?text=${encodeURIComponent(
                    `Hi ServicesPlus, I am looking for information on ${service.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-sp-btn bg-sp-primary hover:bg-sp-primary-600 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Live Advisory</span>
                </a>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
