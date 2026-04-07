import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Replace with your actual Vercel domain after deployment
export default defineConfig({
  site: 'https://my-blog-kohl-one.vercel.app',
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
