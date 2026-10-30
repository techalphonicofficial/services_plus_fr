async function inspectPages() {
  const pages = [
    '/user-login',
    '/user-register',
    '/payment',
    '/notification',
    '/contact',
    '/service/private-limited-company-registration'
  ];

  for (const p of pages) {
    try {
      const res = await fetch('https://www.servicesplus.in' + p);
      const html = await res.text();
      console.log(`\n========================================`);
      console.log(`PAGE: ${p} (Status: ${res.status})`);
      console.log(`========================================`);
      
      const formMatches = [...html.matchAll(/<form[\s\S]*?<\/form>/gi)];
      console.log(`Forms found: ${formMatches.length}`);
      
      formMatches.forEach((f, idx) => {
        const raw = f[0];
        const actionMatch = raw.match(/action=["']([^"']*)["']/i);
        const methodMatch = raw.match(/method=["']([^"']*)["']/i);
        const idMatch = raw.match(/id=["']([^"']*)["']/i);
        const classMatch = raw.match(/class=["']([^"']*)["']/i);
        
        console.log(`\n  Form #${idx + 1}:`);
        console.log(`    id: ${idMatch ? idMatch[1] : 'none'}`);
        console.log(`    action: ${actionMatch ? actionMatch[1] : 'none'}`);
        console.log(`    method: ${methodMatch ? methodMatch[1] : 'none'}`);
        
        const inputs = [...raw.matchAll(/<input[\s\S]*?>/gi)].map(inp => {
          const name = (inp[0].match(/name=["']([^"']*)["']/i) || [])[1];
          const type = (inp[0].match(/type=["']([^"']*)["']/i) || [])[1];
          const val = (inp[0].match(/value=["']([^"']*)["']/i) || [])[1];
          return { name, type, val };
        });
        console.log(`    Inputs:`, inputs);

        const buttons = [...raw.matchAll(/<button[\s\S]*?>([\s\S]*?)<\/button>/gi)].map(btn => btn[1].replace(/<[^>]+>/g, '').trim());
        console.log(`    Buttons:`, buttons);
      });

      // Also look for script tags that do ajax or fetch or axios or submit handlers
      const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)]
        .map(s => s[1].trim())
        .filter(s => s.length > 0 && (s.includes('ajax') || s.includes('fetch') || s.includes('http') || s.includes('submit') || s.includes('payment') || s.includes('login')));
      
      if (scripts.length > 0) {
        console.log(`  Relevant scripts found: ${scripts.length}`);
        scripts.forEach((s, idx) => {
          console.log(`  Script snippet #${idx + 1}:`, s.slice(0, 300));
        });
      }
    } catch (e) {
      console.error(`Error on ${p}:`, e.message);
    }
  }
}

inspectPages();

