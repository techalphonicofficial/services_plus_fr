import fs from 'node:fs/promises';

async function checkAllStatus() {
  const urls = JSON.parse(await fs.readFile('docs/all-urls.json', 'utf-8'));
  console.log(`Checking status of ${urls.length} URLs...`);

  const results = {
    200: [],
    301: [],
    302: [],
    404: [],
    500: [],
    errors: []
  };

  // Run with concurrency of 10
  const concurrency = 10;
  for (let i = 0; i < urls.length; i += concurrency) {
    const chunk = urls.slice(i, i + concurrency);
    await Promise.all(chunk.map(async (url) => {
      try {
        const res = await fetch(url, { redirect: 'manual' });
        if (results[res.status]) {
          results[res.status].push({ url, location: res.headers.get('location') });
        } else {
          results.errors.push({ url, status: res.status });
        }
      } catch (e) {
        results.errors.push({ url, error: e.message });
      }
    }));
    process.stdout.write(`Processed ${Math.min(i + concurrency, urls.length)}/${urls.length}\r`);
  }

  console.log('\nStatus summary:');
  console.log('200 OK:', results[200].length);
  console.log('301 Redirect:', results[301].length);
  console.log('302 Redirect:', results[302].length);
  console.log('404 Not Found:', results[404].length);
  console.log('500 Server Error:', results[500].length);
  console.log('Other Errors:', results.errors.length);

  if (results[500].length > 0) {
    console.log('\n500 URLs:');
    results[500].forEach(r => console.log('  ', r.url));
  }
  if (results[404].length > 0) {
    console.log('\n404 URLs:');
    results[404].forEach(r => console.log('  ', r.url));
  }

  await fs.writeFile('docs/url-status-audit.json', JSON.stringify(results, null, 2));
}

checkAllStatus().catch(console.error);

