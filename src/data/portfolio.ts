/**
 * 포트폴리오 단일 데이터 소스
 * Why: 모든 콘텐츠 변경이 이 파일 하나만 수정하면 끝나도록 설계.
 *      섹션 컴포넌트는 표현(presentation)만, 데이터 변경은 여기서만.
 *
 * 데이터 검증 기준: 2026-04-19 PORTFOLIO_2.md (실제 코드 대조 검증)
 *  - FinOps: AWS Cost Explorer 월별 청구서 (Jan은 Route 53 1회성 비용 포함)
 *  - Performance: Lighthouse 실측 (모바일 Slow 4G)
 *  - Security/CI/CD: 실제 미들웨어/워크플로 코드 기반
 */

// ===========================================================================
// Types
// ===========================================================================

export interface Link {
  readonly label: string;
  readonly href: string;
  readonly handle?: string;
}

export interface HeroContent {
  readonly nameEn: string;
  readonly nameKo: string;
  readonly role: string;            // 이름 아래 한 줄 직책
  readonly bio: string;             // 1 단락 자기소개 (2-3 문장)
  readonly avatarSrc: string;       // Cloudinary URL — 비워두면 placeholder
  readonly avatarAlt: string;
  readonly links: readonly Link[];  // bio 아래 한 줄 — Site/LinkedIn/GitHub 등
}

export interface Metric {
  readonly value: string;
  readonly label: string;
}

/**
 * 결정 → 결과를 한 줄에 묶은 하이라이트.
 * Why: 활동(activities)과 성과(achievements)가 같은 사실을 두 번 말하던 중복을 제거.
 *      decision은 강조(semibold), outcome은 본문 톤 — 한 눈에 "무엇을 했고 그게 무엇을 만들었는가"가 보인다.
 */
export interface Highlight {
  readonly decision: string;
  readonly outcome: string;
}

export interface CareerProject {
  readonly index: string;
  readonly title: string;
  readonly period: string;
  readonly periodShort: string;     // "2022 - 2023" 형식 (타임라인 표시용)
  readonly role: string;            // 역할 한 줄 ("현업 PM (Technical Lead — ...)")
  readonly context: string;         // 프로젝트 한 줄 lede
  readonly description: string;     // 2-3줄 통합 설명 (메트릭+성과를 자연스럽게 포함)
  readonly metrics: readonly Metric[];
  readonly highlights: readonly Highlight[];  // 결정 → 결과 3개
  readonly footer: string;          // 규모 + 기여도 1줄
}

export interface InfoBlock {
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

export interface ProjectContent {
  readonly name: string;
  readonly tagline: string;
  readonly liveUrl: string;
  readonly info: readonly InfoBlock[];
  readonly diagramCode: string;     // Mermaid 소스 — MermaidDiagram 컴포넌트가 클라이언트에서 렌더
  readonly diagramAlt: string;
}

export interface DomainCard {
  readonly index: string;
  readonly title: string;
  /** 문제 → 해결 → 결과를 한 단락 내러티브로 압축한 설명. 추상 요약보다 실제 구축 경험의 목소리로. */
  readonly description: string;
}

export interface CostPoint {
  readonly month: string;
  readonly amount: string;
  readonly note?: string; // "Route 53 도메인 등록비 포함" / "MTD" 등 주석
}

/** Ops 카드 하단에 붙는 근거 이미지 (선택). 없으면 figure 렌더 생략. */
export interface OpsEvidence {
  readonly src: string;
  readonly alt: string;
  readonly source: string;
}

export interface FinOpsContent {
  readonly title: string;
  readonly subtitle: string;
  readonly headline: Metric;
  readonly levers: readonly { readonly key: string; readonly note: string }[];
  readonly journey: readonly CostPoint[];
  readonly disclosure: string;
  readonly evidence?: OpsEvidence;
}

export interface PerformanceContent {
  readonly title: string;
  readonly subtitle: string;
  readonly headline: Metric;
  readonly journey: readonly Metric[];
  readonly disclosure: string;
  readonly evidence?: OpsEvidence;
}

export interface CICDContent {
  readonly title: string;
  readonly subtitle: string;
  readonly headline: Metric;
  readonly pipeline: readonly string[];
  readonly evidence?: OpsEvidence;
}

export interface OpsContent {
  readonly finops: FinOpsContent;
  readonly performance: PerformanceContent;
  readonly cicd: CICDContent;
}

export interface ContactContent {
  readonly headline: string;
  readonly description: string;
  readonly email: string;
  readonly links: readonly Link[];
}

export interface Portfolio {
  readonly meta: {
    readonly siteUrl: string;
    readonly updatedAt: string;
  };
  readonly hero: HeroContent;
  readonly career: readonly CareerProject[];
  readonly project: ProjectContent;
  readonly domain: readonly DomainCard[];
  readonly ops: OpsContent;
  readonly contact: ContactContent;
}

// ===========================================================================
// Content
// ===========================================================================

export const portfolio: Portfolio = {
  meta: {
    siteUrl: 'https://portfolio.shakilabs.com',
    updatedAt: '2026-04-19',
  },

  hero: {
    // Why: 한국 채용 시장 타깃이라 한글이 H1, 영문은 보조 subtitle. proper case로 표기.
    nameEn: 'Lee Gyubin',
    nameKo: '이규빈',
    role: 'Technical Program Manager',
    // Why: 단락 한 개에 핵심 메트릭과 도메인을 농축. 길이는 ~120자 내외, 2 문장.
    bio: '금융권 미션 크리티컬 시스템 6년차 Technical Program Manager.\n일 700만+ 트랜잭션 API Gateway 신규 구축과 EAI 플랫폼 JDK LTS 업그레이드 무중단 이관을 Technical Lead로 주도했습니다.\n현재 AWS 기반 커머스 풀스택(ShakiShaki Archive)을 직접 구축·라이브 운영하며, 동일한 설계·운영 원칙을 커머스 도메인으로 확장 중입니다.',
    avatarSrc: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776603053/shakishaki/products/gh2chgbo6bftjnjopmrg.jpg',
    avatarAlt: 'Lee Gyubin — 금융권 Technical Program Manager 프로필 사진',
    // 첫 번째 링크가 자연스럽게 시각적 priority를 가짐 (라이브 서비스 권장)
    links: [
      { label: 'ShakiShaki Archive', href: 'https://shakishakiarchive.com', handle: 'shakishakiarchive.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EA%B7%9C%EB%B9%88-%EC%9D%B4-357b46119/', handle: 'linkedin.com/in/gyubin-lee' },
      { label: 'GitHub', href: 'https://github.com/kosmosbrewing', handle: 'github.com/kosmosbrewing' },
    ],
  },

  career: [
    {
      index: '01',
      title: 'API Gateway 신규 구축 PM',
      period: '2022.11 – 2023.08',
      periodShort: '2022.11 – 2023.08',
      role: '현업 PM · Technical Lead — 기획 · 보안검토 · 아키텍처 설계',
      context:
        '외부 ASP 의존 구조에서 자체 관리형 API Gateway 플랫폼으로 전환, 레거시 소켓 Flat 연계의 확장 병목 해소.',
      description:
        '외부 ASP 의존 구조에서 자체 관리형 API Gateway로 전환하여 일 700만+ 트랜잭션을 처리하는 플랫폼을 구축했습니다. 표준헤더의 여유 필드를 활용한 라우팅 설계로 레거시 아키텍처 변경 없이 Active-Active HA를 구성해 300+ TPS 무중단 운영을 달성했으며, 전자금융감독규정 기반 보안 아키텍처를 수립해 은행 내 API 표준 선례를 확립했습니다.',
      metrics: [
        { value: '700만+', label: '일 트랜잭션' },
        { value: '300+', label: 'Peak TPS · 무중단' },
        { value: 'HA', label: 'Active-Active' },
      ],
      highlights: [
        {
          decision: '표준헤더 여유 필드 활용 라우팅 설계 + Active-Active HA 구성',
          outcome: '레거시 아키텍처 무변경, JMeter로 300+ TPS 무중단 입증',
        },
        {
          decision: '외부 ASP → 자체 관리형 Gateway 전환 + REST/Flat-to-JSON 표준화',
          outcome: '벤더 종속성 해소, 일 700만+ 트랜잭션 운영 주도권 확보 + 신규 연계 온보딩 단축',
        },
        {
          decision: '전자금융감독규정 기반 보안성 검토 + 유관 4부서 의사결정 리드',
          outcome: '규제 준수 보안 아키텍처 수립, 은행 내 API 표준 선례 확립',
        },
      ],
      footer: '현업 2명 · 수행사 3명 · 유관 4부서 · 기여도 40% (은행 기준)',
    },
    {
      index: '02',
      title: 'EAI 연계 플랫폼 업그레이드 PM',
      period: '2024.11 – 2025.06',
      periodShort: '2024.11 – 2025.06',
      role: '단독 PM · Technical Lead — 기안 · 기획 · 보안검토 · 검증 · 산출물 관리',
      context:
        'JDK 1.6 EOL 환경의 핵심 EAI 시스템을 무중단 LTS 업그레이드로 기술 부채·보안 취약점 해소.',
      description:
        'JDK 1.6(EOL)로 장기간 기술부채가 누적된 핵심 EAI 시스템을 JDK 1.8 LTS + JEUS 8.5로 무중단 이관하여 벤더 기술 지원 체계를 확보했습니다. 온라인·배치 약 20개 거래 조합을 체크리스트 기반으로 검증해 장애 0건으로 이관 완료했으며, JEUS JMS Queue/Topic 메모리 누수는 벤더 지원 없이 자체 분석으로 원인 규명했습니다.',
      metrics: [
        { value: '20+', label: '거래 조합 무중단 검증' },
        { value: 'ZERO', label: '장애 이관' },
        { value: 'JDK 1.8', label: 'LTS 전환' },
      ],
      highlights: [
        {
          decision: '기술 부채·CVE 근거 마련으로 경영진 승인 획득',
          outcome: 'JDK 1.6(EOL) → 1.8 LTS · JEUS 6.0 → 8.5 업그레이드 추진',
        },
        {
          decision: '온라인(Async/Sync) + 배치(File2File/DB2DB) 경우의 수 조합 체크리스트로 영향도 검증',
          outcome: '약 20개 거래 조합 검증 완료, 무중단 이관 달성',
        },
        {
          decision: 'JEUS JMS Queue/Topic 메모리 누수 자체 분석·원인 규명',
          outcome: '벤더 의존 없이 Java Native 단 이슈 해소, 장애 대응 SLA 개선',
        },
      ],
      footer: '현업 2명 · 수행사 2명 · 유관 3부서 · 기여도 60% (은행 기준)',
    },
  ],

  project: {
    name: 'ShakiShaki Archive',
    tagline: '여성 빈티지 이커머스 플랫폼 · 1인 풀스택 개발 · 2025.10 – 2026.03 런칭',
    liveUrl: 'https://shakishakiarchive.com',
    diagramAlt: 'ShakiShaki Archive 시스템 아키텍처 — Client → CloudFront/S3 → API Gateway → VPC Link → ECS Fargate → RDS Multi-AZ',
    // Mermaid 소스 — DiagramViewer가 썸네일 + 확대 모달로 노출.
    diagramCode: `graph TB
    Client["Client"] --> CF

    subgraph AWS["AWS"]
      CF["CloudFront"] --> S3["S3 · Vue SPA"]
      CF -->|/api/*| APIGW["API Gateway"]
      APIGW --> CloudMap["Cloud Map"]
      CloudMap --> ECS["ECS Fargate"]
      ECS --> RDS[("PostgreSQL Multi-AZ")]
    end

    subgraph External["External"]
      Payment["Payment<br/>Toss · NaverPay · KakaoPay"]
      Auth["OAuth<br/>Naver · Kakao"]
      Ext["Cloudinary · Resend<br/>Meilisearch · GA4 · Telegram"]
    end

    ECS --> Payment
    ECS --> Auth
    ECS --> Ext

    style Client fill:#fff,stroke:#111,stroke-width:1.5px,color:#111
    style CF fill:#f5f5f4,stroke:#111,stroke-width:1.5px,color:#111
    style S3 fill:#f5f5f4,stroke:#111,stroke-width:1.5px,color:#111
    style APIGW fill:#f5f5f4,stroke:#111,stroke-width:1.5px,color:#111
    style CloudMap fill:#f5f5f4,stroke:#111,stroke-width:1.5px,color:#111
    style ECS fill:#2A2A2A,stroke:#2A2A2A,stroke-width:1.5px,color:#FBFBFA
    style RDS fill:#f5f5f4,stroke:#111,stroke-width:1.5px,color:#111
    style Payment fill:#fff,stroke:#111,stroke-width:1.5px,color:#111
    style Auth fill:#fff,stroke:#111,stroke-width:1.5px,color:#111
    style Ext fill:#fff,stroke:#111,stroke-width:1.5px,color:#111`,
    info: [
      { label: 'DOMAIN', title: 'E-Commerce', description: '여성 빈티지 · 일본 구제' },
      { label: 'STACK', title: 'Vue 3 + Node.js', description: 'TypeScript Strict · Drizzle · PostgreSQL' },
      { label: 'INFRA', title: 'AWS + Terraform', description: 'API Gateway · ECS Fargate · S3 · CloudFront · RDS' },
    ],
  },

  // -------------------------------------------------------------------------
  // Domain — 검증 완료 (PORTFOLIO_2.md 사례 1~3)
  // -------------------------------------------------------------------------
  domain: [
    {
      index: '01',
      title: 'Pre-rendering SEO',
      description:
        'Vue SPA 특성상 크롤러가 JS 실행 전 빈 페이지를 수집하는 구조에서 빌드 타임 프리렌더링으로 전환하여 상품 상세 페이지의 검색 노출 기반을 확보했습니다. JSON-LD 6종(Product · Organization 등)을 자동 생성해 구글 Rich Results 정상 노출과 SNS 공유 미리보기 정상화를 달성했으며, HTML 5분 / Assets 1년 캐시 전략으로 CDN 효율까지 확보했습니다.',
    },
    {
      index: '02',
      title: '재고 정합성 보장',
      description:
        '동시 주문·결제 실패·브라우저 종료 등 재고 정합성 붕괴 위험이 존재하는 환경에서 SELECT FOR UPDATE 행 잠금과 즉시 차감으로 초과 판매 가능성을 원천 차단했습니다. 복원은 사용자 직접 취소 · sendBeacon 기반 이탈 감지 · Cron 1분 주기 자동 정리 3가지 경로로 이중화하여 모든 이탈 상황에서 재고 정합성을 유지했으며, 1점 한정 빈티지 특성상 초과 판매는 곧 신뢰 손실이라는 판단 아래 수동 개입 없는 운영 체계를 확립했습니다.',
    },
    {
      index: '03',
      title: '환불 · 배송비 정책',
      description:
        '무료배송(7만원) 주문의 부분 취소 시 배송비 부담 주체와 페널티 중복 부과가 모호한 정책 공백을 배송 전/후 × 귀책 사유 기준 4가지 분기로 정리했습니다. 페널티 최대 1회 제한 플래그를 설계해 다중 부분 취소에도 배송비 페널티는 1회 누적만 부과되도록 구조화했으며, 판매자 귀책 시 고객 배송비 면제 로직까지 포함해 악용 방지와 고객 보호를 양립시켰습니다.',
    },
  ],

  // -------------------------------------------------------------------------
  // Ops — 검증 완료 (PORTFOLIO_2.md 사례 4·6)
  // -------------------------------------------------------------------------
  ops: {
    finops: {
      title: 'FinOps',
      subtitle: '월 인프라 비용 — 4개월 추이',
      headline: {
        value: '$53 → $29',
        label: 'Mar → Apr MTD · ALB → API Gateway 전환 후',
      },
      levers: [
        { key: 'GATEWAY', note: 'ALB → API Gateway HTTP v2 + VPC Link (주 절감 레버)' },
        { key: 'VPC', note: 'NAT Gateway → VPC Endpoint 전환' },
        { key: 'ECS', note: 'Fargate Spot 70% 혼합' },
        { key: 'RDS', note: 'db.t4g.micro + Graviton2' },
        { key: 'CDN', note: 'CloudFront 정적 캐시 (max-age 1년)' },
        { key: 'ECR', note: '이미지 Lifecycle Policy' },
      ],
      journey: [
        { month: '2026-01', amount: '$73', note: 'Route 53 도메인 등록비(1회성) 포함' },
        { month: '2026-02', amount: '$27' },
        { month: '2026-03', amount: '$29' },
        { month: '2026-04', amount: '$16', note: 'MTD · 04-19 기준 (월말 추정 ~$25)' },
      ],
      disclosure:
        'Source: AWS Cost Explorer (group by Service). Jan은 Route 53 도메인 1회성 비용 포함, Apr은 04-19 시점 MTD.',
      evidence: {
        src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776653440/shakishaki/products/cyu3ynezy2qtby1wgmxg.png',
        alt: 'AWS Cost Explorer 월별 비용 추이 그래프 — 2026년 1월 $73에서 4월 $16(MTD)으로 감소',
        source: 'AWS Cost Explorer (group by Service)',
      },
    },
    performance: {
      title: 'Performance',
      subtitle: 'Lighthouse 실측 — 모바일 Slow 4G',
      // Why: 점수보다 전송 크기 절감이 가장 인상적이고 정직한 헤드라인
      headline: { value: '−68%', label: '전송 크기 6.9MB → 2.2MB' },
      journey: [
        { value: '55 → 62', label: 'Lighthouse Performance' },
        { value: '31.8s → 10.6s', label: 'LCP  (−66.7%)' },
        { value: '14.7s → 4.7s', label: 'FCP  (−68.0%)' },
        { value: '2.65MB → 50KB', label: 'Hero 이미지  (−98.1%)' },
        { value: '726KB → 151KB', label: 'JS 번들  (−79.2%)' },
        { value: '0', label: 'CLS (완벽 유지)' },
      ],
      disclosure:
        'Source: Lighthouse CI · 로컬 개발 서버 기준. 프로덕션은 CDN 캐시 + brotli 적용으로 추가 개선 여지.',
    },
    cicd: {
      title: 'CI/CD',
      subtitle: 'GitHub Actions · Terraform · ECS Rolling',
      headline: { value: 'Zero', label: '다운타임 — 헬스체크 + 롤링 업데이트' },
      pipeline: [
        'Frontend — S3 sync + CloudFront 선택적 무효화 (6경로 vs. 전체)',
        'Backend — Docker 멀티스테이지(Alpine, 비루트 유저) → ECR push',
        'Backend — ECS Rolling Update + GET /api/health (30s 간격, 실패 3회 시 롤백)',
        'Backend — OIDC Role 인증 (Access Key 미사용)',
        'IaC — Terraform: API Gateway · VPC Link · Cloud Map · CloudWatch',
        '상태 관리 — S3 백엔드 + DynamoDB 잠금 (동시 apply 방지)',
      ],
    },
  },

  contact: {
    headline: '함께 일할 분과 이야기 나누고 싶습니다.',
    description:
      '커머스 도메인의 미션 크리티컬한 시스템을 만드는 자리에 관심이 많습니다. 메일 또는 LinkedIn으로 가볍게 연락 주세요.',
    email: 'skdba1313@gmail.com',
    links: [
      { label: 'Email', href: 'mailto:skdba1313@gmail.com', handle: 'skdba1313@gmail.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EA%B7%9C%EB%B9%88-%EC%9D%B4-357b46119/', handle: 'linkedin.com/in/gyubin-lee' },
      { label: 'GitHub', href: 'https://github.com/kosmosbrewing', handle: 'github.com/kosmosbrewing' },
    ],
  },
};
