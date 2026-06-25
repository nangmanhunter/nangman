<script setup>
// Nuxt 4의 내장 기능을 사용해 내 웹사이트 전체에 GTM을 안전하게 주입합니다.
useHead({
  script: [
    {
      src: 'https://www.googletagmanager.com/gtm.js?id=GTM-576H8NQ4', // 💡 여기에 내 GTM ID 입력
      async: true
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-576H8NQ4'); 
      `,
      type: 'text/javascript'
    }
  ]
})
</script>

<template>
  <UApp>
    <!-- <UHeader></UHeader> -->

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
