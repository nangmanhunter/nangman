<template>
  <div class="dropzone-container">
    <h2>SVG 파일을 아래 박스에 던지세요!</h2>

    <div
      class="dropzone"
      :class="{ dragging: isDragging }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <div class="drop-message">
        <span class="icon">📥</span>
        <p>PNG로 바꿀 SVG 파일을 여기에 <br>드래그 앤 드롭 하세요!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDragging = ref(false) // 사용자가 파일을 끌어올리고 있는지 확인하는 상태 변수

// 1. 파일을 드롭존 위로 끌어왔을 때
const onDragOver = () => {
  isDragging.value = true
}

// 2. 파일을 드롭존 밖으로 나갔을 때
const onDragLeave = () => {
  isDragging.value = false
}

// 3. 파일을 드롭존에 떨어뜨렸을 때 (핵심 로직 실행)
const onDrop = (event) => {
  isDragging.value = false // 드래그 상태 초기화

  // 드롭된 파일 가져오기
  const file = event.dataTransfer?.files[0]

  // SVG 파일인지 확인 (아니면 즉시 종료)
  if (!file || file.type !== 'image/svg+xml') {
    alert('SVG 파일만 지원합니다!')
    return
  }

  // 4. 즉시 변환 및 다운로드 실행 (이전 handleInstantConvert 로직과 동일)
  convertAndDownload(file)
}

// ---------------------------------------------------------
// 백그라운드 변환 및 즉시 다운로드 유틸리티 함수
// ---------------------------------------------------------
const convertAndDownload = (file) => {
  // 다운로드 파일명 준비 (test.svg -> test.png)
  const saveName = file.name.replace(/\.svg$/i, '.png')

  const reader = new FileReader()
  reader.onload = (e) => {
    const svgText = e.target.result

    // 백그라운드에서 DOM 파싱 (화면에 안 그림)
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgText, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (!svgElement) {
      alert('올바른 SVG 파일이 아닙니다.')
      return
    }

    // SVG 크기 감지 (고화질을 위해 없으면 기본값 500)
    const width = parseInt(svgElement.getAttribute('width')) || svgElement.viewBox?.baseVal?.width || 500
    const height = parseInt(svgElement.getAttribute('height')) || svgElement.viewBox?.baseVal?.height || 500

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const blobURL = URL.createObjectURL(svgBlob)

    const image = new Image()
    image.src = blobURL

    image.onload = () => {
      // 캔버스 생성 및 드로잉
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')

      if (context) {
        context.drawImage(image, 0, 0, width, height)
        const pngDataUrl = canvas.toDataURL('image/png')

        // 즉시 다운로드 트리거
        const downloadLink = document.createElement('a')
        downloadLink.href = pngDataUrl
        downloadLink.download = saveName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }

      // 메모리 정리
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

/* 파일을 끌어올리고 있을 때의 스타일 (dragging 클래스 추가 시) */
.dropzone.dragging {
  border-color: #ff5722;
  background-color: #fff3e0;
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
  color: #e64a19;
}
</style>
