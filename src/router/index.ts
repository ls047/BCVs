import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import CvMember from '../pages/cv-member.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/cv/:slug', name: 'cv-member', component: CvMember },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
