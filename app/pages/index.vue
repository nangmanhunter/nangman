<template>
  <div
    class="main-container min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-between p-6 md:p-12 font-sans relative overflow-hidden select-none"
  >
    <div
      class="absolute w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[160px] top-[-10%] left-[-10%] pointer-events-none"
    />
    <div
      class="absolute w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] bottom-[-10%] right-[-10%] pointer-events-none"
    />
    <div
      class="absolute w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-[140px] top-[40%] left-[30%] pointer-events-none"
    />

    <header class="header text-center mt-12 md:mt-20 z-10 animate-fade-in">
      <h1
        class="brand-title text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-xl mb-4"
      >
        nangman.org
        <img
          src="/favicon.ico"
          alt="Nangman Favicon"
          class="w-10 h-10 md:w-14 md:h-14 object-contain inline-block select-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />
      </h1>
      <p
        class="brand-subtitle text-sm md:text-base font-light text-zinc-400 tracking-wide leading-relaxed max-w-md mx-auto"
      >
        Pieces that make the world a little more beautiful<br />
        <span class="text-xs text-zinc-500 mt-1 block"
          >세상을 조금 더 아름답게 만드는 조각들</span
        >
      </p>
    </header>

    <main class="grid-container w-full max-w-5xl my-16 z-10">
      <a
        v-for="(service, index) in services"
        :key="index"
        :href="service.url"
        class="group grid-card relative bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 p-8 rounded-3xl flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2"
        :style="{
          '--shadow-color': service.glowColor || 'rgba(99, 102, 241, 0.15)',
        }"
      >
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br"
          :class="service.bgGradient || 'from-indigo-500/10 to-transparent'"
        />

        <div class="flex justify-between items-start mb-10">
          <span
            class="card-emoji text-3xl p-3 bg-zinc-800/40 rounded-2xl border border-zinc-700/30 group-hover:scale-110 group-hover:bg-zinc-800/80 transition-all duration-500"
            :class="service.textGlow"
          >
            {{ service.emoji }}
          </span>
          <div
            class="card-arrow text-zinc-600 group-hover:text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>

        <div class="relative z-10">
          <h2
            class="card-title text-xl font-bold text-zinc-200 tracking-tight mb-2 group-hover:text-white transition-colors"
          >
            {{ service.name }}
          </h2>
          <p
            class="card-desc text-sm text-zinc-500 font-light leading-relaxed group-hover:text-zinc-300 transition-colors"
          >
            {{ service.description }}
          </p>
        </div>
      </a>
    </main>

    <footer class="footer mb-8 text-zinc-600 text-xs tracking-widest z-10">
      <p>© 2026 NANGMAN. ALL RIGHTS RESERVED.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 💡 각 서비스마다 고유의 '빛깔(Glow)'과 그라데이션을 부여해서 조각들의 개성을 살립니다.
const services = ref([
  {
    name: 'emoji.nangman.org',
    url: 'https://emoji.nangman.org/',
    emoji: '✨',
    description:
      'An emoji tool that captures emotion. 감정을 담아내는 이모지 오디세이.',
    glowColor: 'rgba(168, 85, 247, 0.2)', // purple-500 기반 네온
    bgGradient: 'from-purple-500/10 to-transparent',
    textGlow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
  },
  {
    name: 'svgtopng.nangman.org',
    url: 'https://images.nangman.org/svgtopng',
    emoji: '⚡',
    description:
      'The Gateway of SVG to PNG. 두 가지 매력의 문을 열고 마주하는 초고속 변환 허브.',
    // 🔥 핵심: 인디고(보라)와 에메랄드(녹색)가 반반 섞여 호버했을 때 오로라처럼 빛나는 네온 효과
    glowColor: 'rgba(99, 102, 241, 0.25)',
    bgGradient: 'from-indigo-500/10 via-emerald-500/5 to-transparent',
    textGlow: 'group-hover:shadow-[0_0_25px_rgba(52,211,153,0.3)]',
  },
  {
    name: 'bounceimg.nangman.org',
    url: 'https://images.nangman.org/bounce/svgtopng', // 나중에 실제 주소로 변경
    emoji: '🔮',
    description: 'Dynamic SVG to PNG Converter. 튕기듯 역동적인 포맷 컨버터.',
    glowColor: 'rgba(99, 102, 241, 0.2)', // indigo-500 기반 네온
    bgGradient: 'from-indigo-500/10 to-transparent',
    textGlow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]',
  },
  {
    name: 'cascadeimg.nangman.org',
    url: 'https://images.nangman.org/cascade/svgtopng', // 나중에 실제 주소로 변경
    emoji: '🌊',
    description: 'Instant SVG to PNG Stream. 폭포처럼 정갈하고 빠른 변환기.',
    glowColor: 'rgba(16, 185, 129, 0.15)', // emerald-500 기반 네온
    bgGradient: 'from-emerald-500/10 to-transparent',
    textGlow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
  },
  {
    name: 'ascii.nangman.org',
    url: 'https://images.nangman.org/ascii',
    emoji: '⊤', // 또는 🎨
    description:
      'Instant Image to ASCII Art. 텍스트로 그려내는 낭만적인 한 장.',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    bgGradient: 'from-emerald-500/10 to-transparent',
    textGlow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
  },
  {
    name: 'colors.nangman.org',
    url: 'https://colors.nangman.org/',
    emoji: '🎨', 
    description:
      'Beautiful Color Palette & Tools. 당신의 프로젝트에 낭만적인 색채를.',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    bgGradient: 'from-emerald-500/10 to-transparent',
    textGlow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
  },
  {
    name: 'bases.nangman.org',
    url: 'https://bases.nangman.org/',
    emoji: '🔢', 
    description:
      'Base your logic with romance. 진법 변환부터 수학·통계 연산까지.',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    bgGradient: 'from-emerald-500/10 to-transparent',
    textGlow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
  },
]);
</script>


<style scoped>
/* 반응형 그리드 시스템: 서비스가 늘어남에 따라 자연스럽게 정돈됨 */
.grid-container {
  display: grid;
  grid-template-cols: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .grid-container {
    grid-template-cols: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-cols: repeat(3, minmax(0, 1fr));
  }
}

/* 카드별 동적 네온 그림자 효과 추가 */
.grid-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 15px 30px -5px var(--shadow-color);
}

/* 상단 타이틀 페이드인 효과 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}
</style>
