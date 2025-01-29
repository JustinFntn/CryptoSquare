export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@clerk/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-01-27",
  telemetry: false,
  clerk: {
    skipServerMiddleware: true,
  },
})
