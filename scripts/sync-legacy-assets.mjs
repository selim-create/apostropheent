import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'assets');
const target = path.join(root, 'public', 'assets');

if (!existsSync(source)) {
  console.warn('[sync:legacy] legacy assets directory not found, skipping');
  process.exit(0);
}

await mkdir(path.dirname(target), { recursive: true });
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
console.log('[sync:legacy] assets copied to public/assets');
