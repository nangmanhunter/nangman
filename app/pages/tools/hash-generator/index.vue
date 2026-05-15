<script setup>


const hashKey = ref('💻input-hash-origin-ex.abc123')
const hashValue = ref('')

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



hashValue.value= await generateSHA256(hashKey.value);


// // 2. 입력값(inputText)이 바뀔 때마다 자동으로 해시를 계산하는 watch 설정
watch(hashKey, async (newValue) => {
  hashValue.value = await generateSHA256(newValue)
})
</script>
<template>
  <UContainer class="py-8 max-w-3xl mx-auto">
    
    <UInput 
      v-model="hashKey"
      class="w-full"
      loading
      loading-icon="i-lucide-at-sign" 
      placeholder="Enter hash text" 
      size="md" 
    />
  
    <div class="mt-4 font-mono break-all p-3 bg-gray-50 dark:bg-gray-800 rounded">
      {{ hashValue }}
    </div>
  </UContainer>

  
</template>