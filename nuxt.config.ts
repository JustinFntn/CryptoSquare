import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  modules: [
      '@primevue/nuxt-module', '@nuxtjs/tailwindcss'
  ],

  primevue: {
      options: {
          theme: {
              preset: Aura
          }
      }
  },

  compatibilityDate: '2025-01-27'
})