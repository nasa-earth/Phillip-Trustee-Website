// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from '@rollup/plugin-yaml';
import tailwindcss from '@tailwindcss/vite';



export default defineNuxtConfig({
  vite: {
    plugins: [
      yaml(),
      tailwindcss(),
    ]
  },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module']
})