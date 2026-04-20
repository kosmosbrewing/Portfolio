<script setup lang="ts">
import { portfolio } from '@/data/portfolio';

const contact = portfolio.contact;
</script>

<template>
  <section class="pt-4 pb-12">
    <hr class="mx-auto mb-10 w-full max-w-[75rem] border-0 border-t border-ink-line" aria-hidden="true" />
    <div class="container-read">
      <div class="reveal grid gap-8 sm:grid-cols-[140px_1fr]">
        <h2 class="text-[18px] font-bold text-ink">Contact</h2>

        <dl class="grid gap-6 text-[15px]">
          <div
            v-for="l in contact.links"
            :key="l.label"
            class="flex items-baseline gap-8"
          >
            <dt class="w-[80px] shrink-0 text-[15px] text-ink-muted">{{ l.label }}</dt>
            <dd>
              <a :href="l.href" target="_blank" rel="noopener" class="link font-medium">
                {{ l.handle ?? l.href }}
                <span aria-hidden="true" class="link-arrow ml-1">↗</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
