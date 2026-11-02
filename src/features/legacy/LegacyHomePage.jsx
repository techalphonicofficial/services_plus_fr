import { Hero } from "../../features/home/components/Hero";
import { AboutSection } from "../../features/home/components/AboutSection";
import { ProcessSection } from "../../features/home/components/ProcessSection";
import { WhyUsSection } from "../../features/home/components/WhyUsSection";
import { CtaBand } from "../../features/home/components/CtaBand";
import { FaqSection } from "../../features/home/components/FaqSection";
import { LatestBlogs } from "../../features/home/components/LatestBlogs";
export const metadata = {
  title: "Servicesplus - Company registration, GST, Trademark filing, Tax Services",
  description: "One Stop Platform for company registration, trademark filing, GST registration, TDS filing, Payroll, MSME registration and income tax filing in India.",
  alternates: {
    canonical: "https://www.servicesplus.in"
  },
  openGraph: {
    title: "Servicesplus - Company registration, GST, Trademark filing, Tax Services",
    description: "One Stop Platform for company registration, trademark filing, GST registration, TDS filing, Payroll, MSME registration and income tax filing in India.",
    url: "https://www.servicesplus.in",
    siteName: "Services Plus",
    type: "website"
  }
};
export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Services Plus",
    url: "https://www.servicesplus.in",
    logo: "https://www.servicesplus.in/assets/images/logo-h-390c5c1a.png",
    telephone: "+91-8800028794",
    email: "info@servicesplus.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No-418, 4th Floor, Ocean Plaza, Sector-18",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "42800"
    },
    priceRange: "\u20B9\u20B9"
  };
  return <>
      {
    /* Inject Structured Data Schema */
  }
      <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
  />

      {
    /* 1. Hero & Radial Category Explorer */
  }
      <Hero />

      {
    /* 2. About & Statistics Counters */
  }
      <AboutSection />

      {
    /* 3. Process (4 Steps Agile Roadmap) */
  }
      <ProcessSection />

      {
    /* 4. Latest Insights & Compliance Guides (Blogs) */
  }
      <LatestBlogs />

      {
    /* 5. Why Services Plus (Stacked Card Deck) */
  }
      <WhyUsSection />

      {
    /* 6. Dark Navy CTA Band */
  }
      <CtaBand />

      {
    /* 7. FAQ Accordion & FAQPage Schema */
  }
      <FaqSection />
    </>;
}
