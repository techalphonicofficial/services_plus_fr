import fs from 'node:fs/promises';
import path from 'node:path';

async function getAppFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAppFiles(res)));
    } else if (res.endsWith('.jsx') || res.endsWith('.js')) {
      files.push(res);
    }
  }
  return files;
}

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');

  // Check if content has export { ... } at the bottom
  const exportMatch = content.match(/export\s*\{([^}]+)\};?\s*$/);
  if (!exportMatch) return;

  const exportedItems = exportMatch[1].split(',').map(s => s.trim()).filter(Boolean);
  let newContent = content.replace(exportMatch[0], '').trimEnd() + '\n';

  for (const item of exportedItems) {
    if (item.includes(' as default')) {
      const origName = item.split(' as default')[0].trim();
      newContent = newContent.replace(new RegExp(`function\\s+${origName}\\b`), `export default function ${origName}`);
      newContent = newContent.replace(new RegExp(`const\\s+${origName}\\s*=`), `export default ${origName} =`);
    } else if (item === 'default') {
      // already default
    } else {
      // Named export
      newContent = newContent.replace(new RegExp(`(?:const|let|var)\\s+${item}\\b`), `export const ${item}`);
      newContent = newContent.replace(new RegExp(`(?:async\\s+)?function\\s+${item}\\b`), `export $&`);
    }
  }

  await fs.writeFile(filePath, newContent, 'utf-8');
  console.log(`Cleaned exports in ${path.relative(process.cwd(), filePath)}`);
}

async function run() {
  const files = await getAppFiles(path.join(process.cwd(), 'src', 'app'));
  for (const f of files) {
    await fixFile(f);
  }
}

run().catch(console.error);

