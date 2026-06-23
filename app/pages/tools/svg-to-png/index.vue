<template>
  <div class="converter-container">
    <h3>1. 원본 SVG (화면에 있는 것)</h3>
    <div class="box">
      <svg
        ref="svgRef"
        width="200"
        height="200"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="royalblue"
        />
        <text
          x="50"
          y="55"
          font-size="12"
          fill="white"
          text-anchor="middle"
          font-family="Arial"
        >SVG</text>
      </svg>
    </div>

    <br>
    <button @click="convertAndDownload">
      PNG로 변환 후 다운로드
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// SVG 엘리먼트를 가리킬 ref 변수
const svgRef = ref(null)

const convertAndDownload = () => {
  const svgElement = svgRef.value

  if (!svgElement) {
    console.error('SVG를 찾을 수 없습니다.')
    return
  }

  // Nuxt SSR(서버사이드 렌더링) 환경에서 브라우저 전용 객체(window, Image) 에러 방지
  if (typeof window === 'undefined') return

  // 1. SVG 원본 크기 가져오기
  const width = svgElement.clientWidth || 200
  const height = svgElement.clientHeight || 200

  // 2. SVG를 문자열 텍스트로 변환
  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(svgElement)

  // 3. Blob 객체 및 가상 주소(URL) 생성
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const blobURL = URL.createObjectURL(svgBlob)

  // 4. 가상 이미지 객체 생성 및 소스 연결
  const image = new Image()
  image.src = blobURL

  // 5. 이미지가 브라우저 메모리에 로드 완료되면 실행
  image.onload = () => {
    // 6. 캔버스 도화지 생성 및 크기 맞추기
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')

    if (context) {
      // 7. 캔버스에 이미지 그리기
      context.drawImage(image, 0, 0, width, height)

      // 8. 캔버스 내용을 PNG 주소(Data URL)로 변환
      const pngDataUrl = canvas.toDataURL('image/png')

      // 9. 가상 링크 생성해서 다운로드 시키기
      const downloadLink = document.createElement('a')
      downloadLink.href = pngDataUrl
      downloadLink.download = 'nuxt_image.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }

    // 10. 사용 끝난 메모리(가상 주소) 해제
    URL.revokeObjectURL(blobURL)
  }

  image.onerror = (err) => {
    console.error('변환 실패:', err)
    URL.revokeObjectURL(blobURL)
  }
}
</script>

<style scoped>
.converter-container {
  font-family: sans-serif;
  padding: 20px;
}
.box {
  border: 1px dashed #ccc;
  padding: 20px;
  margin-bottom: 10px;
  display: inline-block;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background: #0056b3;
}
</style>
