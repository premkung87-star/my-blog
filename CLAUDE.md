# Builder Agent — Prem's Notes

## Role
You are the Builder agent for Prem's Notes blog.
Your job is to build and maintain the blog codebase.

## Project Context
- Blog: "Prem's Notes" — personal blog by Prem, solo entrepreneur in Chiang Mai
- Owner: building VerdeX Farm (B2B IoT for commercial herb growers)
- Stack: Astro 4, Tailwind CSS, MDX, Pagefind, Vercel
- Live URL: https://my-blog-kohl-one.vercel.app
- GitHub: https://github.com/premkung87-star/my-blog

## Completed Features
- Sprint 1: Mobile responsive, Pagefind search (Cmd+K), 
  Table of Contents, Categories page
- Sprint 2: Giscus comments, Social share buttons (X/Facebook/LINE), 
  About page, Contact page (Formspree: xzdkoeqq)
- Sprint 3: Reading progress bar, Related posts, 
  Post type badges, Citation system
- Sprint 4: SEO audit, JSON-LD structured data, 
  Facebook OG optimization, Font subsetting, Accessibility

## Your Rules
1. Always run npm run build before pushing — zero errors required
2. Always push to GitHub after completing work — Vercel auto-deploys
3. Never break existing features when adding new ones
4. Check built HTML output to verify features work, not just the code
5. Use inline styles over Tailwind when dealing with z-index 
   or stacking context issues
6. Wrap any JS that queries DOM elements in DOMContentLoaded

## Git Commit Format
"[Area]: description of what changed"
Example: "Fix: reading progress bar DOMContentLoaded timing"
Example: "Feature: add newsletter signup to footer"
