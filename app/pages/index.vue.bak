<template>
  <div class="main-container">
    <header class="header">
      <h1 class="brand-title">
        nangman.org
      </h1>
      <p class="brand-subtitle">
        Pieces that make the world a little more beautiful
        세상을 조금 더 아름답게 만드는 조각들<br>
      </p>
    </header>

    <main class="grid-container">
      <a
        v-for="(service, index) in services"
        :key="index"
        :href="service.url"
        class="grid-card"
        target="_blank"
      >
        <div class="card-content">
          <span class="card-emoji">{{ service.emoji }}</span>
          <h2 class="card-title">{{ service.name }}</h2>
          <p class="card-desc">{{ service.description }}</p>
        </div>
        <div class="card-arrow">→</div>
      </a>
    </main>

    <footer class="footer">
      <p>© 2026 nangman.org. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 새로운 서비스가 생기면 이 배열에 한 줄만 추가하면 자동으로 블록이 늘어납니다.
const services = ref([
  {
    name: 'emoji.nangman.org',
    url: 'https://emoji.nangman.org',
    emoji: '✨',
    description: 'An emoji tool that captures emotion'
    // description: '감정을 담은 이모지 도구'
  }
  // {
  //   name: 'stats.nangman.org',
  //   url: '#',
  //   emoji: '📊',
  //   description: '정밀하고 깔끔한 통계 계산기'
  // },
  // {
  //   name: 'wedding.nangman.org',
  //   url: '#',
  //   emoji: '💌',
  //   description: '마음을 전하는 모바일 청첩장'
  // },
  // {
  //   name: 'board.nangman.org',
  //   url: '#',
  //   emoji: '🏛️',
  //   description: '생각을 나누는 메인 광장'
  // }
])
</script>

<style scoped>
/* 전체 페이지 초기화 및 폰트 설정 */
:global(body) {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  background-color: #f9fafb;
  /* 눈이 편안한 미색 배경 */
  color: #111827;
}

/* 전체 컨테이너: 화면 중앙 정렬 */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
}

/* 헤더 스타일 */
.header {
  text-align: center;
  margin-bottom: 4rem;
}

.brand-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.05em;
}

.brand-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  font-weight: 300;
  margin-top: 0.75rem;
}

/* 반응형 3x3 그리드 레이아웃 */
.grid-container {
  display: grid;
  grid-template-cols: repeat(1, minmax(0, 1fr));
  /* 모바일 기본 1열 */
  gap: 1.5rem;
  width: 100%;
  max-width: 56rem;
  /* 4xl 해상도 제한 */
}

/* 태블릿 (화면 너비 640px 이상) 일 때 2열 */
@media (min-width: 640px) {
  .grid-container {
    grid-template-cols: repeat(2, minmax(0, 1fr));
  }
}

/* PC (화면 너비 1024px 이상) 일 때 3열 */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-cols: repeat(3, minmax(0, 1fr));
  }
}

/* 카드 개별 스타일 */
.grid-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 마우스를 올렸을 때(Hover) 부드럽게 위로 들리는 낭만적인 효과 */
.grid-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: #e5e7eb;
}

.card-emoji {
  font-size: 1.875rem;
  display: block;
  margin-bottom: 0.75rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.grid-card:hover .card-emoji {
  opacity: 1;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
  transition: color 0.3s;
}

/* 마우스 올리면 타이틀 색상이 은은한 블루로 변경 */
.grid-card:hover .card-title {
  color: #4f46e5;
}

.card-desc {
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 300;
  margin: 0.25rem 0 0 0;
}

/* 화살표 스타일 */
.card-arrow {
  text-align: right;
  margin-top: 1rem;
  color: #d1d5db;
  transition: color 0.3s;
}

.grid-card:hover .card-arrow {
  color: #4f46e5;
}

/* 푸터 스타일 */
.footer {
  margin-top: auto;
  padding-top: 5rem;
  color: #9ca3af;
  font-size: 0.875rem;
  text-align: center;
}
</style>
