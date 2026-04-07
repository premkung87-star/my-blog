#!/usr/bin/env node

/**
 * Build-time link checker — scans dist/ HTML for broken internal links.
 *
 * Usage: node scripts/check-links.mjs
 */

import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const errors = [];

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findHtmlFiles(full));
    else if (entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

function extractLinks(html) {
  const links = [];
  const regex = /href="(\/[^"#?]*?)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

const htmlFiles = findHtmlFiles(distDir);
const existingPaths = new Set();

// Build set of existing paths
for (const file of htmlFiles) {
  const rel = '/' + path.relative(distDir, file).replace(/index\.html$/, '').replace(/\.html$/, '');
  existingPaths.add(rel);
  existingPaths.add(rel.replace(/\/$/, '') || '/');
}

// Also add non-HTML files (images, css, etc.)
function addStaticFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) addStaticFiles(full);
    else existingPaths.add('/' + path.relative(distDir, full));
  }
}
addStaticFiles(distDir);

// Check each HTML file for broken links
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf-8');
  const links = extractLinks(html);
  const source = '/' + path.relative(distDir, file);

  for (const link of links) {
    const normalized = link.endsWith('/') ? link : link + '/';
    const withoutSlash = link.replace(/\/$/, '') || '/';

    if (
      !existingPaths.has(link) &&
      !existingPaths.has(normalized) &&
      !existingPaths.has(withoutSlash) &&
      !existingPaths.has(link + '/index.html')
    ) {
      errors.push({ source, link });
    }
  }
}

if (errors.length === 0) {
  console.log(`✅ Link check passed — ${htmlFiles.length} pages, all internal links valid.`);
} else {
  console.log(`❌ Found ${errors.length} broken internal link(s):`);
  for (const { source, link } of errors) {
    console.log(`   ${source} → ${link}`);
  }
  process.exit(1);
}
