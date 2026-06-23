<template>
  <div class="dropzone-container">
    <h2>SVG 파일들을 아래 박스에 한방에 던지세요!</h2>

    <div
      class="dropzone"
      :class="{ dragging: isDragging }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <div class="drop-message">
        <span class="icon">📥</span>
        <p>여러 개의 SVG 파일을 한 번에 <br>드래그 앤 드롭 하세요!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDragging = ref(false)

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

// 1. 파일을 드롭했을 때 처리하는 부분 (업그레이드)
const onDrop = (event) => {
  isDragging.value = false

  // 던져진 파일 '목록' 전체를 가져옵니다.
  const files = event.dataTransfer?.files
  if (!files || files.length === 0) return

  // 복수 파일 처리를 위해 배열로 변환 후, 하나씩 변환 함수로 던집니다.
  Array.from(files).forEach((file) => {
    // SVG 파일이 맞는지만 체크하고 통과 시 바로 변환
    if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
      convertAndDownload(file)
    } else {
      console.warn(`${file.name}은 SVG 파일이 아니라서 제외되었습니다.`)
    }
  })
}

// 2. 개별 파일을 받아 백그라운드에서 구워내는 변환 함수
const convertAndDownload = (file) => {
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
.dropzone-container {
  font-family: sans-serif;
  padding: 40px;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 250px;
  margin: 0 auto;
  border: 4px dashed #ced4da;
  border-radius: 20px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.dropzone.dragging {
  border-color: #007bff;
  background-color: #e3f2fd;
}

.drop-message {
  color: #6c757d;
  font-weight: bold;
}

.drop-message .icon {
  font-size: 60px;
  display: block;
  margin-bottom: 10px;
}

.dropzone.dragging .drop-message {
  color: #007bff;
}
</style>
