/**
 * Portfolio data — English mirror of portfolio.ts.
 * Why: /en route consumes this file via usePortfolio(). Interface is shared;
 *      only string content is translated. Cloudinary URLs and Mermaid graph
 *      structure stay identical.
 */
import type { Portfolio } from './portfolio';

export const portfolioEn: Portfolio = {
  meta: {
    siteUrl: 'https://portfolio.shakilabs.com/en',
    updatedAt: '2026-04-21',
  },

  hero: {
    // Why: EN locale displays English name as H1; nameKo repurposed as the primary display string.
    nameEn: '이규빈',
    nameKo: 'Lee Gyubin',
    role: 'Technical Product Manager (TPM) · Financial Platforms',
    bio: 'Financial Channel & Integration Engineer with 6+ years in mission-critical banking systems.\nLed the greenfield build of an API Gateway handling 7M+ daily transactions and the zero-downtime JDK LTS upgrade of a core EAI platform as Technical Lead. Hands-on operations across MCI (channel systems), FEP (external-facing systems), EAI, and APIM — giving me a deep understanding of financial data flow and inter-system integration.\nCurrently building and operating an AWS-based full-stack commerce service (ShakiShaki Archive) in live production, extending the same design and operational principles into the commerce domain.',
    avatarSrc: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776603053/shakishaki/products/gh2chgbo6bftjnjopmrg.jpg',
    avatarAlt: 'Lee Gyubin — Financial Channel & Integration Engineer profile photo',
    links: [
      { label: 'ShakiShaki Archive', href: 'https://shakishakiarchive.com', handle: 'shakishakiarchive.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EA%B7%9C%EB%B9%88-%EC%9D%B4-357b46119/', handle: 'linkedin.com/in/gyubin-lee' },
      { label: 'GitHub', href: 'https://github.com/kosmosbrewing', handle: 'github.com/kosmosbrewing' },
    ],
  },

  career: [
    {
      index: '01',
      title: 'API Gateway — Greenfield Build (PM)',
      period: '2022.11 – 2023.08',
      periodShort: '2022.11 – 2023.08',
      role: 'Business PM · Technical Lead — planning · security review · architecture',
      context:
        'Replaced external ASP dependency with a self-managed API Gateway platform, removing the scaling bottleneck of legacy socket / Flat integrations.',
      description:
        'Migrated from an external ASP-dependent architecture to a self-managed API Gateway processing 7M+ daily transactions. Configured Active-Active HA by routing through spare fields in the standard header — no legacy architecture change required — and validated 300+ TPS with zero downtime under JMeter. Established a security architecture aligned with the Korean Electronic Financial Supervisory Regulations, setting the bank-wide API standard reference.',
      metrics: [
        { value: '7M+', label: 'Daily transactions' },
        { value: '300+', label: 'Peak TPS · zero downtime' },
        { value: 'HA', label: 'Active-Active' },
      ],
      highlights: [
        {
          decision: 'Header spare-field routing + Active-Active HA design',
          outcome: 'Zero legacy architecture change; 300+ TPS zero-downtime verified via JMeter',
        },
        {
          decision: 'External ASP → self-managed Gateway; REST / Flat-to-JSON standardization',
          outcome: 'Removed vendor lock-in; owned operations for 7M+ daily transactions; faster new-integration onboarding',
        },
        {
          decision: 'Security review under Electronic Financial Supervisory Regulations; led decisions across 4 stakeholder teams',
          outcome: 'Compliant security architecture established as the internal API standard',
        },
      ],
      footer: 'Business 2 · vendor 3 · 4 stakeholder teams · contribution 40% (bank basis)',
    },
    {
      index: '02',
      title: 'EAI Integration Platform Upgrade (PM)',
      period: '2024.11 – 2025.06',
      periodShort: '2024.11 – 2025.06',
      role: 'Sole PM · Technical Lead — proposal · planning · security · validation · deliverables',
      context:
        'Cleared long-accrued tech debt and CVE exposure by migrating a core EAI system off end-of-life JDK 1.6 with zero downtime.',
      description:
        'Migrated a core EAI system with long-accrued tech debt on JDK 1.6 (EOL) to JDK 1.8 LTS + JEUS 8.5 with zero downtime, restoring vendor support coverage. Verified ~20 online / batch transaction combinations against a checklist and completed the migration with zero incidents. Diagnosed a JEUS JMS Queue/Topic memory leak in-house — without vendor support — down to its Java-native root cause.',
      metrics: [
        { value: '20+', label: 'Transaction combos · zero-downtime verified' },
        { value: 'ZERO', label: 'Incident migration' },
        { value: 'JDK 1.8', label: 'LTS migration' },
      ],
      highlights: [
        {
          decision: 'Built the tech-debt / CVE case for executive approval',
          outcome: 'Approved upgrade path: JDK 1.6 (EOL) → 1.8 LTS · JEUS 6.0 → 8.5',
        },
        {
          decision: 'Impact analysis via checklist of online (Async/Sync) + batch (File2File/DB2DB) permutations',
          outcome: '~20 transaction combos verified; zero-downtime migration achieved',
        },
        {
          decision: 'Root-caused JEUS JMS Queue/Topic memory leak without vendor support',
          outcome: 'Resolved at the Java-native layer; improved incident-response SLA',
        },
      ],
      footer: 'Business 2 · vendor 2 · 3 stakeholder teams · contribution 60% (bank basis)',
    },
  ],

  project: {
    name: 'ShakiShaki Archive',
    tagline: "Women's vintage e-commerce platform · solo full-stack · launched 2025.10 – 2026.03",
    liveUrl: 'https://shakishakiarchive.com',
    diagramAlt:
      'ShakiShaki Archive system architecture — Client → CloudFront / S3 → API Gateway → VPC Link → ECS Fargate → RDS Multi-AZ',
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
      { label: 'DOMAIN', title: 'E-Commerce', description: "Women's vintage · Japanese pre-loved" },
      { label: 'STACK', title: 'Vue 3 + Node.js', description: 'TypeScript Strict · Drizzle · PostgreSQL' },
      { label: 'INFRA', title: 'AWS + Terraform', description: 'API Gateway · ECS Fargate · S3 · CloudFront · RDS' },
    ],
  },

  domain: [
    {
      index: '01',
      title: 'Restoring search visibility',
      description:
        'Addressed the SPA structural limitation — search engines and social apps failing to read product page content — with build-time prerendering and auto-generated structured data (JSON-LD). Restored the search-visibility foundation for product detail pages and normalized social share previews.',
    },
    {
      index: '02',
      title: 'Inventory consistency guarantee',
      description:
        'Eliminated inventory drift risk across every abandonment path — concurrent orders, payment failures, browser closures — by applying immediate reservation at order time and automatic restoration on abandonment. For 1-of-1 vintage inventory where overselling means trust loss, this replaces manual intervention with a self-healing consistency layer.',
    },
    {
      index: '03',
      title: 'Refund & shipping policy',
      description:
        'Closed the policy gap around partial cancellation of free-shipping orders by codifying rules on the basis of pre- / post-shipment and fault attribution. Capped penalties at once per order and waived customer shipping when the seller is at fault — balancing abuse prevention with customer protection.',
    },
  ],

  ops: {
    finops: {
      headline: '$29 / mo   (−45%)',
      description:
        'Switched ALB → API Gateway to convert hourly fixed billing to request-based, and eliminated public IPs via VPC Link private communication. Blended in 70% Fargate Spot to optimize compute unit cost, bringing monthly infra spend from $53 down to $29.',
      stack: 'ALB → API Gateway · VPC Link · Fargate Spot 70%',
      source: 'AWS Cost Explorer · 2026-03 – 04',
      evidences: [
        {
          src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776653440/shakishaki/products/cyu3ynezy2qtby1wgmxg.png',
          alt: 'AWS Cost Explorer monthly spend trend',
        },
      ],
    },
    performance: {
      headline: 'Lighthouse Performance 98 · SEO 100',
      description:
        'Achieved Performance 98, Accessibility 100, SEO 100 on Desktop. Even as an image-heavy commerce service, load quality stays stable without layout shift.',
      stack: 'Prerendering · WebP · Code Splitting · Lazy Loading · CloudFront cache',
      source: 'Lighthouse · 2026-04-20',
      evidences: [
        {
          src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776721640/shakishaki/products/p4uy8iicwghcvrpwkwl9.png',
          alt: 'Lighthouse Desktop report — Performance 98',
        },
        {
          src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776724291/shakishaki/products/irckfusdchkwiu8t4wbg.png',
          alt: 'Lighthouse Mobile report',
        },
      ],
    },
    cicd: {
      headline: '175 deploys · 0 downtime · ~2 min avg',
      description:
        'Delivered 175 deploys over 6 months with zero incidents, averaging under 2 minutes each. Deploy permissions run under least-privilege, with zero-downtime cutover triggered by health-check pass.',
      stack: 'GitHub Actions · Docker · ECS Rolling Update · OIDC · Terraform',
      source: 'GitHub Actions history · from 2025.10',
      evidences: [
        {
          src: 'https://res.cloudinary.com/diyuvt3qg/image/upload/v1776721609/shakishaki/products/lqm1wmj4oyhe2xp8jlva.jpg',
          alt: 'GitHub Actions deploy history — 175 deploys · 0 incidents',
        },
      ],
    },
  },

  contact: {
    headline: "I'd love to talk with people I can build with.",
    description:
      'Open to roles building mission-critical systems in the commerce domain. Feel free to reach out via email or LinkedIn.',
    email: 'skdba1313@gmail.com',
    links: [
      { label: 'Email', href: 'mailto:skdba1313@gmail.com', handle: 'skdba1313@gmail.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EA%B7%9C%EB%B9%88-%EC%9D%B4-357b46119/', handle: 'linkedin.com/in/gyubin-lee' },
      { label: 'GitHub', href: 'https://github.com/kosmosbrewing', handle: 'github.com/kosmosbrewing' },
    ],
  },
};
