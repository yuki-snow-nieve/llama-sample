import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Home_swiper_list_View from '@/views/Home_1_1_View.vue';
import Home_swiper_box_View from '@/views/Home_1_2_View.vue';
import Home_vertical_list_View from '@/views/Home_2_1_View.vue';
import Home_vertical_box_View from '@/views/Home_2_2_View.vue';
import Home_vertical_list_transition_View from '@/views/Home_2_1_transition_View.vue';
import Home_vertical_box_transition_View from '@/views/Home_2_2_transition_View.vue';
import Home_2_2_drumroll_View from '@/views/Home_2_2_drumroll_View.vue';
import Home_2_2_drumrollCSS_View from '@/views/Home_2_2_drumroll_cssAnimation.vue';
import Home_2_2_drumroll_swiper_View from '@/views/Home_2_2_drumroll_swiper_View.vue';
import Home_2_2_drumroll_gsap_View from '@/views/Home_2_2_drumroll_gsap_View.vue'
import PlayerView from '@/views/PlayerView_swiper.vue';
import PlayerItemView from '@/views/PlayerItemView.vue';

import testView from '@/views/test.vue';

const router = createRouter({
  mode: 'history',
  history: createWebHistory('/'),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: testView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home_1_1',
      name: 'home_1_1',
      component: Home_swiper_list_View,
    },
    {
      path: '/home_1_2',
      name: 'home_1_2',
      component: Home_swiper_box_View,
    },
    {
      path: '/home_2_1',
      name: 'home_2_1',
      component: Home_vertical_list_View,
    },
    {
      path: '/home_2_2',
      name: 'home_2_2',
      component: Home_vertical_box_View,
    },
    {
      path: '/home_2_1_transition',
      name: 'home_2_1_transition',
      component: Home_vertical_list_transition_View,
    },
    {
      path: '/home_2_2_transition',
      name: 'home_2_2_transition',
      component: Home_vertical_box_transition_View,
    },
    {
      path: '/home_2_2_drumroll',
      name: 'home_2_2_drumroll',
      component: Home_2_2_drumroll_View,
    },
    {
      path: '/home_2_2_drumroll_css',
      name: 'home_2_2_drumroll_css',
      component: Home_2_2_drumrollCSS_View,
    },
    {
      path: '/Home_2_2_drumroll_swiper',
      name: 'Home_2_2_drumroll_swiper',
      component: Home_2_2_drumroll_swiper_View
    },
    {
      path: '/Home_2_2_drumroll_gsap',
      name: 'Home_2_2_drumroll_gsap',
      component: Home_2_2_drumroll_gsap_View
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
  ]
});

export default router;
