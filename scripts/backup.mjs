#!/usr/bin/env node

/**
 * Export all blog content as a standalone archive.
 *
 * Usage: node scripts/backup.mjs
 * Output: backups/verdex-backup-YYYY-MM-DD.tar.gz
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const date = new Date().toISOString().split('T')[0];
const backupDir = 'backups';
const filename = `verdex-backup-${date}.tar.gz`;
const filepath = path.join(backupDir, filename);

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const includes = [
  'src/content/',
  'src/pages/',
  'src/components/',
  'src/layouts/',
  'src/styles/',
  'src/utils/',
  'public/',
  'astro.config.mjs',
  'package.json',
  'CLAUDE.md',
].filter((p) => fs.existsSync(p));

try {
  execSync(`tar -czf ${filepath} ${includes.join(' ')}`, { stdio: 'inherit' });
  const stats = fs.statSync(filepath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`✅ Backup created: ${filepath} (${sizeMB} MB)`);
} catch (err) {
  console.error('❌ Backup failed:', err.message);
  process.exit(1);
}
