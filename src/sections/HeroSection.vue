<script setup lang="ts">
/**
 * HeroSection — 레퍼런스 매칭: 원형 아바타(좌) + 이름/직함/링크/바이오(우) 수평 배치.
 */
import { portfolio } from '@/data/portfolio';
import CloudinaryImage from '@/components/CloudinaryImage.vue';

const hero = portfolio.hero;
</script>

<template>
  <section
    class="relative pb-12 pt-8 md:pt-10 print:break-after-page"
    aria-labelledby="hero-name"
  >
    <div class="container-read">
      <div class="reveal">
        <!-- 아바타(좌) + 텍스트 스택(우) 수평 배치 -->
        <div class="grid items-start gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
          <!-- Avatar — eager로 above-the-fold 로드 -->
          <figure
            class="aspect-square w-28 shrink-0 overflow-hidden rounded-full border border-ink-line/70 bg-ink-surface sm:w-32"
          >
            <CloudinaryImage
              v-if="hero.avatarSrc"
              :src="hero.avatarSrc"
              :alt="hero.avatarAlt"
              :width="128"
              :height="128"
              eager
            />
            <div v-else class="flex h-full w-full items-center justify-center text-center text-[11px] text-ink-hint">
              프로필 사진<br />업로드 예정
            </div>
          </figure>

          <!-- Identity stack: 이름 → 직함 → 링크 → bio -->
          <div class="grid gap-3">
            <h1
              id="hero-name"
              class="text-balance text-[32px] font-bold leading-[1.1] tracking-tighter2 text-ink sm:text-[36px] md:text-[40px]"
            >
              {{ hero.nameKo }}
            </h1>
            <p class="text-[15px] text-ink-muted">
              {{ hero.role }}
            </p>
            <p class="mt-2 max-w-prose text-pretty text-[15px] leading-relaxed7 text-ink-body whitespace-pre-line">{{ hero.bio }}</p>
            <!-- LinkedIn · GitHub · shakishakiarchive.com 일렬 -->
            <p class="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-ink-muted">
              <a href="https://www.linkedin.com/in/%EA%B7%9C%EB%B9%88-%EC%9D%B4-357b46119/" target="_blank" rel="noopener" class="link">
                LinkedIn<span aria-hidden="true" class="link-arrow ml-0.5">↗</span>
              </a>
              <a href="https://github.com/kosmosbrewing" target="_blank" rel="noopener" class="link">
                GitHub<span aria-hidden="true" class="link-arrow ml-0.5">↗</span>
              </a>
              <a href="https://shakishakiarchive.com" target="_blank" rel="noopener" class="link">
                shakishakiarchive.com<span aria-hidden="true" class="link-arrow ml-0.5">↗</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
