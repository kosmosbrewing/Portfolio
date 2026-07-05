# ShakiShaki Archive — 포트폴리오 백데이터

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | ShakiShaki Archive (샤키샤키 아카이브) |
| **유형** | 빈티지 의류 이커머스 플랫폼 |
| **개발 인원** | 1인 풀스택 개발 |
| **개발 기간** | — |
| **상태** | 프로덕션 운영 중 |
| **목표** | 보안·안정성·속도를 모두 갖춘 MVP 이커머스 런칭 |

---

## 2. 기술 스택

### Frontend
| 레이어 | 기술 | 버전 | 선택 이유 |
|--------|------|------|-----------|
| Framework | Vue 3 (Composition API + Script Setup) | 3.5.12 | 낮은 러닝커브, 공식 TS 지원 |
| Language | TypeScript | 5.4.5 | 런타임 에러 방지, 타입 안전성 |
| State | Pinia | 3.0.4 | Vue 3 공식 상태관리 |
| Routing | Vue Router | 4.6.3 | 네비게이션 가드, 메타 기반 라우팅 |
| Styling | Tailwind CSS | 3.4.4 | 빠른 프로토타이핑, 번들 최적화 |
| UI | Radix Vue + shadcn/vue | 1.9.7 | 접근성, 타입 안전, 재사용 |
| Form | VeeValidate + Zod | 4.13.2 | 타입 안전 폼 검증 |
| HTTP | Axios | 1.13.2 | 인터셉터, 크리덴셜 핸들링 |
| Build | Vite | 5.3.1 | Webpack 대비 10배 빠른 빌드 |
| IaC | Terraform | — | 인프라 코드화 (API GW, VPC Link) |

### Backend
| 레이어 | 기술 | 버전 | 선택 이유 |
|--------|------|------|-----------|
| Runtime | Node.js | 20 LTS | 안정성, 장기 지원 |
| Framework | Express.js | 4.21.2 | 경량, 모듈식 라우팅 |
| Language | TypeScript | 5.6.3 | 100% 타입 안전, `any` 제로 |
| ORM | Drizzle ORM | 0.39.1 | 타입 안전, SQL-like API |
| Database | PostgreSQL | 16 | ACID, 복합 쿼리, RDS 관리형 |
| Validation | Zod | 3.24.2 | 런타임 스키마 검증 |
| Auth | express-session + connect-pg-simple | — | 서버 제어, CSRF 안전, DB 세션 |
| Security | Helmet + express-rate-limit | 8.1.0 / 8.2.1 | OWASP 대응 |
| Email | Resend | 6.6.0 | 트랜잭셔널 이메일 |
| Search | Meilisearch | 0.54.0 | 풀텍스트 제품 검색 |
| Build | esbuild | 0.25.0 | 프로덕션 번들링 |
| Scheduler | node-cron | 4.2.1 | 백그라운드 작업 (자동 구매확정) |

### Infra / DevOps
| 항목 | 기술 |
|------|------|
| 컨테이너 | Docker (멀티스테이지 빌드) |
| 호스팅 (FE) | AWS S3 + CloudFront |
| 호스팅 (BE) | AWS ECS Fargate (오토스케일링 1~10) |
| DB | AWS RDS PostgreSQL (Multi-AZ) |
| 네트워크 | API Gateway + VPC Link + Cloud Map |
| CI/CD | GitHub Actions (45초 배포) |
| IaC | Terraform |
| 모니터링 | CloudWatch + Telegram Alert |
| 이미지 CDN | Cloudinary |

---

## 3. 핵심 기능

### 쇼핑 기능
- 카테고리·검색 기반 상품 탐색 (Meilisearch 풀텍스트)
- 상품 상세: 사이즈 실측, 다중 이미지, 재고 실시간 확인
- **재고 소프트락 시스템** (3분 TTL, Race Condition 방지)
- 장바구니 (비회원 + 회원 자동 병합)
- 위시리스트

### 결제 시스템 (3개 PG 통합)
- **토스페이먼츠**: PC iframe / 모바일 리다이렉트
- **네이버페이**: PC 팝업 / 모바일 앱 (v1 결제형 + v2 주문형)
- **카카오페이**: Ready → Confirm 플로우
- 결제 실패 시 자동 환불·재고 복원
- 부분 취소·부분 환불 지원

### 인증 / 사용자
- 이메일 회원가입 (6자리 인증코드, TTL)
- 소셜 로그인: 네이버, 카카오 OAuth 2.0
- 비밀번호 재설정 (이메일 링크)
- 다중 배송지 관리
- 프로필 관리

### 주문 관리
- 주문 상태 추적: `pending_payment → paid → preparing → shipped → delivered → purchase_confirmed`
- 주문 취소·환불 플로우 (PG별 API 호출)
- 반품 신청·처리 시스템
- 부분 반품·부분 환불 계산
- 배송 추적 연동
- **자동 구매확정**: 배송완료 7일 후 cron job 자동 처리

### 관리자 패널
- 상품 CRUD (Cloudinary 이미지 업로드)
- 카테고리 관리
- 주문 상태·배송 관리
- 1:1 문의 관리
- 사이트 이미지 관리
- 회원 관리·권한 부여
- GA4 애널리틱스 대시보드

---

## 4. 아키텍처 다이어그램

```
[사용자 브라우저]
      ↓ HTTPS
[CloudFront CDN] ─── S3 (Vue SPA, 정적 자산)
      ↓
[API Gateway (HTTP/2)]
      ↓ VPC Link
[ALB (Sticky Session)]
      ↓
[ECS Fargate] ← 오토스케일링 (CPU 70%, Memory 80%)
  ├─ Express.js API Server
  ├─ Session Store → [RDS PostgreSQL]
  ├─ Image Upload → [Cloudinary CDN]
  ├─ Email → [Resend]
  ├─ Search → [Meilisearch]
  ├─ Payment → [Toss / NaverPay / KakaoPay]
  ├─ OAuth → [Naver / Kakao]
  ├─ Analytics → [GA4]
  └─ Alert → [Telegram]
```

---

## 5. 주요 기술적 챌린지 & 해결

### Challenge 1: N+1 쿼리 최적화
| 항목 | Before | After |
|------|--------|-------|
| 쿼리 수 (주문 10건) | 11회 | 1회 |
| 응답 시간 | 300ms | 90ms |
| 개선율 | — | **70% 감소** |

**문제**: 주문 목록 조회 시 주문별 상품 정보를 개별 쿼리로 가져옴
**해결**: Drizzle ORM `findMany({ with: { ... } })` JOIN 패턴으로 단일 쿼리 변환

### Challenge 2: 재고 Race Condition 방지
**문제**: 동시 주문 시 재고 초과 판매 가능성
**해결**: 소프트락 시스템 (3분 TTL) + `SELECT FOR UPDATE SKIP LOCKED` 트랜잭션 격리
**결과**: 동시 주문에서도 재고 무결성 100% 보장

### Challenge 3: 모바일 결제 UX
**문제**: 결제 완료 후 뒤로가기 시 PG 페이지로 복귀
**해결**: `window.location.replace()`로 히스토리 스택 교체
**결과**: 매끄러운 결제 후 UX

### Challenge 4: 네이버페이 모바일 404
**문제**: 모바일 네이버페이 콜백 시 상대경로 → "page not found"
**해결**: `window.location.origin` + 절대경로 변환
**결과**: 모바일 네이버페이 정상 동작

### Challenge 5: 주문번호 유일성 보장
**문제**: 동일 밀리초 + 랜덤 충돌 가능성
**해결**: `YYYYMMdd_SHAKI_HHmmss_XXXX` 포맷 (36^4 = 167만 조합/초) + DB UNIQUE 제약
**결과**: 충돌 확률 0.006% + DB 안전장치

### Challenge 6: UUID → Base62 압축 (네이버페이 연동)
**문제**: 네이버페이 상품ID 30자 제한, UUID = 36자
**해결**: UUID → BigInt → Base62 인코딩 (22자)
**결과**: 네이버페이 API 스펙 준수

### Challenge 7: 비회원 → 회원 장바구니 병합
**문제**: 비회원 장바구니 로그인 시 유실
**해결**: localStorage 저장 → 로그인 시 API 통해 자동 병합
**결과**: 전환율 보호

---

## 6. 보안 구현 (OWASP Top 10 대응)

| 취약점 | 대응 방법 |
|--------|----------|
| SQL Injection | Drizzle ORM 파라미터화 쿼리, 문자열 보간 없음 |
| XSS | Helmet CSP, httpOnly 쿠키, Vue 자동 이스케이프 |
| CSRF | 세션 기반 인증 + SameSite 쿠키 |
| 인증 취약점 | bcrypt 10라운드, 세션 검증, 비밀번호 복잡도 강제 |
| 민감 데이터 노출 | HTTPS 강제, PII 마스킹 (로그), 환경변수 관리 |
| 접근 제어 | isAdmin 미들웨어, userId 격리 쿼리, 라우트 가드 |
| 보안 설정 오류 | Helmet (CSP, HSTS, X-Frame-Options), CORS 화이트리스트 |
| 역직렬화 | JSON only, Zod 스키마 검증 |

### Rate Limiting 전략
| 리미터 | 제한 | 대상 |
|--------|------|------|
| Global | 1000req / 15min | 전체 엔드포인트 |
| Auth | 15req / 15min | 로그인, 회원가입, 비밀번호 |
| Email | 3req / 5min | 인증 이메일 발송 |
| Payment | 10req / 1min | 결제 확인·취소 |
| Admin | 300req / 5min | 관리자 API |

---

## 7. 성능 지표

### Lighthouse (Frontend)
| 항목 | 점수 |
|------|------|
| Performance | **62**/100 |

> LCP 31.8s → 10.6s (67% 개선), 전송 크기 6.9MB → 2.2MB (68% 감소) 등 지속 최적화 중

### API 성능
| 지표 | 값 |
|------|-----|
| API 응답 시간 (p95) | **90ms** (최적화 후) |
| 번들 크기 (gzip) | **156 KB** |
| 배포 소요 시간 | **45초** (GitHub Actions) |
| 인증 캐시 히트율 | **95%+** |
| 인프라 비용 (10K PV) | **~$25/월** |

---

## 8. 코드 품질 & 설계 패턴

### 아키텍처 패턴
| 패턴 | 적용 위치 |
|------|----------|
| **Storage Layer Pattern** | `IStorage` 인터페이스 + `DatabaseStorage` 구현체 분리 |
| **Composable Pattern** | Vue 3 비즈니스 로직 재사용 (useCart, useOrders 등) |
| **Async Route Wrapper** | 전역 에러 핸들링 (try-catch 남발 방지) |
| **SAVEPOINT Isolation** | 트랜잭션 내 개별 항목 에러 격리 |
| **PG-Agnostic Abstraction** | 결제 서비스 인터페이스 통합 (Toss/NaverPay/KakaoPay) |
| **Centralized Message** | 모든 API 응답 메시지 중앙 관리 |

### 코드 규모
| 항목 | 수치 |
|------|------|
| Frontend 의존성 | 30+ packages |
| Backend 의존성 | 46 packages (prod) + 20 (dev) |
| DB 테이블 | 17개 |
| API 엔드포인트 | 145개 |
| 라우트 파일 | 34개 (admin/ 포함) |
| 서비스 파일 | 10개 |
| 외부 서비스 연동 | 8개 |
| 문서 | 8개 (아키텍처, 챌린지, DevOps, 보안 등) |

### 코드 원칙
- **파일당 200줄 이내** 지향 (모듈화)
- **TypeScript Strict Mode** (any 타입 제로)
- **Zod 검증**: 모든 사용자 입력
- **전역 에러 핸들러**: Express 미들웨어 일괄 처리
- **PII 마스킹**: 로그에 이메일·전화·주소 마스킹

---

## 9. 외부 서비스 연동 요약

| 서비스 | 용도 | 구현 |
|--------|------|------|
| **Toss Payments** | 메인 결제 (PC/모바일) | confirm/cancel API, 웹훅 |
| **NaverPay** | 네이버 결제 (v1 결제형 + v2 주문형) | OAuth callback, 상품연동 API |
| **KakaoPay** | 카카오 결제 | Ready → Confirm 플로우 |
| **Naver OAuth** | 네이버 소셜 로그인 | openid-client, 프로필 연동 |
| **Kakao OAuth** | 카카오 소셜 로그인 | openid-client, 프로필 연동 |
| **Cloudinary** | 이미지 업로드·최적화·CDN | 자동 변환, 반응형 이미지 |
| **Resend** | 트랜잭셔널 이메일 | 주문확인, 배송알림, 비밀번호 리셋 |
| **Meilisearch** | 풀텍스트 상품 검색 | 오타 허용, 패싯 필터 |
| **Daum Postcode** | 주소 검색 | 배송지 입력 자동완성 |
| **GA4** | 웹 분석 | 서비스 계정, 관리자 대시보드 |
| **Telegram** | 시스템 에러 알림 | 500+ 에러 실시간 알림 |

---

## 10. DevOps & 배포 파이프라인

### Frontend 배포
```
GitHub Push → GitHub Actions → npm run build → S3 Sync → CloudFront 캐시 무효화
총 소요: 45초
```

### Backend 배포
```
Docker 이미지 빌드 → ECR Push → ECS Fargate 태스크 업데이트 → 헬스체크 → 롤링 배포
무중단 배포: ALB 드레인 (최대 300초)
```

### 스케일링 정책
| 항목 | 값 |
|------|-----|
| 최소 컨테이너 | 1 |
| 최대 컨테이너 | 10 |
| CPU 임계치 | 70% |
| Memory 임계치 | 80% |
| 헬스체크 간격 | 15초 |
| RDS | Multi-AZ, 100GB SSD, 7일 백업 |

---

## 11. 프로젝트 디렉토리 구조

### Frontend (`ShakiShakiArchive/`)
```
src/
├── pages/           # 페이지 컴포넌트 (auth, product, order, cart, admin, static)
├── components/      # 재사용 컴포넌트 (ui/, common/, admin/)
├── composables/     # 비즈니스 로직 (useCart, useOrders, useProduct 등 13개)
├── stores/          # Pinia 전역 상태 (auth, cart, product, wishlist 등 7개)
├── lib/             # API 클라이언트(52KB+), 캐시, 포매터, 유효성검증, 분석
├── services/        # 외부 연동 (payment, socialAuth, addressSearch)
├── router/          # 34개 라우트, 네비게이션 가드
├── types/           # TypeScript 타입 (110+ 정의)
└── assets/          # WebP 최적화 이미지, 커서 애니메이션
```

### Backend (`ShakiShakiArchiveBackend/`)
```
server/
├── routes/          # API 라우트 핸들러 (34개 파일, admin/ 포함)
├── services/        # 외부 서비스 연동 (10개: Toss, NaverPay, KakaoPay, Email 등)
├── middleware/      # Express 미들웨어 (auth, error, logger, cache, etag)
├── config/          # 환경설정 (cors, session, security, cloudinary)
├── utils/           # 유틸리티 (logger, password, shortId, masking 등 11개)
├── jobs/            # 스케줄 작업 (자동 구매확정, 주문 정리)
├── storage.ts       # IStorage 인터페이스 + DatabaseStorage (3,369줄)
└── db.ts            # Drizzle ORM + PostgreSQL Pool
shared/
├── schema.ts        # DB 스키마 + Zod 검증 + TS 타입 (1,100+ 줄)
└── constants/       # 메시지, 일회용 이메일 차단 목록
```

---

## 12. 포트폴리오 어필 포인트 (한 줄 요약)

1. **1인 풀스택**: 기획·설계·프론트·백엔드·인프라·배포까지 전 과정 단독 수행
2. **프로덕션 운영**: 실제 서비스 운영 중, 실사용자 대상 결제·배송 처리
3. **3개 PG 통합**: 토스페이먼츠·네이버페이(v1+v2)·카카오페이 멀티 결제 구현
4. **OWASP Top 10 대응**: 보안을 타협하지 않는 설계 (Rate Limiting, Helmet, Zod, bcrypt)
5. **성능 최적화**: API 응답 90ms(p95), 번들 156KB(gzip), LCP 67% 개선
6. **N+1 최적화**: 쿼리 11회→1회, 응답 300ms→90ms (70% 개선)
7. **재고 Race Condition 해결**: 소프트락 + DB 트랜잭션 격리로 무결성 보장
8. **인프라 자동화**: Terraform IaC, GitHub Actions CI/CD, 45초 무중단 배포
9. **비용 효율**: 월 ~$25로 10K PV 처리 가능한 서버리스 아키텍처
10. **100% TypeScript**: 프론트·백엔드 모두 strict mode, `any` 타입 제로

---

## 13. 기술 키워드 태그

```
Vue 3, Composition API, TypeScript, Pinia, Vue Router, Tailwind CSS,
shadcn/vue, Radix Vue, Vite, Axios, VeeValidate, Zod,
Express.js, Node.js, Drizzle ORM, PostgreSQL,
Toss Payments, NaverPay, KakaoPay,
OAuth 2.0, Session Auth, bcrypt, Helmet, CORS, Rate Limiting,
AWS S3, CloudFront, ECS Fargate, RDS, API Gateway, VPC Link,
Docker, GitHub Actions, Terraform,
Cloudinary, Resend, Meilisearch, GA4, Telegram,
OWASP Top 10, REST API, CI/CD, IaC
```
