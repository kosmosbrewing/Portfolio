<script setup lang="ts">
/**
 * ProjectSection — 단일 프로젝트(ShakiShaki Archive)를 h2 하나로 묶고
 * 하위 서브섹션(Technical Decisions · Quality & Ops)을 h3로 병합.
 *
 * 상단 고정 article-block 3개 (Overview / Architecture / Live Screens) 뒤에
 * 2개의 서브섹션 fragment(DomainSection / OpsSection)가 붙는다.
 */
import { ref, computed } from 'vue';
import DiagramViewer from '@/components/DiagramViewer.vue';
import ImageModal from '@/components/ImageModal.vue';
import CloudinaryImage from '@/components/CloudinaryImage.vue';
import DomainSection from './DomainSection.vue';
import OpsSection from './OpsSection.vue';
import { usePortfolio, useT } from '@/composables/usePortfolio';

const portfolio = usePortfolio();
const t = useT();
const project = computed(() => portfolio.value.project);

/**
 * Why: 스크린 URL은 로케일 무관 상수. label/alt만 t()로 로케일 분기.
 */
const screens = computed(() => [
  { label: t.value('screenMain'), src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1782875994/shakishaki/products/m7wlft677uxmdji05prm.jpg', alt: t.value('screenMainAlt') },
  { label: t.value('screenLogin'), src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654193/shakishaki/products/zvg0s2m7lgurv1c4wn4c.png', alt: t.value('screenLoginAlt') },
  { label: t.value('screenProductDetail'), src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654225/shakishaki/products/zwuzaczcoaaoy6ldx1jw.jpg', alt: t.value('screenProductDetailAlt') },
  { label: t.value('screenCart'), src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654246/shakishaki/products/yqxjaggs5e3sfftpqc57.png', alt: t.value('screenCartAlt') },
  { label: t.value('screenCheckout'), src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654265/shakishaki/products/cez199yqfusevleuttsy.png', alt: t.value('screenCheckoutAlt') },
  { label: t.value('screenAdmin'), src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776654299/shakishaki/products/laqmihvtcmh87in07rhq.png', alt: t.value('screenAdminAlt') },
]);

const currentIndex = ref(0);
const modalOpen = ref(false);

const currentScreen = computed(() => screens.value[currentIndex.value]!);

function prev() {
  currentIndex.value = (currentIndex.value - 1 + screens.value.length) % screens.value.length;
}
function next() {
  currentIndex.value = (currentIndex.value + 1) % screens.value.length;
}
</script>

<template>
  <!-- Why: ImageModal을 fragment 형제로 둘 때 $attrs(id="project")가 section에 안 붙는다. 명시 지정. -->
  <section id="project" class="pt-4 pb-12">
    <!-- h2 섹션 경계는 wider rule (1200px)로 위계 표현 -->
    <hr class="mx-auto mb-10 w-full max-w-[75rem] border-0 border-t border-ink-line" aria-hidden="true" />
    <div class="container-read">
      <header class="mb-10 reveal">
        <h2 class="text-[18px] font-bold text-ink">Product Case Study</h2>
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
                src="https://res.cloudinary.com/diyuvt3qg/image/upload/w_1200,h_630,c_pad,b_white/v1780209629/shakishaki/products/uuwj2tqmx6c7x4wsn6r5.png"
                alt="ShakiShaki Archive"
                :width="320"
                :height="168"
              />
            </a>
            <div class="grid gap-2 content-start">
              <h3 class="text-[18px] font-semibold text-ink leading-snugger">
                {{ project.name }}
              </h3>
              <p class="text-[14px] text-ink-muted">{{ t('projectSubtitle') }}</p>
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
                :aria-label="t('ariaPrevScreen')"
              >&larr;</button>
              <button
                type="button"
                @click="next"
                class="carousel-nav right-3"
                :aria-label="t('ariaNextScreen')"
              >&rarr;</button>
            </div>

            <div class="mt-3 flex items-center justify-between text-[13px]">
              <p class="text-ink-muted">{{ currentScreen.label }}</p>
              <p class="text-ink-hint">{{ currentIndex + 1 }} / {{ screens.length }}</p>
            </div>
          </div>
        </div>
      </article>

      <!-- 서브섹션들: h3로 병합된 depth. -->
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
