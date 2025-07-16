// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  /* css: ['@/assets/css/main.css'], */
  image: {
    shopify: {
      baseURL: 'https://cdn.shopify.com/',
    },
    domains: ['cdn.shopify.com'],
  },
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ]
})