// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

export default defineConfig({
  site: 'https://theboatguy.dk',
  redirects: { '/': '/da/' },

  i18n: {
    defaultLocale: 'da',
    locales: ['da', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  vite: { plugins: [tailwindcss()] },

  adapter: node({
    mode: 'standalone',
  }),
});