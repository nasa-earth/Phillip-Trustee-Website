import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    'primeicons/primeicons.css',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  plugins: [
    "~/plugins/primevue.js",
    "~/plugins/auth.js",
    "~/plugins/motion.js",
  ],
  modules: [
    "@pinia/nuxt",
    '@primevue/nuxt-module'
  ],
  
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3000",
    },
  },
  // Explicitly configure router options
  router: {
    options: {
      linkActiveClass: "active-link",
      linkExactActiveClass: "exact-active-link",
    },
  },
});
