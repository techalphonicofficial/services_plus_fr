import fs from 'node:fs/promises';
import path from 'node:path';
import esbuild from 'esbuild';

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(res)));
    } else if (res.endsWith('.ts') || res.endsWith('.tsx')) {
      if (!res.endsWith('.d.ts')) {
        files.push(res);
      }
    }
  }
  return files;
}

async function convertFile(filePath) {
  const isTsx = filePath.endsWith('.tsx');
  const newExt = isTsx ? '.jsx' : '.js';
  const newPath = filePath.slice(0, isTsx ? -4 : -3) + newExt;

  const content = await fs.readFile(filePath, 'utf-8');

  const transformed = esbuild.transformSync(content, {
    loader: isTsx ? 'tsx' : 'ts',
    jsx: 'preserve',
    format: 'esm',
    target: 'esnext',
  });

  await fs.writeFile(newPath, transformed.code, 'utf-8');
  await fs.unlink(filePath);
  console.log(`Converted: ${path.relative(process.cwd(), filePath)} -> ${path.relative(process.cwd(), newPath)}`);
}

async function run() {
  console.log('--- CONVERTING PROJECT TO 100% JAVASCRIPT ---');

  // Convert next.config.ts -> next.config.mjs
  try {
    const nextConfigContent = await fs.readFile('next.config.ts', 'utf-8');
    const transformed = esbuild.transformSync(nextConfigContent, {
      loader: 'ts',
      format: 'esm',
      target: 'esnext',
    });
    await fs.writeFile('next.config.mjs', transformed.code, 'utf-8');
    await fs.unlink('next.config.ts');
    console.log('Converted next.config.ts -> next.config.mjs');
  } catch (e) {
    console.warn('next.config.ts not found or already converted');
  }

  // Convert tailwind.config.ts -> tailwind.config.js
  try {
    const tailwindContent = await fs.readFile('tailwind.config.ts', 'utf-8');
    const transformed = esbuild.transformSync(tailwindContent, {
      loader: 'ts',
      format: 'esm',
      target: 'esnext',
    });
    await fs.writeFile('tailwind.config.js', transformed.code, 'utf-8');
    await fs.unlink('tailwind.config.ts');
    console.log('Converted tailwind.config.ts -> tailwind.config.js');
  } catch (e) {
    console.warn('tailwind.config.ts not found or already converted');
  }

  // Delete tsconfig.json and next-env.d.ts
  await fs.unlink('tsconfig.json').catch(() => {});
  await fs.unlink('next-env.d.ts').catch(() => {});

  // Create jsconfig.json
  const jsConfig = {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*']
      }
    },
    include: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    exclude: ['node_modules', '.next']
  };
  await fs.writeFile('jsconfig.json', JSON.stringify(jsConfig, null, 2), 'utf-8');
  console.log('Created jsconfig.json');

  // Convert all files in src/
  const srcFiles = await getFiles(path.join(process.cwd(), 'src'));
  for (const f of srcFiles) {
    await convertFile(f);
  }

  console.log('--- ALL FILES SUCCESSFULLY CONVERTED TO JAVASCRIPT ---');
}

run().catch(console.error);
