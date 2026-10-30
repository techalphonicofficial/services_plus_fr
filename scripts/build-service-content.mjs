import fs from 'node:fs/promises';
import path from 'node:path';

// Known broken services from sitemap to furnish with valid baseline content
const BROKEN_SLUGS = [
  'google-adwords-services',
  'content-writing-for-products',
  'content-writing-for-pr',
  'content-writing-for-blogs',
  'content-writing-for-seo-services',
  'content-writing-services',
  'digital-marketing',
  'content-writing-for-website',
  'custom-erp-software-2311071006-714',
  'email-marketing-services',
  'multi-e-commerce-website-development',
  'lead-generation-services',
  'portal-website-development',
  'seo-services',
  'single-vendor-e-commerce-website-development',
  'social-media-marketing-services',
  'software-development',
  'website-development-services',
  'wordpress-website-development'
];

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function determineCategory(slug, title) {
  const s = (slug + ' ' + title).toLowerCase();
  if (s.includes('trademark') || s.includes('copyright') || s.includes('patent')) return 'trademark';
  if (s.includes('gst') || s.includes('tax') || s.includes('itr') || s.includes('tds')) return 'taxes';
  if (s.includes('compliance') || s.includes('payroll') || s.includes('epf') || s.includes('share-transfer') || s.includes('director') || s.includes('winding')) return 'compliance';
  if (s.includes('license') || s.includes('certificate') || s.includes('licensing') || s.includes('gem') || s.includes('fda') || s.includes('fssai') || s.includes('ayush') || s.includes('psara')) return 'certification-licensing';
  return 'startup';
}

async function run() {
  console.log('--- GENERATING TYPED SERVICE CONTENT STORE ---');

  const inv = JSON.parse(await fs.readFile('docs/inventory.json', 'utf-8'));
  const servicePages = inv.filter(p => p.path.startsWith('/service/'));

  await fs.mkdir('src/content/services/items', { recursive: true });

  const allServices = [];

  for (const page of servicePages) {
    const slug = page.path.replace('/service/', '').split('?')[0];
    const category = determineCategory(slug, page.title);

    // Extract structured tabs
    const overview = page.bodyContent.summary || '';
    const sections = page.bodyContent.sections || [];

    // Classify sections into anchor tabs: Overview, Benefits, Documents, Process, Eligibility, FAQ
    const benefits = [];
    const documents = [];
    const processSteps = [];
    const eligibility = [];

    sections.forEach(sec => {
      const h = sec.heading.toLowerCase();
      if (h.includes('benefit') || h.includes('advantage') || h.includes('why')) {
        benefits.push(...sec.paragraphs);
      } else if (h.includes('document') || h.includes('requirement') || h.includes('checklist')) {
        documents.push(...sec.paragraphs);
      } else if (h.includes('process') || h.includes('step') || h.includes('how to') || h.includes('procedure')) {
        processSteps.push(...sec.paragraphs);
      } else if (h.includes('eligib') || h.includes('who can') || h.includes('criteria')) {
        eligibility.push(...sec.paragraphs);
      }
    });

    const serviceRecord = {
      slug,
      title: page.h1 || page.title.replace(' | Services Plus', '').replace('Servicesplus - ', '') || titleFromSlug(slug),
      metaTitle: page.title || `${titleFromSlug(slug)} | Services Plus`,
      metaDescription: page.metaDescription || `Professional ${titleFromSlug(slug)} in India. Fast processing, 100% online documentation, and expert assistance by Services Plus.`,
      canonical: `https://www.servicesplus.in/service/${slug}`,
      h1: page.h1 || titleFromSlug(slug),
      category,
      overview,
      benefits: benefits.slice(0, 10),
      documents: documents.slice(0, 10),
      process: processSteps.slice(0, 10),
      eligibility: eligibility.slice(0, 8),
      pricing: {
        note: 'Government fees & professional filing charges apply. Transparent quote upon consultation.'
      },
      faqs: page.faqs && page.faqs.length > 0 ? page.faqs : [
        {
          question: `What is the timeline for ${titleFromSlug(slug)}?`,
          answer: `The standard timeline for ${titleFromSlug(slug)} typically ranges from 3 to 10 business days depending on government department verification and applicant document readiness.`
        },
        {
          question: `What documents are required to initiate ${titleFromSlug(slug)}?`,
          answer: `Standard requirements include identity proof (PAN card), address proof (Aadhaar/Passport/Utility bill), and entity authorization documents. Our compliance team verifies all records prior to submission.`
        }
      ],
      sections: sections.slice(0, 12),
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: category.charAt(0).toUpperCase() + category.slice(1), href: `/service-by-categories/${category}` },
        { label: titleFromSlug(slug), href: `/service/${slug}` }
      ]
    };

    allServices.push(serviceRecord);
    await fs.writeFile(
      `src/content/services/items/${slug}.json`,
      JSON.stringify(serviceRecord, null, 2),
      'utf-8'
    );
  }

  // Also furnish broken slugs from sitemap so they never 500 or 404 in our new Next.js app!
  for (const slug of BROKEN_SLUGS) {
    if (allServices.some(s => s.slug === slug)) continue;
    const category = determineCategory(slug, titleFromSlug(slug));
    const serviceRecord = {
      slug,
      title: titleFromSlug(slug),
      metaTitle: `${titleFromSlug(slug)} | Services Plus`,
      metaDescription: `Comprehensive ${titleFromSlug(slug)} solutions by Services Plus. Expert business consulting, digital implementation, and continuous support.`,
      canonical: `https://www.servicesplus.in/service/${slug}`,
      h1: `${titleFromSlug(slug)} in India`,
      category,
      overview: `Services Plus provides specialized ${titleFromSlug(slug)} tailored to startups, growing businesses, and established enterprises looking for excellence and regulatory reliability.`,
      benefits: [
        'End-to-end bespoke solution tailored to enterprise goals',
        'Transparent milestone-driven execution and zero hidden costs',
        'Dedicated senior project manager and ongoing SLA support'
      ],
      documents: [
        'Business entity registration certificate or PAN',
        'Authorized signatory identification proof',
        'Specific project scope and operational requirements'
      ],
      process: [
        'Initial discovery and scoping consultation',
        'Strategy formulation and timeline finalization',
        'Execution, quality assurance, and milestone review',
        'Deployment, compliance validation, and handover'
      ],
      eligibility: [
        'Proprietorships, Partnerships, LLPs, Private Limited Companies, and Individual Founders'
      ],
      pricing: {
        note: 'Custom quotation based on project specifications.'
      },
      faqs: [
        {
          question: `How does Services Plus deliver ${titleFromSlug(slug)}?`,
          answer: `Our certified specialists coordinate directly with your team via phone and WhatsApp to manage every phase of ${titleFromSlug(slug)} with rigorous quality assurance.`
        }
      ],
      sections: [
        {
          heading: `Professional ${titleFromSlug(slug)} Solutions`,
          paragraphs: [
            `With extensive industry standing as a business process and technology advisory partner, Services Plus empowers enterprises across India to achieve seamless operational growth.`
          ]
        }
      ],
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: category.charAt(0).toUpperCase() + category.slice(1), href: `/service-by-categories/${category}` },
        { label: titleFromSlug(slug), href: `/service/${slug}` }
      ]
    };

    allServices.push(serviceRecord);
    await fs.writeFile(
      `src/content/services/items/${slug}.json`,
      JSON.stringify(serviceRecord, null, 2),
      'utf-8'
    );
  }

  // Generate catalog index
  await fs.writeFile(
    'src/content/services/catalog.json',
    JSON.stringify(allServices.map(s => ({
      slug: s.slug,
      title: s.title,
      category: s.category,
      metaDescription: s.metaDescription,
      href: `/service/${s.slug}`
    })), null, 2),
    'utf-8'
  );

  console.log(`Successfully generated ${allServices.length} typed service content items in src/content/services/items/`);
}

run().catch(console.error);
