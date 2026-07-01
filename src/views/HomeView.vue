<script setup lang="ts">
/**
 * HomeView — 라우트 컴포넌트. 섹션 나열 + reveal 초기화.
 * KO(/)와 EN(/en) 모두 이 컴포넌트를 재사용, 데이터는 useLocale/usePortfolio로 분기.
 * Why: reveal은 HomeView 마운트마다 새 요소 스캔이 필요하므로 App.vue가 아닌 여기서 실행.
 */
import HeroSection from '@/sections/HeroSection.vue';
import CareerSection from '@/sections/CareerSection.vue';
import ProjectSection from '@/sections/ProjectSection.vue';
import ContactSection from '@/sections/ContactSection.vue';
import { useReveal } from '@/composables/useReveal';

useReveal();
</script>

<template>
  <main id="main" class="relative">
    <HeroSection id="hero" />
    <CareerSection />
    <!-- Why: ProjectSection 루트가 fragment라 id는 컴포넌트 내부에서 직접 지정. -->
    <ProjectSection />
    <ContactSection id="contact" />
  </main>
</template>
