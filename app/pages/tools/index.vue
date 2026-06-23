<script setup>
const route = useRoute() // route.path는 현재 주소(예: /tools)를 가져옵니다.
</script>

<template>
  <div>
    <NuxtLink :to="`${route.path}/bcrypt-generator`">bcrypt-generator</NuxtLink><br>
    <NuxtLink :to="`${route.path}/hash-generator`">hash-generator</NuxtLink><br>
  </div>
</template>
