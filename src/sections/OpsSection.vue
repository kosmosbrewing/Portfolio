<script setup lang="ts">
/**
 * Quality & Ops — 핵심 수치 + 한 줄 설명으로 압축.
 * 근거 이미지(ops.finops.evidence)는 해당 카드 하단에 figure로 첨부 — Evidence 섹션 분리 제거.
 */
import { portfolio } from '@/data/portfolio';
import CloudinaryImage from '@/components/CloudinaryImage.vue';

const { finops, performance, cicd } = portfolio.ops;
</script>

<template>
  <div class="mt-14 reveal">
    <p class="eyebrow">Quality &amp; Ops</p>
    <h3 class="mt-2 text-[18px] font-bold text-ink">비용 · 성능 · 무중단 운영 지표</h3>
  </div>

  <div class="mt-10">
    <!-- FinOps — 카드 하단에 Cost Explorer 스크린샷 첨부 -->
    <article class="article-block reveal">
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">FinOps</p>
        <div class="grid gap-2">
          <h4 class="text-[18px] font-semibold text-ink leading-snugger">
            {{ finops.headline.value }}
          </h4>
          <p class="text-[14px] text-ink-body">{{ finops.headline.label }}</p>
          <p class="text-[13px] text-ink-muted">
            ALB → API Gateway 전환 · NAT → VPC Endpoint · Fargate Spot 70% 혼합
          </p>

          <figure v-if="finops.evidence" class="mt-3">
            <div class="media-frame">
              <CloudinaryImage
                :src="finops.evidence.src"
                :alt="finops.evidence.alt"
                :width="1280"
                :height="800"
              />
            </div>
            <figcaption class="mt-2 text-[11px] italic text-ink-hint">
              Source: {{ finops.evidence.source }}
            </figcaption>
          </figure>
        </div>
      </div>
    </article>

    <!-- Performance -->
    <article class="article-block reveal">
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">Performance</p>
        <div class="grid gap-2">
          <h4 class="text-[18px] font-semibold text-ink leading-snugger">
            {{ performance.headline.value }}
          </h4>
          <p class="text-[14px] text-ink-body">{{ performance.headline.label }}</p>
          <p class="text-[13px] text-ink-muted">
            LCP 31.8s → 10.6s · FCP 14.7s → 4.7s · Hero 이미지 −98% · JS 번들 −79%
          </p>
        </div>
      </div>
    </article>

    <!-- CI/CD -->
    <article class="article-block reveal">
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">CI/CD</p>
        <div class="grid gap-2">
          <h4 class="text-[18px] font-semibold text-ink leading-snugger">
            {{ cicd.headline.value }}
          </h4>
          <p class="text-[14px] text-ink-body">{{ cicd.headline.label }}</p>
          <p class="text-[13px] text-ink-muted">
            GitHub Actions · Docker 멀티스테이지 · ECS Rolling Update · OIDC Role(Access Key 미사용) · Terraform IaC
          </p>
        </div>
      </div>
    </article>
  </div>
</template>
