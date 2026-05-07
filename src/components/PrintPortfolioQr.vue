<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { toString } from 'qrcode';

const portfolioUrl = 'https://portfolio.shakilabs.com/';
const qrSvg = ref('');

onMounted(async () => {
  qrSvg.value = await toString(portfolioUrl, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 80,
    color: {
      dark: '#111111',
      light: '#ffffff',
    },
  });
});
</script>

<template>
  <a
    class="hidden print:absolute print:right-0 print:top-8 print:block"
    :href="portfolioUrl"
    aria-label="Open portfolio website"
    v-html="qrSvg"
  />
</template>
