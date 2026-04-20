<script setup lang="ts">
/**
 * Technical Decisions — 도메인 특성과 결과 중심으로 추상화.
 */
import { portfolio } from '@/data/portfolio';

const cards = portfolio.domain;
</script>

<template>
  <div class="mt-14 reveal">
    <p class="eyebrow">Technical Decisions</p>
    <h3 class="mt-2 text-[18px] font-bold text-ink">세 가지 결정으로 SPA의 한계 해소</h3>
  </div>

  <div class="mt-10">
    <article
      v-for="c in cards"
      :key="c.index"
      class="article-block reveal"
    >
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">Case {{ c.index }}</p>

        <div class="grid gap-2">
          <h4 class="text-[18px] font-semibold text-ink leading-snugger">
            {{ c.title }}
          </h4>
          <p class="text-[14px] leading-relaxed7 text-ink-body">
            {{ c.problem }} → {{ c.solution }}
          </p>
          <p class="text-[13px] text-ink-muted">{{ c.summary }}</p>
        </div>
      </div>
    </article>
  </div>
</template>
