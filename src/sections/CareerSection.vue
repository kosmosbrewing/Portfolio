<script setup lang="ts">
/**
 * CareerSection — 2컬럼 타임라인 레이아웃.
 */
import { ref } from 'vue';
import { portfolio } from '@/data/portfolio';
import ImageModal from '@/components/ImageModal.vue';
import CloudinaryImage from '@/components/CloudinaryImage.vue';

const career = portfolio.career;
const modalOpen = ref(false);
const archSrc = 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776602102/shakishaki/products/xlieiolctztatj7rofxl.png';
</script>

<template>
  <!-- Why: ImageModal을 fragment 형제로 둘 때 $attrs(id="career")가 section에 안 붙는다. 명시 지정. -->
  <section id="career" class="pt-4 pb-12">
    <!-- Why: h2 섹션 경계는 container보다 넓은 rule로 위계 표현 (content 810px vs rule 1200px). -->
    <hr class="mx-auto mb-10 w-full max-w-[75rem] border-0 border-t border-ink-line" aria-hidden="true" />
    <div class="container-read">
      <header class="mb-10 reveal">
        <h2 class="text-[18px] font-bold text-ink">Work Experience</h2>
      </header>

      <div>
        <article
          v-for="p in career"
          :key="p.index"
          class="article-block reveal"
        >
          <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
            <p class="text-[14px] text-ink-muted whitespace-nowrap">
              {{ p.periodShort }}
            </p>
            <div class="grid gap-3">
              <h3 class="text-[18px] font-semibold text-ink leading-snugger">
                {{ p.title }}
              </h3>
              <p class="text-[13px] text-ink-muted">{{ p.role }}</p>
              <p class="text-[15px] leading-relaxed7 text-ink-body">
                {{ p.description }}
              </p>
            </div>
          </div>
        </article>

        <!-- 직무 구성도 -->
        <article class="article-block reveal">
          <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
            <p class="text-[14px] text-ink-muted whitespace-nowrap">Architecture</p>
            <div class="media-frame media-frame-zoom" @click="modalOpen = true">
              <CloudinaryImage
                :src="archSrc"
                alt="직무 구성도"
                :width="1200"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <ImageModal
    :src="archSrc"
    alt="직무 구성도"
    :open="modalOpen"
    @close="modalOpen = false"
  />
</template>
