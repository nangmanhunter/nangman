/*
- https://nuxt.com/docs/api/configuration/nuxt-config
- https://www.npmjs.com/package/@nuxtjs/sitemap
*/
/* eslint-disable */
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/sitemap'],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  // Nuxt 공식 SEO 기준 설정
  site: {
    url: 'https://nangman.org',
    name: '낭만 프로젝트',
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      crawlLinks: true, // 사이트 내 링크들을 자동으로 크롤링해서
      routes: ['/sitemap.xml'], // sitemap.xml을 static 파일로 미리 구워냅니다.
    },
  },

  eslint: {
    rules: {
      'stylistic/sort-members': 'off',
      'import/order': 'off',
      'vue/order-in-components': 'off',
      'vue/attributes-order': 'off',
      'stylistic/comma-dangle': 'off',
    },
    config: {
      stylistic: {
        braceStyle: '1tbs',
        quotes: 'single',
        indent: 2,
      },
    },
  } as any, // ⬅️ 여기에 as any를 딱 꽂아주는 게 핵심 치트키입니다.

  // 구글 sitemap 모듈이 확실하게 주소를 인지하도록 내부에 한 번 더 명시 (빨간 줄 방지)
  sitemap: {
    exclude: ['/admin/**'],
  },
});
