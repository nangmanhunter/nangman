/*
- https://nuxt.com/docs/api/configuration/nuxt-config
- https://www.npmjs.com/package/@nuxtjs/sitemap
*/
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Nuxt 공식 SEO 기준 설정
  site: {
    url: 'https://nangman.org',
    name: '낭만 프로젝트'
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // 구글 sitemap 모듈이 확실하게 주소를 인지하도록 내부에 한 번 더 명시 (빨간 줄 방지)
  sitemap: {
    exclude: ['/admin/**']
  }
})
