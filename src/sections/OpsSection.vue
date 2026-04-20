<script setup lang="ts">
/**
 * Quality & Ops — 3개 카드(FinOps · Performance · CI/CD)가 공통 형식을 공유.
 * 구조:
 *   headline → description 2행(두괄식) → stack → source → evidences 이미지(여러 장 가능)
 * evidences가 2장 이상이면 carousel(TransitionGroup + fade), 1장이면 단일 figure.
 * 모달 확대 시 carousel 카드는 nav로 페이지 넘김 지원.
 */
import { computed, reactive, ref } from 'vue';
import { portfolio } from '@/data/portfolio';
import CloudinaryImage from '@/components/CloudinaryImage.vue';
import ImageModal from '@/components/ImageModal.vue';

const { finops, performance, cicd } = portfolio.ops;
const cards = [
  { label: 'FinOps', data: finops },
  { label: 'Performance', data: performance },
  { label: 'CI/CD', data: cicd },
] as const;

// 카드별 carousel 현재 인덱스
const carouselIndex = reactive<Record<string, number>>({
  FinOps: 0,
  Performance: 0,
  'CI/CD': 0,
});

function prevSlide(label: string, total: number) {
  carouselIndex[label] = (carouselIndex[label]! - 1 + total) % total;
}
function nextSlide(label: string, total: number) {
  carouselIndex[label] = (carouselIndex[label]! + 1) % total;
}

// Modal 상태 — 어느 카드의 몇 번째 이미지를 열었는지 기억
const modalOpen = ref(false);
const modalCardLabel = ref<string | null>(null);
const modalIdx = ref(0);

const modalCard = computed(() => cards.find((c) => c.label === modalCardLabel.value));
const modalImages = computed(() => modalCard.value?.data.evidences ?? []);
const activeModalImage = computed(() => modalImages.value[modalIdx.value] ?? null);
const modalHasNav = computed(() => modalImages.value.length > 1);

function openEvidence(cardLabel: string, imgIdx: number) {
  modalCardLabel.value = cardLabel;
  modalIdx.value = imgIdx;
  modalOpen.value = true;
}
function modalPrev() {
  if (!modalImages.value.length) return;
  modalIdx.value = (modalIdx.value - 1 + modalImages.value.length) % modalImages.value.length;
}
function modalNext() {
  if (!modalImages.value.length) return;
  modalIdx.value = (modalIdx.value + 1) % modalImages.value.length;
}
</script>

<template>
  <hr class="mx-auto mt-14 w-full max-w-[75rem] border-0 border-t border-ink-line" aria-hidden="true" />
  <div class="mt-10 reveal">
    <p class="eyebrow">Quality &amp; Ops</p>
    <h3 class="mt-2 text-[18px] font-bold text-ink">비용 · 성능 · 무중단 운영 지표</h3>
  </div>

  <div class="mt-10">
    <article
      v-for="card in cards"
      :key="card.label"
      class="article-block reveal"
    >
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">{{ card.label }}</p>

        <div class="grid gap-3">
          <h4 class="num text-[18px] font-semibold text-ink leading-snugger">
            {{ card.data.headline }}
          </h4>

          <p class="text-[15px] leading-relaxed7 text-ink-body">
            {{ card.data.description }}
          </p>

          <!-- 근거 이미지: 1장이면 단일 figure, 2장 이상이면 carousel -->
          <template v-if="card.data.evidences?.length">
            <!-- 단일 이미지 -->
            <figure
              v-if="card.data.evidences.length === 1"
              class="media-frame media-frame-zoom mt-2"
              @click="openEvidence(card.label, 0)"
            >
              <CloudinaryImage
                :src="card.data.evidences[0]!.src"
                :alt="card.data.evidences[0]!.alt"
                :width="1280"
                :height="800"
              />
            </figure>

            <!-- Carousel: Live Screens와 동일 패턴 -->
            <div v-else class="mt-2">
              <div class="media-frame media-frame-zoom group relative">
                <div class="ops-carousel-viewport">
                  <TransitionGroup name="fade">
                    <CloudinaryImage
                      v-for="(ev, idx) in card.data.evidences"
                      v-show="idx === carouselIndex[card.label]"
                      :key="ev.src"
                      :src="ev.src"
                      :alt="ev.alt"
                      :width="1280"
                      :fade="false"
                      class="ops-carousel-img"
                      :class="{ 'is-active': idx === carouselIndex[card.label] }"
                      @click="openEvidence(card.label, carouselIndex[card.label]!)"
                    />
                  </TransitionGroup>
                </div>

                <button
                  type="button"
                  @click.stop="prevSlide(card.label, card.data.evidences.length)"
                  class="carousel-nav left-3"
                  aria-label="이전 이미지"
                >&larr;</button>
                <button
                  type="button"
                  @click.stop="nextSlide(card.label, card.data.evidences.length)"
                  class="carousel-nav right-3"
                  aria-label="다음 이미지"
                >&rarr;</button>
              </div>

              <div class="mt-3 flex items-center justify-between text-[13px]">
                <p class="text-ink-muted">{{ card.data.evidences[carouselIndex[card.label]!]?.alt }}</p>
                <p class="text-ink-hint">{{ carouselIndex[card.label]! + 1 }} / {{ card.data.evidences.length }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </article>
  </div>

  <ImageModal
    v-if="activeModalImage"
    :src="activeModalImage.src"
    :alt="activeModalImage.alt"
    :open="modalOpen"
    :has-nav="modalHasNav"
    :label="activeModalImage.alt"
    :current="modalIdx"
    :total="modalImages.length"
    @close="modalOpen = false"
    @prev="modalPrev"
    @next="modalNext"
  />
</template>

<style scoped>
.ops-carousel-viewport {
  position: relative;
}

.ops-carousel-img {
  width: 100%;
  display: block;
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 400ms ease;
}
.ops-carousel-img.is-active {
  position: relative;
  opacity: 1;
}

/* TransitionGroup 기본 transition 비활성화 — fade는 CSS로 직접 제어 */
.fade-enter-active,
.fade-leave-active,
.fade-move {
  transition: none;
}
</style>
