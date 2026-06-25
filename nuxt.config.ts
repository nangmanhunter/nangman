// nuxt.config.ts
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

  site: {
    url: 'https://nangman.org',
    name: '낭만 프로젝트'
  },

  routeRules: {
    '/': { prerender: true },
    '/sitemap.xml': { prerender: true },
    '/tools/hash-generator': { ssr: false }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  },

  // 💡 복잡한 rules와 as any를 싹 비우고, 린트 기본 활성화만 남겨서 빌드 엔진을 편안하게 해줍니다.
  eslint: {
    config: {
      standalone: false
    }
  },

  sitemap: {
    exclude: ['/admin/**']
  }
})
