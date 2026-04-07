#!/usr/bin/env node

/**
 * Performance budget checker — fails if JS/CSS bundles exceed limits.
 *
 * Usage: node scripts/perf-budget.mjs
 */

import fs from 'fs';
import path from 'path';

const BUDGETS = {
  '.js': 200 * 1024,   // 200 KB per JS file
  '.css': 50 * 1024,   // 50 KB per CSS file
  totalJS: 500 * 1024, // 500 KB total JS
  totalCSS: 100 * 1024, // 100 KB total CSS
};

function findFiles(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full, ext));
    else if (entry.name.endsWith(ext)) results.push(full);
  }
  return results;
}

const errors = [];
let totalJS = 0;
let totalCSS = 0;

const jsFiles = findFiles('dist/_astro', '.js');
const cssFiles = findFiles('dist/_astro', '.css');

for (const file of jsFiles) {
  const size = fs.statSync(file).size;
  totalJS += size;
  if (size > BUDGETS['.js']) {
    errors.push(`❌ ${path.relative('dist', file)}: ${(size / 1024).toFixed(1)} KB (limit: ${(BUDGETS['.js'] / 1024).toFixed(0)} KB)`);
  }
}

for (const file of cssFiles) {
  const size = fs.statSync(file).size;
  totalCSS += size;
  if (size > BUDGETS['.css']) {
    errors.push(`❌ ${path.relative('dist', file)}: ${(size / 1024).toFixed(1)} KB (limit: ${(BUDGETS['.css'] / 1024).toFixed(0)} KB)`);
  }
}

if (totalJS > BUDGETS.totalJS) {
  errors.push(`❌ Total JS: ${(totalJS / 1024).toFixed(1)} KB (limit: ${(BUDGETS.totalJS / 1024).toFixed(0)} KB)`);
}
if (totalCSS > BUDGETS.totalCSS) {
  errors.push(`❌ Total CSS: ${(totalCSS / 1024).toFixed(1)} KB (limit: ${(BUDGETS.totalCSS / 1024).toFixed(0)} KB)`);
}

console.log(`JS:  ${jsFiles.length} files, ${(totalJS / 1024).toFixed(1)} KB total (limit: ${(BUDGETS.totalJS / 1024).toFixed(0)} KB)`);
console.log(`CSS: ${cssFiles.length} files, ${(totalCSS / 1024).toFixed(1)} KB total (limit: ${(BUDGETS.totalCSS / 1024).toFixed(0)} KB)`);

if (errors.length === 0) {
  console.log('✅ Performance budget: PASS');
} else {
  console.log('');
  errors.forEach((e) => console.log(e));
  process.exit(1);
}
