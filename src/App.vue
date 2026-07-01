<script setup lang="ts">
/**
 * App root — 헤더(로고·네비·언어 토글) + <router-view />.
 * 로케일 변경 시 <html lang>, document.title, meta description, canonical, hreflang 동기화.
 */
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useLocale, useT } from './composables/usePortfolio';

const route = useRoute();
const locale = useLocale();
const t = useT();

// 언어 토글 대상 로케일 + hash 보존
const altLocale = computed<'ko' | 'en'>(() => (locale.value === 'en' ? 'ko' : 'en'));
const altPath = computed(() => (altLocale.value === 'en' ? '/en' : '/'));
const altTarget = computed(() => ({ path: altPath.value, hash: route.hash || '' }));
const homePath = computed(() => (locale.value === 'en' ? '/en' : '/'));

// 로케일별 SEO 메타
const pageTitle = computed(() =>
  locale.value === 'en'
    ? 'Lee Gyubin · Technical Product Manager Portfolio'
    : '이규빈 · LEE GYUBIN — Technical Product Manager Portfolio',
);
const pageDescription = computed(() =>
  locale.value === 'en'
    ? 'Financial Channel & Integration Engineer with 6+ years in mission-critical banking systems. Greenfield API Gateway (7M+ daily transactions), EAI platform upgrade, and AWS full-stack commerce delivery.'
    : '금융권 미션 크리티컬 시스템 6년차 Financial Channel & Integration Engineer. 채널계(MCI)·대외계(FEP)·EAI·APIM 운영 경력. 일 700만+ 트랜잭션 API Gateway 구축 경험과 AWS 기반 커머스 풀스택 구축 사례.',
);
const canonicalUrl = computed(() =>
  locale.value === 'en' ? 'https://portfolio.shakilabs.com/en' : 'https://portfolio.shakilabs.com/',
);

/**
 * Why: SPA 전환 시 <html lang>·<title>·meta description·canonical·hreflang을 갱신해야
 *      검색엔진과 스크린리더가 정확한 로케일과 페이지를 인지한다.
 */
function upsertMeta(selector: string, factory: () => HTMLElement) {
  const existing = document.head.querySelector<HTMLElement>(selector);
  if (existing) return existing;
  const el = factory();
  document.head.appendChild(el);
  return el;
}

watchEffect(() => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale.value === 'en' ? 'en' : 'ko';
  document.title = pageTitle.value;

  const descEl = upsertMeta('meta[name="description"]', () => {
    const m = document.createElement('meta');
    m.name = 'description';
    return m;
  });
  descEl.setAttribute('content', pageDescription.value);

  const canonicalEl = upsertMeta('link[rel="canonical"]', () => {
    const l = document.createElement('link');
    l.rel = 'canonical';
    return l;
  });
  canonicalEl.setAttribute('href', canonicalUrl.value);

  const siteUrl = 'https://portfolio.shakilabs.com';
  const alternates = [
    { hreflang: 'ko', href: `${siteUrl}/` },
    { hreflang: 'en', href: `${siteUrl}/en` },
    { hreflang: 'x-default', href: `${siteUrl}/` },
  ];
  // 스코프 표식 data-hreflang-managed로 우리가 삽입한 것만 정리
  document.head
    .querySelectorAll('link[data-hreflang-managed="true"]')
    .forEach((el) => el.remove());
  for (const alt of alternates) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = alt.hreflang;
    link.href = alt.href;
    link.dataset['hreflangManaged'] = 'true';
    document.head.appendChild(link);
  }
});
</script>

<template>
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
  >
    {{ t('skipToContent') }}
  </a>

  <header
    data-print-hide
    class="w-full bg-paper"
  >
    <div class="container-read flex h-12 items-center justify-between text-[13px]">
      <router-link :to="homePath" class="font-medium tracking-tight text-ink hover:text-ink-muted">
        Lee Gyubin
      </router-link>
      <nav class="flex items-center gap-6" aria-label="Navigation">
        <!-- 같은 로케일 내부 앵커 이동 — 순수 hash로 브라우저 스크롤 위임 -->
        <a href="#career" class="text-ink-muted transition-colors hover:text-ink">
          {{ t('navWork') }}
        </a>
        <a href="#project" class="text-ink-muted transition-colors hover:text-ink">
          {{ t('navProject') }}
        </a>
        <!-- 언어 토글 — 반대 로케일로 이동, 현재 hash 유지 -->
        <router-link
          :to="altTarget"
          class="rounded border border-ink-line/70 px-2 py-0.5 text-[12px] font-medium tracking-wide text-ink-muted transition-colors hover:border-ink hover:text-ink"
          :aria-label="t('langToggleAria')"
        >
          {{ altLocale === 'en' ? 'EN' : 'KO' }}
        </router-link>
      </nav>
    </div>
  </header>

  <router-view />
</template>
