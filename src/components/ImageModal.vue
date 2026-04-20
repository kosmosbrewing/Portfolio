<script setup lang="ts">
/**
 * ImageModal — 이미지 풀스크린 확대 + 좌우 넘기기.
 * Why: 여러 섹션에서 이미지 확대가 필요하므로 공통 컴포넌트로 분리.
 */
import { watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  src: string;
  alt: string;
  open: boolean;
  hasNav?: boolean;
  label?: string;
  current?: number;
  total?: number;
}>();

const emit = defineEmits<{
  close: [];
  prev: [];
  next: [];
}>();

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    emit('close');
  }
  if (props.hasNav && e.key === 'ArrowLeft') {
    e.preventDefault();
    emit('prev');
  }
  if (props.hasNav && e.key === 'ArrowRight') {
    e.preventDefault();
    emit('next');
  }
}

watch(() => props.open, (isOpen) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  if (typeof document !== 'undefined') document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="alt"
        @click.self="emit('close')"
      >
        <!-- 닫기 -->
        <button
          type="button"
          @click="emit('close')"
          class="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-ink-line bg-paper px-4 py-2 text-[13px] font-medium text-ink shadow-lg transition-colors duration-200 ease-smooth hover:bg-white focus:outline-none focus:ring-2 focus:ring-ink md:right-6 md:top-6"
          aria-label="닫기"
        >
          <span>닫기</span>
          <kbd class="rounded border border-ink-line bg-ink-surface px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">ESC</kbd>
        </button>

        <!-- 이전 화살표 -->
        <button
          v-if="hasNav"
          type="button"
          @click.stop="emit('prev')"
          class="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 border border-ink-line text-ink shadow-lg hover:bg-white transition-colors md:left-6"
          aria-label="이전 화면"
        >
          &larr;
        </button>

        <!-- 이미지 -->
        <img
          :src="src"
          :alt="alt"
          class="max-h-[85vh] max-w-[85vw] rounded border border-ink-line shadow-2xl object-contain"
          @click.stop
        />

        <!-- 다음 화살표 -->
        <button
          v-if="hasNav"
          type="button"
          @click.stop="emit('next')"
          class="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 border border-ink-line text-ink shadow-lg hover:bg-white transition-colors md:right-6"
          aria-label="다음 화면"
        >
          &rarr;
        </button>

        <!-- 라벨 + 카운터 -->
        <div
          v-if="hasNav && label"
          class="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-paper/90 border border-ink-line px-4 py-1.5 text-[13px] text-ink shadow-lg md:bottom-6"
        >
          {{ label }} &middot; {{ (current ?? 0) + 1 }} / {{ total }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
