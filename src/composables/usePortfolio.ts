import { computed, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { portfolio as portfolioKo, type Portfolio } from '@/data/portfolio';
import { portfolioEn } from '@/data/portfolio.en';

export type Locale = 'ko' | 'en';

/** 현재 로케일 — route.meta.locale이 없으면 KO 폴백. */
export function useLocale(): ComputedRef<Locale> {
  const route = useRoute();
  return computed<Locale>(() => (route.meta['locale'] === 'en' ? 'en' : 'ko'));
}

/** 로케일에 맞는 전체 포트폴리오 데이터. 템플릿에서 auto-unwrap. */
export function usePortfolio(): ComputedRef<Portfolio> {
  const locale = useLocale();
  return computed<Portfolio>(() => (locale.value === 'en' ? portfolioEn : portfolioKo));
}

// -----------------------------------------------------------------------------
// UI-level strings — portfolio 데이터에 없는 템플릿 하드코딩 문자열만 관리.
// Why: 섹션 컴포넌트 템플릿에 흩어진 한글/영문을 단일 사전으로 통합해
//      섹션 파일 편집 없이 로케일 확장/수정이 가능하도록 한다.
// -----------------------------------------------------------------------------
const dict = {
  ko: {
    skipToContent: '본문으로 건너뛰기',
    navWork: 'Work',
    navProject: 'Project',
    langToggleAria: '언어 전환',
    projectSubtitle: '여성 빈티지 이커머스 · 1인 풀스택 · 실결제 운영 중',
    decisionsSubtitle: '커머스 도메인에서 마주친 세 가지 문제와 해결',
    qualitySubtitle: '비용 · 성능 · 무중단 운영 지표',
    ariaPrevScreen: '이전 화면',
    ariaNextScreen: '다음 화면',
    ariaPrevImage: '이전 이미지',
    ariaNextImage: '다음 이미지',
    roleDiagramAlt: '직무 구성도',
    screenMain: '메인',
    screenLogin: '로그인',
    screenProductDetail: '상품 상세',
    screenCart: '장바구니',
    screenCheckout: '결제',
    screenAdmin: '관리자',
    screenMainAlt: '메인 화면',
    screenLoginAlt: '로그인 화면',
    screenProductDetailAlt: '상품 상세 화면',
    screenCartAlt: '장바구니 화면',
    screenCheckoutAlt: '결제 화면',
    screenAdminAlt: '관리자 화면',
    close: '닫기',
    ariaClose: '닫기',
    ariaDiagramZoom: '다이어그램 확대 보기',
    diagramLoading: '다이어그램 로딩 중…',
    diagramRenderFailed: '다이어그램 렌더 실패',
    imageLoadFailed: '이미지를 불러올 수 없습니다',
    avatarFallback: '프로필 사진\n업로드 예정',
  },
  en: {
    skipToContent: 'Skip to content',
    navWork: 'Work',
    navProject: 'Project',
    langToggleAria: 'Toggle language',
    projectSubtitle: "Women's vintage e-commerce · solo full-stack · live in production",
    decisionsSubtitle: 'Three problems encountered in the commerce domain — and how I solved them',
    qualitySubtitle: 'Cost · performance · zero-downtime operations',
    ariaPrevScreen: 'Previous screen',
    ariaNextScreen: 'Next screen',
    ariaPrevImage: 'Previous image',
    ariaNextImage: 'Next image',
    roleDiagramAlt: 'Role overview diagram',
    screenMain: 'Home',
    screenLogin: 'Sign in',
    screenProductDetail: 'Product',
    screenCart: 'Cart',
    screenCheckout: 'Checkout',
    screenAdmin: 'Admin',
    screenMainAlt: 'Home screen',
    screenLoginAlt: 'Sign in screen',
    screenProductDetailAlt: 'Product detail screen',
    screenCartAlt: 'Cart screen',
    screenCheckoutAlt: 'Checkout screen',
    screenAdminAlt: 'Admin screen',
    close: 'Close',
    ariaClose: 'Close',
    ariaDiagramZoom: 'Zoom into diagram',
    diagramLoading: 'Loading diagram…',
    diagramRenderFailed: 'Diagram render failed',
    imageLoadFailed: 'Image could not be loaded',
    avatarFallback: 'Profile photo\ncoming soon',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof dict)['ko'];

/** UI 하드코딩 문자열 접근자. `t('key')`가 현재 로케일 값을 반환. */
export function useT(): ComputedRef<(key: UIKey) => string> {
  const locale = useLocale();
  return computed(() => (key: UIKey) => dict[locale.value][key]);
}
