import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './style.css';

createApp(App).use(router).mount('#app');

// Why: 인쇄 시 lazy 이미지가 미로드 상태로 빈 상자처럼 인쇄되는 사고 방지.
//      beforeprint에서 모든 lazy를 eager로 전환하고, decode가 끝날 때까지 동기 대기.
if (typeof window !== 'undefined') {
  window.addEventListener('beforeprint', () => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]'));
    imgs.forEach((img) => img.setAttribute('loading', 'eager'));
  });
}
