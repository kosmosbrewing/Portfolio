<script setup lang="ts">
/**
 * CloudinaryImage — 통합 이미지 컴포넌트.
 *  - Cloudinary URL을 f_auto · q_auto · w_<px>로 자동 최적화 (이미 변환 파라미터가 있으면 건드리지 않음)
 *  - 1x / 2x srcset 생성
 *  - width + height 지정 시 aspect-ratio 기반 스켈레톤(pulse) 표시 → CLS 방지
 *  - 로드 완료 시 fade-in, 에러 시 fallback
 *
 * Props:
 *  - src       : 원본 Cloudinary URL (또는 일반 URL)
 *  - alt       : alt 텍스트
 *  - width     : 렌더링 폭(px). 최적화 파라미터로도 사용.
 *  - height    : 선택. 주면 aspect-ratio 예약 + 스켈레톤 활성화.
 *  - eager     : above-the-fold 이미지는 true로.
 *  - fade      : 기본 true. carousel처럼 외부에서 opacity를 관리하면 false로.
 */
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  src: string;
  alt: string;
  width: number;
  height?: number;
  eager?: boolean;
  fade?: boolean;
}>(), {
  eager: false,
  fade: true,
});

function optimize(url: string, w: number): string {
  if (!url.includes('res.cloudinary.com')) return url;
  const marker = '/image/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const rest = url.slice(idx + marker.length);
  const firstSegment = rest.split('/')[0] ?? '';
  // 이미 변환 파라미터가 있으면 건드리지 않음 (v123 버전 세그먼트가 아닌 경우 = 변환 있음)
  const hasTransforms = firstSegment.length > 0 && !firstSegment.startsWith('v');
  if (hasTransforms) return url;
  return url.slice(0, idx + marker.length) + `f_auto,q_auto,w_${w}/` + rest;
}

const src1x = computed(() => optimize(props.src, props.width));
const src2x = computed(() => optimize(props.src, props.width * 2));
const srcset = computed(() => `${src1x.value} 1x, ${src2x.value} 2x`);

// height 있을 때만 aspect-ratio 예약 → 스켈레톤 공간 확보
const wrapperStyle = computed(() =>
  props.height ? { aspectRatio: `${props.width} / ${props.height}` } : undefined,
);

const loaded = ref(false);
const errored = ref(false);

function onLoad() {
  loaded.value = true;
}
function onError() {
  errored.value = true;
  loaded.value = true;
}
</script>

<template>
  <span
    class="relative block w-full overflow-hidden bg-ink-surface"
    :style="wrapperStyle"
  >
    <!-- Skeleton pulse — height 있을 때 의미 있음 -->
    <span
      v-if="!loaded && height"
      aria-hidden="true"
      class="absolute inset-0 animate-pulse bg-ink-surface"
    />

    <img
      :src="src1x"
      :srcset="srcset"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      :width="width"
      :height="height"
      class="block w-full object-cover"
      :class="[
        height ? 'h-full' : 'h-auto',
        fade ? 'transition-opacity duration-500' : '',
        fade && !loaded ? 'opacity-0' : 'opacity-100',
      ]"
      @load="onLoad"
      @error="onError"
    />

    <!-- 에러 fallback -->
    <span
      v-if="errored"
      class="absolute inset-0 flex items-center justify-center text-[11px] text-ink-hint"
    >
      이미지를 불러올 수 없습니다
    </span>
  </span>
</template>
