<!--
- bounceimg.nangman.org/svgtopng
-->
<template>
  <div class="fast-converter-container">
    <h2>{{ uiText.title }}</h2>

    <label
      for="fast-svg-file"
      class="instant-btn"
    >
      {{ uiText.button }}
    </label>
    <input
      id="fast-svg-file"
      type="file"
      accept=".svg"
      multiple
      @change="handleInstantConvert"
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 💡 1. 기본 언어 셋을 글로벌 표준인 영어(en)로 기본 설정
const uiText = ref({
  title: 'Convert SVG to PNG Instantly (Multiple Files)',
  button: 'Select SVG Files'
})

// 💡 2. 브라우저 환경에서 한국어(ko) 환경을 감지하면 한글로 교체
onMounted(() => {
  if (typeof window !== 'undefined') {
    const userLanguage = navigator.language || navigator.userLanguage

    if (userLanguage.startsWith('ko')) {
      uiText.value = {
        title: 'SVG 파일 선택 즉시 PNG로 저장 (다중 선택 가능!)',
        button: 'SVG 파일들 선택하기 (여러 개 한방에!)'
      }
    }
  }
})

const handleInstantConvert = (event) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  Array.from(files).forEach((file) => {
    if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
      convertAndDownloadSingleFile(file)
    } else {
      console.warn(`${file.name}은 SVG 파일이 아닙니다.`)
    }
  })

  event.target.value = ''
}

const convertAndDownloadSingleFile = (file) => {
  const saveName = file.name.replace(/\.svg$/i, '.png')
  const reader = new FileReader()

  reader.onload = (e) => {
    const svgText = e.target.result

    const parser = new DOMParser()
    const doc = parser.parseFromString(svgText, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (!svgElement) return

    const width = parseInt(svgElement.getAttribute('width')) || svgElement.viewBox?.baseVal?.width || 500
    const height = parseInt(svgElement.getAttribute('height')) || svgElement.viewBox?.baseVal?.height || 500

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const blobURL = URL.createObjectURL(svgBlob)

    const image = new Image()
    image.src = blobURL

    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')

      if (context) {
        context.drawImage(image, 0, 0, width, height)
        const pngDataUrl = canvas.toDataURL('image/png')

        const downloadLink = document.createElement('a')
        downloadLink.href = pngDataUrl
        downloadLink.download = saveName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }

      URL.revokeObjectURL(blobURL)
    }
  }

  reader.readAsText(file)
}
</script>

<style scoped>
.fast-converter-container {
  font-family: sans-serif;
  padding: 40px;
  text-align: center;
}
input[type="file"] {
  display: none;
}
.instant-btn {
  display: inline-block;
  padding: 15px 30px;
  background: #ff5722;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: background 0.2s;
}
.instant-btn:hover {
  background: #e64a19;
}
</style>
