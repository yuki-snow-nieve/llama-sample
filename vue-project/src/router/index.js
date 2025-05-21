import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Home2_1View from '../views/Home2_1View.vue';
import Home2_2View from '../views/Home2_2View.vue';
import Home2_3View from '../views/Home2_3View.vue';
import PlayerView from '../views/PlayerView_swiper.vue';
import PlayerItemView from '../views/PlayerItemView.vue';

const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home2_1',
      name: 'home2_1',
      component: Home2_1View,
    },
    {
      path: '/home2_2',
      name: 'home2_2',
      component: Home2_2View,
    },
    {
      path: '/home2_3',
      name: 'home2_3',
      component: Home2_3View,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/player/:feature_id/:item_id',
      name: 'player',
      component: PlayerView,
      children: [{
        path: 'detail',
        name: 'itemDetail',
        component: PlayerItemView
      }],
    },
  ],
});

export default router;
