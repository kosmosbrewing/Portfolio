<script setup lang="ts">
import HeroSection from './sections/HeroSection.vue';
import CareerSection from './sections/CareerSection.vue';
import ProjectSection from './sections/ProjectSection.vue';
import ContactSection from './sections/ContactSection.vue';
import { useReveal } from './composables/useReveal';

useReveal();
</script>

<template>
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
  >
    본문으로 건너뛰기
  </a>

  <header
    data-print-hide
    class="w-full bg-paper"
  >
    <div class="container-read flex h-12 items-center justify-between text-[13px]">
      <a href="#hero" class="font-medium tracking-tight text-ink hover:text-ink-muted">
        Lee Gyubin
      </a>
      <nav class="flex gap-6" aria-label="Navigation">
        <a href="#career" class="text-ink-muted transition-colors hover:text-ink">
          Work
        </a>
        <a href="#project" class="text-ink-muted transition-colors hover:text-ink">
          Project
        </a>
      </nav>
    </div>
  </header>

  <main id="main" class="relative">
    <HeroSection id="hero" />
    <CareerSection />
    <!-- Why: ProjectSection 루트가 fragment라 id는 컴포넌트 내부에서 직접 지정.
         Technical Decisions · Quality & Ops · Evidence는 ProjectSection 내부 서브섹션으로 병합되어 있다. -->
    <ProjectSection />
    <ContactSection id="contact" />
  </main>

</template>
