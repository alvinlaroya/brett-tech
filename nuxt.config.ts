// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  /* css: ['@/assets/css/main.css'], */
  image: {
    provider: 'netlify',
    domains: ['cdn.shopify.com']
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper'
  ]
})