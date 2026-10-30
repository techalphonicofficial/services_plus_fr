import fs from 'node:fs/promises';
import path from 'node:path';

async function run() {
  console.log('--- GENERATING TYPED BLOG CONTENT STORE ---');

  const inv = JSON.parse(await fs.readFile('docs/inventory.json', 'utf-8'));
  const blogPages = inv.filter(p => p.path.startsWith('/blog-detail/'));

  await fs.mkdir('src/content/blogs/items', { recursive: true });

  const allBlogs = [];

  for (const page of blogPages) {
    const slug = page.path.replace('/blog-detail/', '').split('?')[0];
    const title = page.h1 || page.title.replace(' | Services Plus', '').replace('Services plus | Blog Detail', '') || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const blogRecord = {
      slug,
      title: title.trim(),
      metaTitle: page.title || `${title} | Services Plus`,
      metaDescription: page.metaDescription || `Read ${title} by Services Plus. Expert compliance, legal, and taxation guides.`,
      canonical: `https://www.servicesplus.in/blog-detail/${slug}`,
      h1: title.trim(),
      summary: page.bodyContent.summary.slice(0, 300) + '...',
      sections: page.bodyContent.sections || [],
      author: 'Services Plus Legal Team',
      publishedAt: '2026-01-15',
      category: 'Legal & Compliance',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Blogs', href: '/blog' },
        { label: title.trim(), href: `/blog-detail/${slug}` }
      ]
    };

    allBlogs.push({
      slug: blogRecord.slug,
      title: blogRecord.title,
      summary: blogRecord.summary,
      author: blogRecord.author,
      publishedAt: blogRecord.publishedAt,
      category: blogRecord.category,
      href: `/blog-detail/${blogRecord.slug}`
    });

    await fs.writeFile(
      `src/content/blogs/items/${slug}.json`,
      JSON.stringify(blogRecord, null, 2),
      'utf-8'
    );
  }

  // Catalog index
  await fs.writeFile(
    'src/content/blogs/catalog.json',
    JSON.stringify(allBlogs, null, 2),
    'utf-8'
  );

  console.log(`Successfully generated ${allBlogs.length} typed blog posts in src/content/blogs/items/`);
}

run().catch(console.error);
