import fs from 'node:fs/promises';

async function inspectHomeContent() {
  const inv = JSON.parse(await fs.readFile('docs/inventory.json', 'utf-8'));
  const home = inv.find(p => p.path === '/');
  console.log('Title:', home.title);
  console.log('Meta:', home.metaDescription);
  console.log('H1:', home.h1);
  console.log('Headings:', home.headings.slice(0, 20));
  console.log('FAQs:', home.faqs);
  console.log('Sections count:', home.bodyContent.sections.length);
  home.bodyContent.sections.slice(0, 10).forEach((s, idx) => {
    console.log(`\nSection #${idx+1} [${s.heading}]:`);
    console.log(s.paragraphs.slice(0, 3));
  });
}

inspectHomeContent().catch(console.error);

