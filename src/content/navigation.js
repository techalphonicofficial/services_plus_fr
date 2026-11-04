const NAV_CATEGORIES = [
  {
    title: "Startup",
    slug: "startup",
    href: "/service-by-categories/startup",
    description: "Incorporate your business in India or globally with end-to-end legal support.",
    topServices: [
      { title: "Private Limited Company", slug: "private-limited-company", href: "/service/private-limited-company", isPopular: true },
      { title: "Limited Liability Partnership", slug: "limited-liability-partnership", href: "/service/limited-liability-partnership" },
      { title: "One Person Company", slug: "one-person-company", href: "/service/one-person-company" },
      { title: "Startup India Registration", slug: "startup-india-registration", href: "/service/startup-india-registration", isPopular: true },
      { title: "UDYAM / MSME Registration", slug: "udyam-registration", href: "/service/udyam-registration" },
      { title: "Proprietorship Registration", slug: "proprietorship-registration", href: "/service/proprietorship-registration" },
      { title: "Partnership Registration", slug: "partnership", href: "/service/partnership" },
      { title: "Indian Subsidiary", slug: "indian-subsidiary", href: "/service/indian-subsidiary" },
      { title: "Section 8 NGO Company", slug: "section-8-company", href: "/service/section-8-company" },
      { title: "USA Company Registration", slug: "usa-company-registration", href: "/service/usa-company-registration" },
      { title: "Nidhi Company Registration", slug: "nidhi-company", href: "/service/nidhi-company" },
      { title: "Company Incorporation", slug: "company-incorporation", href: "/service/company-incorporation" },
      { title: "Digital Signature (DSC)", slug: "digital-signature", href: "/service/digital-signature" },
      { title: "Import Export Code (IEC)", slug: "import-export-code", href: "/service/import-export-code" },
      { title: "Professional Tax Registration", slug: "professional-tax", href: "/service/professional-tax" },
      { title: "CPWD Contractor Registration", slug: "cpwd-contractor-registration", href: "/service/cpwd-contractor-registration" }
    ]
  },
  {
    title: "Trademark",
    slug: "trademark",
    href: "/service-by-categories/trademark",
    description: "Safeguard your brand name, logo, slogan, and intellectual property.",
    topServices: [
      { title: "Trademark Registration", slug: "trademark-registration", href: "/service/trademark-registration", isPopular: true },
      { title: "Trademark Objection Reply", slug: "trademark-objection", href: "/service/trademark-objection", isPopular: true },
      { title: "Trademark Opposition", slug: "trademark-opposition", href: "/service/trademark-opposition" },
      { title: "Trademark Renewal", slug: "trademark-renewal", href: "/service/trademark-renewal" },
      { title: "Copyright Registration", slug: "copyright-registration", href: "/service/copyright-registration" },
      { title: "USA Trademark Filing", slug: "usa-trademark", href: "/service/usa-trademark" },
      { title: "UAE Trademark Registration", slug: "uae-trademark", href: "/service/uae-trademark" },
      { title: "Patent Registration", slug: "patent-registration", href: "/service/patent-registration" },
      { title: "Provisional Patent Filing", slug: "provisional-patent", href: "/service/provisional-patent" },
      { title: "Design Registration", slug: "design-registration", href: "/service/design-registration" }
    ]
  },
  {
    title: "Taxes",
    slug: "taxes",
    href: "/service-by-categories/taxes",
    description: "Streamlined GST filing, corporate income tax, and regulatory tax compliance.",
    topServices: [
      { title: "GST Registration", slug: "gst-registration", href: "/service/gst-registration", isPopular: true },
      { title: "GST Return Filing", slug: "gst-return-filing", href: "/service/gst-return-filing", isPopular: true },
      { title: "Business Tax Return Filing", slug: "business-tax-return-filing", href: "/service/business-tax-return-filing" },
      { title: "TDS Return Filing", slug: "tds-return-filing", href: "/service/tds-return-filing" },
      { title: "ITR-3 Return Filing", slug: "itr-3-return-filing", href: "/service/itr-3-return-filing" },
      { title: "ITR-4 Sugam Filing", slug: "itr-4-return-filing", href: "/service/itr-4-return-filing" },
      { title: "ITR-5 Return Filing", slug: "itr-5-return-filing", href: "/service/itr-5-return-filing" },
      { title: "Income Tax Notice Response", slug: "income-tax-notice-response", href: "/service/income-tax-notice-response", isPopular: true },
      { title: "GST LUT Export Forms", slug: "gst-lut-forms", href: "/service/gst-lut-forms" },
      { title: "GST Registration Cancellation", slug: "gst-registration-cancellation", href: "/service/gst-registration-cancellation" },
      { title: "Personal Tax Return Filing", slug: "personal-tax-return-filing", href: "/service/personal-tax-return-filing" },
      { title: "GST Annual Return Filing", slug: "gst-annual-return-filing", href: "/service/gst-annual-return-filing" },
      { title: "E-Way Bill Registration", slug: "e-way-bill", href: "/service/e-way-bill" },
      { title: "Input Tax Credit (ITC)", slug: "input-tax-credit", href: "/service/input-tax-credit" },
      { title: "ITR-6 Return Filing", slug: "itr-6-return-filing", href: "/service/itr-6-return-filing" },
      { title: "ITR-7 Return Filing", slug: "itr-7-return-filing", href: "/service/itr-7-return-filing" }
    ]
  },
  {
    title: "Compliance",
    slug: "compliance",
    href: "/service-by-categories/compliance",
    description: "Annual ROC filings, director appointments, shares transfer, and legal maintenance.",
    topServices: [
      { title: "Private Limited Compliance", slug: "private-limited-company-compliance", href: "/service/private-limited-company-compliance", isPopular: true },
      { title: "LLP Annual Compliance", slug: "llp-compliance", href: "/service/llp-compliance" },
      { title: "Proprietorship Compliance", slug: "proprietorship-compliance", href: "/service/proprietorship-compliance" },
      { title: "Partnership Compliance", slug: "partnership-compliance", href: "/service/partnership-compliance" },
      { title: "HR and Payroll Services", slug: "hr-and-payroll-service", href: "/service/hr-and-payroll-service" },
      { title: "EPF Registration", slug: "epf-registration", href: "/service/epf-registration" },
      { title: "Share Transfer Filing", slug: "share-transfer", href: "/service/share-transfer" },
      { title: "Director Removal / Resignation", slug: "removal-resignation-of-directors", href: "/service/removal-resignation-of-directors" },
      { title: "Registered Office Change", slug: "registered-office-change", href: "/service/registered-office-change" },
      { title: "Winding Up of Company", slug: "winding-up-the-company", href: "/service/winding-up-the-company" },
      { title: "PF Return Filing", slug: "pf-return-filing", href: "/service/pf-return-filing" },
      { title: "Adding New Director", slug: "adding-new-director", href: "/service/adding-new-director" },
      { title: "ESI Registration", slug: "esi-registration", href: "/service/esi-registration" },
      { title: "DIR-3 KYC Filing", slug: "dir-3-kyc", href: "/service/dir-3-kyc" },
      { title: "Authorized Capital Increase", slug: "authorized-capital-increase", href: "/service/authorized-capital-increase" },
      { title: "Winding Up of LLP", slug: "winding-up-of-llp", href: "/service/winding-up-of-llp" }
    ]
  },
  {
    title: "Certification & Licensing",
    slug: "certification-licensing",
    href: "/service-by-categories/certification-licensing",
    description: "Government licenses, industry certifications, and regulatory accreditations.",
    topServices: [
      { title: "FSSAI Food License", slug: "fssai-registration", href: "/service/fssai-registration", isPopular: true },
      { title: "Import Export Code (IEC)", slug: "import-export-code", href: "/service/import-export-code", isPopular: true },
      { title: "PSARA Security Agency License", slug: "psara-license", href: "/service/psara-license", isPopular: true },
      { title: "Gem Portal Registration", slug: "gem-registration", href: "/service/gem-registration" },
      { title: "Trade License", slug: "trade-license", href: "/service/trade-license" },
      { title: "AYUSH License", slug: "ayush-license", href: "/service/ayush-license" },
      { title: "FDA Cosmetic/Drug License", slug: "fda-license", href: "/service/fda-license" },
      { title: "CE Marking Certificate", slug: "ce-certificate", href: "/service/ce-certificate" },
      { title: "Liquor License", slug: "liquor-license", href: "/service/liquor-license" },
      { title: "Music License", slug: "music-license", href: "/service/music-license" },
      { title: "ISO Certification", slug: "iso-certification", href: "/service/iso-certification" },
      { title: "CDSCO Drug/Device License", slug: "cdsco-license", href: "/service/cdsco-license" },
      { title: "APEDA Export License", slug: "apeda-license", href: "/service/apeda-license" },
      { title: "Seed License Registration", slug: "seed-license", href: "/service/seed-license" },
      { title: "Fertilizer License", slug: "fertilizer-license", href: "/service/fertilizer-license" },
      { title: "Spice Board License", slug: "spice-board-license", href: "/service/spice-board-license" }
    ]
  }
];
export {
  NAV_CATEGORIES
};
