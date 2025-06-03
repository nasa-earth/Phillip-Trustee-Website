// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from "@rollup/plugin-yaml";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Admin Dashboard",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:3005/api",
    },
  },

  vite: {
    plugins: [yaml()],
  },

  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "@pinia/nuxt"],

  components: true,
  pages: true,

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
  },

  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
});
