// src/pages/_app.ts
import type { App } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';

export default (app: App) => {
  app.use(plugin, defaultConfig);
};
