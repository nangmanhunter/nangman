<script setup>
// const myHash = ref('');

async function generateSHA256(text) {
  // 1. 문자열을 바이트 배열로 변환
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // 2. 브라우저 내장 Crypto API로 SHA-256 해시 생성
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  
  // 3. 해시된 바이트 배열을 16진수 문자열(Hex String)로 변환
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

// 사용 예시
const myHash = await generateSHA256("NangMan");
console.log(myHash); 
</script>
<template>

    {{ myHash }}
</template>