<script setup lang="ts">
/**
 * ProjectSection — 단일 프로젝트(ShakiShaki Archive)를 h2 하나로 묶고
 * 하위 서브섹션(Technical Decisions · Quality & Ops · Evidence)을 h3로 병합.
 *
 * 상단 고정 article-block 4개 (Overview / Info / Architecture / Live Screens) 뒤에
 * 3개의 서브섹션 fragment(DomainSection / OpsSection / EvidenceSection)가 붙는다.
 * 모든 블록은 `140px | 1fr` 그리드로 좌측 레이블을 갖는다.
 */
import { ref, computed } from 'vue';
import { portfolio } from '@/data/portfolio';
import DiagramViewer from '@/components/DiagramViewer.vue';
import ImageModal from '@/components/ImageModal.vue';
import CloudinaryImage from '@/components/CloudinaryImage.vue';
import DomainSection from './DomainSection.vue';
import OpsSection from './OpsSection.vue';

const project = portfolio.project;

const screens = [
  { label: '메인', src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654161/shakishaki/products/efei9mmqrqeord1e9smb.jpg', alt: '메인 화면' },
  { label: '로그인', src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654193/shakishaki/products/zvg0s2m7lgurv1c4wn4c.png', alt: '로그인 화면' },
  { label: '상품 상세', src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654225/shakishaki/products/zwuzaczcoaaoy6ldx1jw.jpg', alt: '상품 상세 화면' },
  { label: '장바구니', src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654246/shakishaki/products/yqxjaggs5e3sfftpqc57.png', alt: '장바구니 화면' },
  { label: '결제', src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654265/shakishaki/products/cez199yqfusevleuttsy.png', alt: '결제 화면' },
  { label: '관리자', src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654299/shakishaki/products/laqmihvtcmh87in07rhq.png', alt: '관리자 화면' },
];

const currentIndex = ref(0);
const modalOpen = ref(false);

const currentScreen = computed(() => screens[currentIndex.value]!);

function prev() {
  currentIndex.value = (currentIndex.value - 1 + screens.length) % screens.length;
}
function next() {
  currentIndex.value = (currentIndex.value + 1) % screens.length;
}
</script>

<template>
  <!-- Why: ImageModal을 fragment 형제로 둘 때 $attrs(id="project")가 section에 안 붙는다. 명시 지정. -->
  <section id="project" class="pt-4 pb-12">
    <!-- h2 섹션 경계는 wider rule (1200px)로 위계 표현 -->
    <hr class="mx-auto mb-10 w-full max-w-[75rem] border-0 border-t border-ink-line" aria-hidden="true" />
    <div class="container-read">
      <header class="mb-10 reveal">
        <h2 class="text-[18px] font-bold text-ink">Personal Project</h2>
      </header>

      <!-- Overview + Info 통합 -->
      <article class="article-block reveal">
        <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
          <p class="text-[14px] text-ink-muted whitespace-nowrap">2025.10 – 2026.03</p>

          <!-- items-start: 이미지가 텍스트 높이만큼 stretch되어 빈 프레임 공간이 생기는 문제 방지 -->
          <div class="grid items-start gap-6 sm:grid-cols-[160px_1fr] sm:gap-8">
            <a
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="media-frame media-frame-link"
            >
              <CloudinaryImage
                src="https://res.cloudinary.com/diyuvt3qg/image/upload/w_1200,h_630,c_pad,b_white/v1772943726/shakishaki/products/mcc6wkapdzftcvhbvspz.png"
                alt="ShakiShaki Archive"
                :width="320"
                :height="168"
              />
            </a>
            <div class="grid gap-2 content-start">
              <h3 class="text-[18px] font-semibold text-ink leading-snugger">
                {{ project.name }}
              </h3>
              <p class="text-[14px] text-ink-muted">여성 빈티지 이커머스 · 1인 풀스택 · 실결제 운영 중</p>
              <p class="text-[13px] text-ink-body">Vue 3 · Node.js · TypeScript · Drizzle · PostgreSQL</p>
              <p class="text-[13px] text-ink-body">AWS (ECS · RDS · CloudFront) · GitHub Actions CI/CD</p>
            </div>
          </div>
        </div>
      </article>

      <!-- 3) Architecture — Mermaid diagram -->
      <article class="article-block reveal">
        <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
          <p class="text-[14px] text-ink-muted whitespace-nowrap">Architecture</p>
          <div>
            <DiagramViewer :code="project.diagramCode" :caption="project.diagramAlt" />
          </div>
        </div>
      </article>

      <!-- 4) Live Screens — crossfade carousel -->
      <article class="article-block reveal">
        <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
          <p class="text-[14px] text-ink-muted whitespace-nowrap">Live Screens</p>

          <div>
            <div class="media-frame media-frame-zoom group relative">
              <div class="carousel-viewport">
                <TransitionGroup name="fade">
                  <CloudinaryImage
                    v-for="(s, i) in screens"
                    v-show="i === currentIndex"
                    :key="s.src"
                    :src="s.src"
                    :alt="s.alt"
                    :width="1200"
                    :fade="false"
                    class="carousel-img"
                    :class="{ 'is-active': i === currentIndex }"
                    @click="modalOpen = true"
                  />
                </TransitionGroup>
              </div>

              <button
                type="button"
                @click="prev"
                class="carousel-nav left-3"
                aria-label="이전 화면"
              >&larr;</button>
              <button
                type="button"
                @click="next"
                class="carousel-nav right-3"
                aria-label="다음 화면"
              >&rarr;</button>
            </div>

            <div class="mt-3 flex items-center justify-between text-[13px]">
              <p class="text-ink-muted">{{ currentScreen.label }}</p>
              <p class="text-ink-hint">{{ currentIndex + 1 }} / {{ screens.length }}</p>
            </div>
          </div>
        </div>
      </article>

      <!-- 서브섹션들: h3로 병합된 depth. Evidence는 해체되어 Ops.FinOps 하단에 figure로 첨부. -->
      <DomainSection />
      <OpsSection />
    </div>
  </section>

  <ImageModal
    :src="currentScreen.src"
    :alt="currentScreen.alt"
    :open="modalOpen"
    :has-nav="true"
    :label="currentScreen.label"
    :current="currentIndex"
    :total="screens.length"
    @close="modalOpen = false"
    @prev="prev"
    @next="next"
  />
</template>

<style scoped>
.carousel-viewport {
  position: relative;
}

.carousel-img {
  width: 100%;
  display: block;
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 400ms ease;
}
.carousel-img.is-active {
  position: relative;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active,
.fade-move {
  transition: none;
}
</style>
