<script setup lang="ts">
/**
 * MermaidDiagram — Mermaid 라이브러리 lazy-load 렌더러.
 * Why: 600KB+ 라이브러리를 초기 번들에서 분리. 컴포넌트가 viewport 진입 직전 동적 import.
 *      사이트 톤(흑백 + Pretendard)에 맞춰 themeVariables 커스터마이징.
 */
import { ref, onMounted, onBeforeUnmount, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    code: string;
    /** true(기본): SVG를 부모 폭에 맞춤. false: minWidth 적용해 상세 뷰에 적합. */
    fitContainer?: boolean;
  }>(),
  { fitContainer: true },
);

const container = ref<HTMLDivElement | null>(null);
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle');
const errorMsg = ref<string>('');
const id = `mermaid-${useId().replace(/[^a-z0-9]/gi, '')}`;

let observer: IntersectionObserver | null = null;

async function renderDiagram() {
  if (!container.value || status.value === 'ready' || status.value === 'loading') return;
  status.value = 'loading';
  try {
    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',
      themeVariables: {
        fontFamily: 'Pretendard Variable, Pretendard, system-ui, sans-serif',
        fontSize: '18px',
        background: '#FBFBFA',
        primaryColor: '#FFFFFF',
        primaryTextColor: '#111111',
        primaryBorderColor: '#0A0A0A',
        secondaryColor: '#F2F1ED',
        tertiaryColor: '#FBFBFA',
        lineColor: '#525252',
        textColor: '#2A2A2A',
        clusterBkg: '#F7F6F2',
        clusterBorder: '#D8D5CE',
        edgeLabelBackground: '#FBFBFA',
        mainBkg: '#FFFFFF',
        nodeBorder: '#0A0A0A',
        nodeTextColor: '#111111',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        padding: 28,
        nodeSpacing: 80,
        rankSpacing: 110,
      },
    });

    const { svg } = await mermaid.render(id, props.code);
    if (container.value) {
      container.value.innerHTML = svg;
      const svgEl = container.value.querySelector('svg');
      if (svgEl) {
        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        svgEl.style.width = '100%';
        svgEl.style.height = 'auto';
        svgEl.style.display = 'block';
        if (!props.fitContainer) {
          // 상세 모드: 최소 폭 강제해 텍스트 가독성 우선
          svgEl.style.minWidth = '960px';
        }
      }
    }
    status.value = 'ready';
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : String(e);
    status.value = 'error';
  }
}

onMounted(() => {
  if (!container.value) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          renderDiagram();
          observer?.disconnect();
        }
      }
    },
    { rootMargin: '200px' },
  );
  observer.observe(container.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div ref="container" class="w-full" :class="fitContainer ? '' : 'overflow-x-auto'">
    <div
      v-if="status === 'idle' || status === 'loading'"
      class="flex h-[320px] items-center justify-center text-[12px] text-ink-hint"
    >
      다이어그램 로딩 중…
    </div>
    <div
      v-else-if="status === 'error'"
      class="flex h-[320px] items-center justify-center text-[12px] text-ink-muted"
    >
      다이어그램 렌더 실패 — {{ errorMsg }}
    </div>
  </div>
</template>
