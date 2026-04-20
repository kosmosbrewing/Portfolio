<script setup lang="ts">
/**
 * Quality & Ops — 핵심 수치 + 설명. FinOps 이미지는 ImageModal로 확대.
 */
import { ref } from 'vue';
import { portfolio } from '@/data/portfolio';
import ImageModal from '@/components/ImageModal.vue';

const { finops, performance, cicd } = portfolio.ops;
const modalOpen = ref(false);
</script>

<template>
  <hr class="mx-auto mt-14 w-full max-w-[75rem] border-0 border-t border-ink-line" aria-hidden="true" />
  <div class="mt-10 reveal">
    <p class="eyebrow">Quality &amp; Ops</p>
    <h3 class="mt-2 text-[18px] font-bold text-ink">비용 · 성능 · 무중단 운영 지표</h3>
  </div>

  <div class="mt-10">
    <!-- FinOps -->
    <article class="article-block reveal">
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">FinOps</p>
        <div class="grid gap-3">
          <div>
            <h4 class="text-[18px] font-semibold text-ink leading-snugger">
              {{ finops.headline.value }}
            </h4>
            <p class="mt-1 text-[14px] text-ink-body">{{ finops.headline.label }}</p>
          </div>
          <p class="text-[13px] text-ink-muted">
            ALB → API Gateway 전환 · NAT → VPC Endpoint · Fargate Spot 70% 혼합
          </p>

          <img
            v-if="finops.evidence"
            :src="finops.evidence.src"
            :alt="finops.evidence.alt"
            loading="lazy"
            decoding="async"
            class="w-full cursor-pointer"
            @click="modalOpen = true"
          />
        </div>
      </div>
    </article>

    <!-- Performance -->
    <article class="article-block reveal">
      <div class="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <p class="text-[14px] text-ink-muted whitespace-nowrap">Performance</p>
        <div class="grid gap-3">
          <div>
            <h4 class="text-[18px] font-semibold text-ink leading-snugger">
              {{ performance.headline.value }}
            </h4>
            <p class="mt-1 text-[14px] text-ink-body">{{ performance.headline.label }}</p>
          </div>
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
        <div class="grid gap-3">
          <div>
            <h4 class="text-[18px] font-semibold text-ink leading-snugger">
              {{ cicd.headline.value }}
            </h4>
            <p class="mt-1 text-[14px] text-ink-body">{{ cicd.headline.label }}</p>
          </div>
          <p class="text-[13px] text-ink-muted">
            GitHub Actions · Docker 멀티스테이지 · ECS Rolling Update · OIDC Role(Access Key 미사용) · Terraform IaC
          </p>
        </div>
      </div>
    </article>
  </div>

  <ImageModal
    v-if="finops.evidence"
    :src="finops.evidence.src"
    :alt="finops.evidence.alt"
    :open="modalOpen"
    @close="modalOpen = false"
  />
</template>
