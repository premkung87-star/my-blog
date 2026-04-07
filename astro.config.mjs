import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isKeystatic = !!process.env.KEYSTATIC;

// Replace with your actual Vercel domain after deployment
export default defineConfig({
  site: 'https://my-blog-kohl-one.vercel.app',
  // Keystatic needs hybrid mode — only enable during dev with KEYSTATIC=1
  ...(isKeystatic ? { output: 'hybrid' } : {}),
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      serialize(item) {
        // Blog posts get higher priority
        if (item.url.includes('/blog/') && item.url !== 'https://my-blog-kohl-one.vercel.app/blog/') {
          item.priority = 0.8;
        } else if (item.url === 'https://my-blog-kohl-one.vercel.app/') {
          item.priority = 1.0;
        } else if (item.url.includes('/tags/')) {
          item.priority = 0.4;
        } else {
          item.priority = 0.6;
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    mdx(),
    ...(isKeystatic ? [react(), keystatic()] : []),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
