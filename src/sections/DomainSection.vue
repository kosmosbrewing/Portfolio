<script setup lang="ts">
/**
 * Technical Decisions — 비즈니스 가치 중심, 개행 분리로 가독성 확보.
 */
import { portfolio } from '@/data/portfolio';

const cards = portfolio.domain;
</script>

<template>
  <hr class="mx-auto mt-14 w-full max-w-[75rem] border-0 border-t border-ink-line" aria-hidden="true" />
  <div class="mt-10 reveal">
    <p class="eyebrow">Technical Decisions</p>
    <h3 class="mt-2 text-[18px] font-bold text-ink">커머스 도메인에서 마주친 세 가지 문제와 해결</h3>
  </div>

  <div class="mt-10">
    <article
      v-for="c in cards"
      :key="c.index"
      class="article-block reveal"
    >
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">Case {{ c.index }}</p>

        <div class="grid gap-3">
          <h4 class="text-[18px] font-semibold text-ink leading-snugger">
            {{ c.title }}
          </h4>
          <p class="text-[15px] leading-relaxed7 text-ink-body">
            {{ c.description }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>
