<script setup>
import { onBeforeRouteLeave } from 'vue-router'

import BoxFeature from '@/components/home/BoxFeature_list.vue';
import BoxPickup from '@/components/home/BoxPickup_box.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

onBeforeRouteLeave((to, from, next) => {
  if (to.name === 'player') {
    transition_toPlayer(to, from, next)
  } else {
    next();
  }
});

//transitionの設定
const transition_toPlayer = (to, from, next) => {
  const transitionDuration = 1400;

  const active_index = Array.from(document.querySelectorAll(`#${to.params.feature_id} .movie-item img`))
                            .findIndex((item) => item.getAttribute('item-id') === to.params.item_id);

  const canvas = document.getElementById('listCanvas');
  const canvas_w = canvas.getBoundingClientRect().width;
  const targetPosition = {x: 0, y: window.getComputedStyle(canvas).getPropertyValue('--ratio_16_9_forw100per')};

  const items = document.getElementById(to.params.feature_id).getElementsByClassName('movie-item');

  const tempElms = document.createElement('div');
  tempElms.style.position = 'relative';
  tempElms.style.zIndex = 100;
  canvas.insertAdjacentElement('afterbegin', tempElms);

  const animation_el = (img, el_index) => {
    const img_index = el_index - active_index;
    const img_clientRect = img.getBoundingClientRect();

    const to_x_s1 = `${targetPosition.x - img_clientRect.x}px`;
    const to_y_s1 = `calc(${targetPosition.y} - ${img_clientRect.y}px)`;
    const to_scale_s1 = canvas_w / img_clientRect.width;

    const to_y_s2 = `calc(${to_y_s1} + ${img_index * canvas_w * 9 / 16}px)`;
    const to_rotate_s2 = `${45 * img_index}deg`;
    const to_scale_s2 = img_index === 0 ? 1 : 0.46;
    const to_opacity_s2 = img_index === 0 ? 1 : 0.4;

    const animation = [
      {transform: 'translate(0, 0) scale(1)'},
      {
        transform: 
          `translate(${to_x_s1}, ${to_y_s1})
          scale(${to_scale_s1})`,
        opacity: 1
      },
      {
        transform:
          `translate(${to_x_s1}, ${to_y_s2})
          scale(${to_scale_s2 * to_scale_s1})
          rotate(${to_rotate_s2})`,
        opacity: to_opacity_s2
      }
    ]

    img.animate(animation, transitionDuration);

  }

  Array.from(items).forEach((el, index) => {
    const originImg = el.querySelector('.item-image img');
    const origin_clientRect = originImg.getBoundingClientRect();

    const img = originImg.cloneNode();
    img.style.position = 'fixed';
    img.style.left = `${origin_clientRect.x}px`;
    img.style.top = `${origin_clientRect.y}px`;
    img.style.width = `${origin_clientRect.width}px`;
    img.style.transformOrigin = '0% 0%'
    if (index === active_index) {
      img.style.zIndex = 100;
    }

    tempElms.insertAdjacentElement('beforeend', img);
    originImg.style.opacity = 0;

    animation_el(img, index);

    Promise.all(
      tempElms.getAnimations({ subtree: true }).map((animation) => animation.finished),
    ).then((e) => {
      console.log(e)
      if (e.length >= index) {
        next();
      }
    });
  })

  canvas.getElementsByClassName('list-wrapper')[0].animate([
    {
      transform: 'rotateY(0)',
      opacity: 1
    },
    {
      transform: 'rotateY(90deg)',
      opacity: 0
    }
  ], {
    duration: transitionDuration * 0.4,
    fill: 'forwards'
  })

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

