<script setup>
import { onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue';

import BoxFeature from '@/components/home/BoxFeature2_3_transition.vue';
import BoxPickup from '@/components/home/BoxPickup2_3_transition.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

//transitionの設定
const transitionDuration = 3000;
const targetPosition = ref({x: 0, y: 0});

const pageToPlayer = (position) => {
  targetPosition.value = position;
};

onBeforeRouteLeave((to, from, next) => {
  console.log(to)
  console.log(from)

  if (to.name === 'player_transition') {
    const clickedList = to.params.feature_id;
    const animationTiming = {
      duration: transitionDuration,
    }
    const canvas = document.getElementById('listCanvas');
    const items = document.getElementById(clickedList).getElementsByClassName('movie-item');
    targetPosition.value.y = window.getComputedStyle(canvas).getPropertyValue('--ratio_16_9_forw100per');
    console.log(targetPosition.value.y)

    let tempElms = document.createElement('div');
    tempElms.style.position = 'relative';
    tempElms.style.zIndex = 100;

    Array.from( items ).forEach(el => {
      let originImg = el.querySelector('.item-image img');
      let img = originImg.cloneNode();
      originImg.style.opacity = 0;

      let x = originImg.getBoundingClientRect().x;
      let y = originImg.getBoundingClientRect().y;

      img.style.position = 'fixed';
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;

      if ( img.getAttribute('item-id') === to.params.item_id ) {
        img.style.zIndex = 100;
      }

      tempElms.insertAdjacentElement('beforeend', img)

      const animation = [
        {transform: "translate(0, 0)"},
        {transform: `translate(0, calc(${targetPosition.value.y} - ${y}px)`}
      ]
      img.animate(animation, animationTiming);
    })

    canvas.insertAdjacentElement('afterbegin', tempElms);

    setTimeout(() => {
      next()
    }, transitionDuration);

  } else {
    next()
  }

})
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
              @linkClicked="pageToPlayer"
            />
          </section>
          <BoxFeature
            v-for="feature in itemsData"
            :key="feature.feature_id"
            :id="feature.feature_id"
            :title="feature.title"
            :items="feature.items"
            @linkClicked="pageToPlayer"
            :view-transition-name="`listBox_${feature.feature_id}`"
          />
        </div>
      </div>
    </section>
  </main>
</template>

