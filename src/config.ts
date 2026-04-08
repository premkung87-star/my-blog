/** Central config — single source of truth for site-wide constants */

export const siteConfig = {
  name: 'VerdeX',
  url: 'https://my-blog-kohl-one.vercel.app',
  domain: 'my-blog-kohl-one.vercel.app',
  description: 'Solo entrepreneur in Chiang Mai building VerdeX Farm — writing about entrepreneurship, hydroponics, and technology.',
  author: 'Prem',
  locale: {
    default: 'th' as const,
    alternate: 'en' as const,
  },
  ogDefaultImage: '/og-default.png',
  buttondown: {
    username: 'verdex',
    action: 'https://buttondown.com/api/emails/embed-subscribe/verdex',
  },
  formspree: {
    id: 'xzdkoeqq',
    action: 'https://formspree.io/f/xzdkoeqq',
  },
  giscus: {
    repo: 'premkung87-star/my-blog',
    repoId: 'R_kgDOR7rAoQ',
    category: 'General',
    categoryId: 'DIC_kwDOR7rAoc4C6QtU',
  },
  twitter: '@premkung',
};
