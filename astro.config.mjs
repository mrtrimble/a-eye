// @ts-check
import { defineConfig } from 'astro/config';

import basicSsl from '@vitejs/plugin-basic-ssl'
import netlify from '@astrojs/netlify';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [vue()],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});