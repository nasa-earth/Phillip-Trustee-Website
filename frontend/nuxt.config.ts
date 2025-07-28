import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  plugins: [
    "~/plugins/primevue.js",
    "~/plugins/auth.ts",
    "~/plugins/motion.js",
  ],
  modules: ["@pinia/nuxt", "@primevue/nuxt-module"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3005",
    },
  },

  // Configure API proxy
  nitro: {
    devProxy: {
      "/api": {
        target: process.env.API_BASE || "http://localhost:3005",
        changeOrigin: true,
      },
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
