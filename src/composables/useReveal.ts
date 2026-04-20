/**
 * 가벼운 reveal-on-scroll.
 * Why: 큰 라이브러리 없이 자연스러운 페이드. 모션 선호도 OS 설정 존중.
 *      반드시 콘텐츠가 보이도록 안전장치 — IO 실패해도 fallback timeout이 모두 표시.
 */
import { onMounted, onBeforeUnmount } from 'vue';

export function useReveal(selector = '.reveal') {
  let observer: IntersectionObserver | null = null;
  let safetyTimer: ReturnType<typeof setTimeout> | null = null;

  onMounted(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));

    // Arm only when we have JS + IO ready. CSS ignores fades unless this attribute exists.
    root.dataset['revealArmed'] = 'true';

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    els.forEach((el) => {
      // 이미 화면 안에 있는 요소는 즉시 표시 (IO async 발화 대기 없이)
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) el.classList.add('is-visible');
      observer?.observe(el);
    });

    // 안전장치: 1.5초 안에 모든 reveal에 is-visible 강제 부여 — IO 미발화 케이스 보호
    safetyTimer = setTimeout(() => {
      els.forEach((el) => el.classList.add('is-visible'));
    }, 1500);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    if (safetyTimer) clearTimeout(safetyTimer);
  });
}
