<!--
- npm install bcryptjs
-->
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

// 💡 해시값을 4개 부분으로 쪼개는 computed 속성
const parsedHash = computed(() => {
  const hash = hashValue.value

  // 정상적인 bcrypt 해시 길이(60글자)인지 확인
  if (!hash || hash.length !== 60 || hash === 'Error') {
    return { version: '-', cost: '-', salt: '-', checksum: '-' }
  }

  return {
    version: hash.substring(0, 4), // 0번째부터 4글자
    cost: hash.substring(4, 7), // 4번째부터 3글자
    salt: hash.substring(7, 29), // 7번째부터 22글자
    checksum: hash.substring(29, 60) // 29번째부터 31글자
  }
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

    <USeparator
      label="Bcrypt 구조 분석"
      color="primary"
      class="py-5"
    />

    <!-- 💡 4개로 쪼개서 보여주는 하단 박스 (Grid 레이아웃 적용) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- 버전 -->
      <div class="p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-900">
        <div class="text-xs text-blue-500 font-bold mb-1">
          버전 (4자)
        </div>
        <div class="font-mono font-bold text-lg text-blue-700 dark:text-blue-300 break-all">
          {{ parsedHash.version }}
        </div>
      </div>

      <!-- 비용인자 -->
      <div class="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-900">
        <div class="text-xs text-green-500 font-bold mb-1">
          비용인자 (3자)
        </div>
        <div class="font-mono font-bold text-lg text-green-700 dark:text-green-300 break-all">
          {{ parsedHash.cost }}
        </div>
      </div>

      <!-- 솔트 -->
      <div class="p-3 bg-amber-50 dark:bg-amber-950 rounded border border-amber-200 dark:border-amber-900">
        <div class="text-xs text-amber-500 font-bold mb-1">
          솔트 (22자)
        </div>
        <div class="font-mono text-sm text-amber-700 dark:text-amber-300 break-all">
          {{ parsedHash.salt }}
        </div>
      </div>

      <!-- 체크섬 -->
      <div class="p-3 bg-purple-50 dark:bg-purple-950 rounded border border-purple-200 dark:border-purple-900">
        <div class="text-xs text-purple-500 font-bold mb-1">
          체크섬 (31자)
        </div>
        <div class="font-mono text-sm text-purple-700 dark:text-purple-300 break-all">
          {{ parsedHash.checksum }}
        </div>
      </div>
    </div>
  </UContainer>
</template>
