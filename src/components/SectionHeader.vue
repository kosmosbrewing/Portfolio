<script setup lang="ts">
/**
 * SectionHeader — 미니멀 볼드 타이틀.
 * Why: 레퍼런스의 "Work Experience" 스타일 — 큰 번호/hairline 제거, 깔끔한 섹션 구분.
 */
defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="mb-10 reveal">
    <h2 class="text-[18px] font-bold text-ink">{{ title }}</h2>
    <slot />
  </header>
</template>
