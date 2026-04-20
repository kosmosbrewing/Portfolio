<script setup lang="ts">
/**
 * DiagramViewer — 인라인 다이어그램 + 클릭 시 확대 모달.
 */
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import MermaidDiagram from './MermaidDiagram.vue';

defineProps<{
  code: string;
}>();

const open = ref(false);
const triggerRef = ref<HTMLButtonElement | null>(null);

function openModal() {
  open.value = true;
}

function closeModal() {
  open.value = false;
  requestAnimationFrame(() => triggerRef.value?.focus());
}

function onKeydown(e: KeyboardEvent) {
  if (open.value && e.key === 'Escape') {
    e.preventDefault();
    closeModal();
  }
}

watch(open, (isOpen) => {
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
  <div>
    <button
      ref="triggerRef"
      type="button"
      @click="openModal"
      class="media-frame media-frame-zoom w-full p-4 text-left"
      aria-label="다이어그램 확대 보기"
    >
      <MermaidDiagram :code="code" :fit-container="true" />
    </button>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="다이어그램 확대 보기"
        @click.self="closeModal"
      >
        <button
          type="button"
          @click="closeModal"
          class="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-ink-line bg-paper px-4 py-2 text-[13px] font-medium text-ink shadow-lg transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-ink md:right-6 md:top-6"
          aria-label="닫기"
        >
          <span>닫기</span>
          <kbd class="rounded border border-ink-line bg-ink-surface px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">ESC</kbd>
        </button>

        <div
          class="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded bg-paper p-6 shadow-2xl md:p-10"
          @click.stop
        >
          <MermaidDiagram :code="code" :fit-container="false" />
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
