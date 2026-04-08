/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Sarabun', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Courier New', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '9999px', // keep for avatar circles only
      },
      colors: {
        terminal: {
          deep: '#0F3D32',
          sage: '#A8D3BF',
          glow: '#2E7D32',
          surface: '#0a2e24',
        },
      },
      typography: ({ theme }) => ({
        stone: {
          css: {
            '--tw-prose-body':        theme('colors.stone[700]'),
            '--tw-prose-headings':    theme('colors.stone[900]'),
            '--tw-prose-links':       '#0f3d32',
            '--tw-prose-bold':        theme('colors.stone[900]'),
            '--tw-prose-counters':    theme('colors.stone[500]'),
            '--tw-prose-bullets':     theme('colors.stone[400]'),
            '--tw-prose-hr':          theme('colors.stone[200]'),
            '--tw-prose-quotes':      theme('colors.stone[700]'),
            '--tw-prose-quote-borders': '#a8d3bf',
            '--tw-prose-captions':    theme('colors.stone[500]'),
            '--tw-prose-code':        theme('colors.stone[800]'),
            '--tw-prose-pre-code':    theme('colors.stone[200]'),
            '--tw-prose-pre-bg':      '#0F3D32',
            '--tw-prose-th-borders':  theme('colors.stone[300]'),
            '--tw-prose-td-borders':  theme('colors.stone[200]'),
            '--tw-prose-invert-body':        '#a8d3bf',
            '--tw-prose-invert-headings':    '#e0f0ea',
            '--tw-prose-invert-links':       '#a8d3bf',
            '--tw-prose-invert-bold':        '#e0f0ea',
            '--tw-prose-invert-counters':    '#a8d3bf',
            '--tw-prose-invert-bullets':     'rgba(168,211,191,0.4)',
            '--tw-prose-invert-hr':          'rgba(168,211,191,0.15)',
            '--tw-prose-invert-quotes':      '#a8d3bf',
            '--tw-prose-invert-quote-borders': '#2E7D32',
            '--tw-prose-invert-captions':    'rgba(168,211,191,0.7)',
            '--tw-prose-invert-code':        '#a8d3bf',
            '--tw-prose-invert-pre-code':    '#a8d3bf',
            '--tw-prose-invert-pre-bg':      '#0a2e24',
            '--tw-prose-invert-th-borders':  'rgba(168,211,191,0.2)',
            '--tw-prose-invert-td-borders':  'rgba(168,211,191,0.1)',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
