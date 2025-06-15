<script setup>
import { onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue';

import BoxFeature from '@/components/home/BoxFeature2_3_transition.vue';
import BoxPickup from '@/components/home/BoxPickup2_3_transition.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

onBeforeRouteLeave((to, from, next) => {
  if (to.name === 'player_transition') {
    transition_toPlayer(to, from, next)
  } else {
    next();
  }
});

//transitionの設定
const transition_toPlayer = (to, from, next) => {
  const transitionDuration = 3000;
  const items = document.getElementById(to.params.feature_id).getElementsByClassName('movie-item');

  const canvas = document.getElementById('listCanvas');

  const targetPosition = {x: 0, y: window.getComputedStyle(canvas).getPropertyValue('--ratio_16_9_forw100per')};
  const animationTiming = {
    duration: transitionDuration,
    fill: 'forwards'
  }
  const canvas_w = canvas.getBoundingClientRect().width;

  let active_index = 0;

  const tempElms = document.createElement('div');
  tempElms.style.position = 'relative';
  tempElms.style.zIndex = 100;

  Array.from( items ).forEach((el, index) => {
    const originImg = el.querySelector('.item-image img');
    const origin_x = originImg.getBoundingClientRect().x;
    const origin_y = originImg.getBoundingClientRect().y;
    const origin_width = originImg.getBoundingClientRect().width;

    const img = originImg.cloneNode();
    img.style.position = 'fixed';
    img.style.left = `${origin_x}px`;
    img.style.top = `${origin_y}px`;
    img.style.width = `${origin_width}px`;
    img.style.transformOrigin = '0% 50%'

    originImg.style.opacity = 0;

    img.setAttribute('to_x', `${targetPosition.x - origin_x}px`);
    img.setAttribute('to_y', `calc(${targetPosition.y} - ${origin_y}px)`);
    img.setAttribute('to_scale', canvas_w / origin_width);

    tempElms.insertAdjacentElement('beforeend', img);

    if (img.getAttribute('item-id') === to.params.item_id) {
      active_index = index;
      img.style.zIndex = 100;
    }
  })
  canvas.insertAdjacentElement('afterbegin', tempElms);

  Array.from( tempElms.getElementsByTagName('img') ).forEach((img, index) => {

    const elIndex = index - active_index;

    const to_rotate = `${45 * elIndex}deg`;
    const to_scale = img.getAttribute('to_scale');
    const to_y_step2 = `calc(${img.getAttribute('to_y')} + ${elIndex * canvas_w * 9 / 16}px)`;
    const to_scale_step2 = elIndex === 0 ? 1 * to_scale : 0.46 * to_scale;
    const to_opacity = elIndex === 0 ? 1 : 0.4;

    const animation1 = [
      {transform: 'translate(0, 0) scale(1)'},
      {
        transform: 
          `translate(${img.getAttribute('to_x')}, ${img.getAttribute('to_y')})
          scale(${img.getAttribute('to_scale')})`,
        opacity: 1
      },
      {
        transform:
          `translate(${img.getAttribute('to_x')}, ${to_y_step2})
          scale(${to_scale_step2})
          rotate(${to_rotate})`,
        opacity: to_opacity
      }
    ]
    const transition = img.animate(animation1, animationTiming);

    transition.onfinish = (e) => {
      // console.log(e)
    }

    Promise.all(
      tempElms.getAnimations({ subtree: true }).map((animation) => animation.finished),
    ).then((e) => {
      console.log(e)
    });
    
  // setTimeout(() => {
  //   next();
  // }, transitionDuration);    

  })



      // const toY_step2 = `calc(${targetPosition.y} - ${y - img.getAttribute('index') * canvas_w * 9 / 16}px)`;


      // const animation1 = [
      //   {transform: `translate(${toX}, ${toY_step2})
      //               rotate(${toRotate})
      //               scale(${is_active ? 1 : 1})`,
      //               opacity: is_active ? 1 : 0.4
      //   }
      // ]

    // })



}
</script>

<template>
  <main class="main page-index">
    <section id="listCanvas" class="section-movies">
      <div class="list-wrapper">
        <div class="list-features">
          <section id="pickup" class="box-pickup">
            <BoxPickup
              v-for="item in pickupData.items"
              :key="item.item_id"
              :item_id="item.item_id"
              :title="item.title"
              :items="item.items"
              :feature_id="pickupData.feature_id"
            />
          </section>
          <BoxFeature
            v-for="feature in itemsData"
            :key="feature.feature_id"
            :id="feature.feature_id"
            :title="feature.title"
            :items="feature.items"
          />
        </div>
      </div>
    </section>
  </main>
</template>

