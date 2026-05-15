<script setup>
import { ref, watch } from 'vue' // watch가 빠져있었다면 추가
import bcrypt from 'bcryptjs'

const hashKey = ref('💻input-hash-origin-ex.abc123')
const hashValue = ref('')

async function generateBcrypt(text) {
  try {
    // 1. 솔트(Salt) 생성 (비용 인자: 10이 기본적이며 적당합니다)
    // bcryptjs는 동기/비동기를 둘 다 지원하지만, 브라우저가 멈추는 걸 막기 위해 비동기(Promise) 방식을 씁니다.
    const salt = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err)
        else resolve(salt)
      })
    })

    // 2. 입력된 텍스트와 솔트를 조합해 해시 생성
    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(text, salt, (err, hash) => {
        if (err) reject(err)
        else resolve(hash)
      })
    })

    return hash
  } catch (error) {
    console.error('Bcrypt 생성 실패:', error)
    return 'Error'
  }
}

// ⚠️ <script setup> 탑레벨 await는 컴포넌트가 <Suspense> 하위에 있을 때만 작동하므로,
// 안전하게 초기화를 함수로 감싸거나 온마운트 시점에 넣는 것이 좋습니다.
hashValue.value = await generateBcrypt(hashKey.value)

// 입력값이 바뀔 때마다 자동으로 bcrypt 해시를 계산
watch(hashKey, async (newValue) => {
  hashValue.value = await generateBcrypt(newValue)
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
  
    <ClipboardBox 
      class="mt-4 font-mono break-all p-3 bg-gray-50 dark:bg-gray-800 rounded"
      :code="hashValue" 
    />
  </UContainer>
</template>