# AGENTS.md — Portfolio

## 프로젝트 개요
- 한 줄: 개인 포트폴리오 SPA — Vue 3 + Vite + Tailwind 정적 사이트
- 스택: Vue 3 (Composition API) / TypeScript / vue-router / Tailwind CSS / Mermaid
- 백엔드 없음 — 순수 프론트엔드, 정적 배포

## 실행 명령어
```bash
npm run dev        # 개발 서버 (Vite)
npm run build      # vue-tsc 타입체크 + vite build → dist/
npm run preview    # 빌드 결과 미리보기 (:4173)
npm run typecheck  # vue-tsc --noEmit
```

## 디렉토리 맵 (상위 1단계)
```
src/           # App.vue, main.ts, router.ts + components/ composables/ data/ sections/ views/
public/        # favicon.svg, robots.txt, sitemap.xml
dist/          # 빌드 산출물 — 직접 수정 금지
vercel.json    # 배포 설정 (SPA rewrite, 캐시·보안 헤더)
```

## 배포
- Vercel Git 연동 배포 — package.json에 별도 deploy 스크립트 없음, push 시 자동 빌드
- `vercel.json`에 SPA rewrite(`/(.*) → /`), 정적 자산 immutable 캐시,
  보안 헤더(nosniff, X-Frame-Options, Referrer-Policy 등) 정의됨 — 라우트 추가 시 수정 불필요

## 주의사항
1. 커밋 전 `npm run build` 통과 확인 (build가 vue-tsc 타입체크 포함)
2. 페이지(라우트) 추가 시 `public/sitemap.xml` 갱신 — SEO 자산
3. 보안 헤더·캐시 정책 변경은 `vercel.json`에서만 수행
