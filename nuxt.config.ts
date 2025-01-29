import { neobrutalism } from "@clerk/themes"

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@clerk/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/main.css", "clerk-themez/themes/floatball.css"],
  compatibilityDate: "2025-01-27",
  telemetry: false,
  clerk: {
    skipServerMiddleware: true,
    appearance: {
      baseTheme: neobrutalism,
      variables: {
        colorPrimary: "#fa0053",
      },
    },
  },
})
