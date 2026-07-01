import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from './views/HomeView.vue';

/**
 * Why: 두 개의 페이지가 아니라 두 개의 로케일. 같은 HomeView를 렌더하되
 *      route.meta.locale로 로케일을 구별해 usePortfolio()가 결정한다.
 *      해시(#hero 등)는 그대로 동작.
 */
const routes: readonly RouteRecordRaw[] = [
  { path: '/', name: 'home-ko', component: HomeView, meta: { locale: 'ko' } },
  { path: '/en', name: 'home-en', component: HomeView, meta: { locale: 'en' } },
  // 알 수 없는 경로는 KO 홈으로
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});
