<template>
  <div class="fast-converter-container">
    <h2>SVG 파일 선택 즉시 PNG로 저장</h2>

    <label
      for="fast-svg-file"
      class="instant-btn"
    >
      SVG 파일 선택하기 (누르면 바로 변환/다운로드)
    </label>
    <input
      id="fast-svg-file"
      type="file"
      accept=".svg"
      @change="handleInstantConvert"
    >
  </div>
</template>

<script setup>
const handleInstantConvert = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 다운로드할 때 사용할 파일명 미리 세팅 (test.svg -> test.png)
  const saveName = file.name.replace(/\.svg$/i, '.png')

  // 1. 파일을 텍스트로 읽기
  const reader = new FileReader()
  reader.onload = (e) => {
    const svgText = e.target.result

    // 2. 가상의 DOM 컴포넌트를 메모리상에 생성 (화면에 안 띄움)
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgText, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (!svgElement) {
      alert('올바른 SVG 파일이 아닙니다.')
      return
    }

    // 3. SVG의 크기 계산 (고화질을 위해 없으면 기본값 500)
    const width = parseInt(svgElement.getAttribute('width')) || svgElement.viewBox?.baseVal?.width || 500
    const height = parseInt(svgElement.getAttribute('height')) || svgElement.viewBox?.baseVal?.height || 500

    // 4. SVG 문자열을 이미지 주소(Blob)로 변환
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const blobURL = URL.createObjectURL(svgBlob)

    // 5. 메모리 속에서 가상 이미지 로드
    const image = new Image()
    image.src = blobURL

    image.onload = () => {
      // 6. 백그라운드 캔버스 생성
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')

      if (context) {
        // 7. 캔버스에 그리고 PNG 추출
        context.drawImage(image, 0, 0, width, height)
        const pngDataUrl = canvas.toDataURL('image/png')

        // 8. 즉시 다운로드 실행
        const downloadLink = document.createElement('a')
        downloadLink.href = pngDataUrl
        downloadLink.download = saveName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }

      // 메모리 정리
      URL.revokeObjectURL(blobURL)

      // 다음 변환을 위해 인풋 값 초기화
      event.target.value = ''
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
