#!/usr/bin/env node

/**
 * Scaffold a new blog post with correct frontmatter.
 *
 * Usage:
 *   node scripts/new-post.mjs "My Post Title"
 *   node scripts/new-post.mjs "My Post Title" --lang=en --type=Essay --tags="AI,Farming"
 *   node scripts/new-post.mjs "My Post Title" --series="VerdeX Build Log" --order=1
 */

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith('--')) {
  console.log('Usage: node scripts/new-post.mjs "Post Title" [options]');
  console.log('');
  console.log('Options:');
  console.log('  --lang=th|en        Language (default: th)');
  console.log('  --type=Essay|Note|Lesson|Story  Post type');
  console.log('  --tags="tag1,tag2"  Comma-separated tags');
  console.log('  --series="name"     Series name');
  console.log('  --order=N           Series order');
  console.log('  --draft             Create as draft');
  process.exit(1);
}

const title = args[0];
const flags = Object.fromEntries(
  args.slice(1).map((a) => {
    if (a === '--draft') return ['draft', 'true'];
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v];
  })
);

const lang = flags.lang || 'th';
const postType = flags.type || '';
const tags = flags.tags ? flags.tags.split(',').map((t) => t.trim()) : [];
const series = flags.series || '';
const seriesOrder = flags.order || '';
const draft = flags.draft === 'true';

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const today = new Date().toISOString().split('T')[0];

const tagsLine = tags.length > 0
  ? `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`
  : 'tags: []';

let frontmatter = `---
title: "${title}"
description: ""
pubDate: ${today}
${tagsLine}
draft: ${draft}
lang: "${lang}"`;

if (postType) frontmatter += `\npostType: "${postType}"`;
if (series) frontmatter += `\nseries: "${series}"`;
if (seriesOrder) frontmatter += `\nseriesOrder: ${seriesOrder}`;

frontmatter += `\n---

# ${title}

`;

const filePath = path.join('src', 'content', 'blog', `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`❌ File already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, frontmatter);
console.log(`✅ Created: ${filePath}`);
console.log(`   Title: ${title}`);
console.log(`   Slug: ${slug}`);
console.log(`   Lang: ${lang}`);
if (postType) console.log(`   Type: ${postType}`);
if (tags.length) console.log(`   Tags: ${tags.join(', ')}`);
if (series) console.log(`   Series: ${series} (#${seriesOrder})`);
if (draft) console.log(`   Status: Draft`);
