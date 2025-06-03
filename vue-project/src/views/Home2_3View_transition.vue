<script setup>
import { onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue';

import BoxFeature from '../components/home/BoxFeature2_3_transition.vue';
import BoxPickup from '../components/home/BoxPickup2_3_transition.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

//transitionの設定
const transitionDuration = 3000;
const clickedList = ref('');
const targetPosition = ref({x: 0, y: 0})

const pageToPlayer = (listName, position) => {
  // document.startViewTransition(() => {
  //   console.log('transition')
  // });
  clickedList.value = listName;
  targetPosition.value = position;
};

onBeforeRouteLeave((to, from, next) => {
  console.log(to)
  console.log(from)

  if (to.name === 'player_transition') {

    const animationTiming = {
      duration: transitionDuration
    }

    const items = document.querySelectorAll(`.${clickedList.value}`);
    items.forEach(el => {
      let img = el.querySelector('.item-image img');
      let x = img.getBoundingClientRect().x;
      let y = img.getBoundingClientRect().y;

      const animation = [
        {transform: `translate(${x}, ${y}) rotateY(0deg)`},
        {transform: `translate(${targetPosition.value.x - x}px, ${targetPosition.value.y - y}px) rotateY(-90deg)`}
      ]

      img.animate(animation, animationTiming);
    });

    setTimeout(() => {
      // next()
    }, animationTiming);

  } else {
    // next()
  }
  // document.startViewTransition(() => next());
});

</script>

<template>
  <main class="main page-index">
    <section id="listCanvas" class="section-movies">
      <div class="list-wrapper">
        <div class="list-features">
          <BoxPickup
            v-for="item in pickupData.items"
            :key="item.item_id"
            :item_id="item.item_id"
            :title="item.title"
            :items="item.items"
            :feature_id="pickupData.feature_id"
            @linkClicked="pageToPlayer"
          />
          <BoxFeature
            v-for="feature in itemsData"
            :key="feature.feature_id"
            :id="feature.feature_id"
            :title="feature.title"
            :items="feature.items"
            class=""
            :view-transition-name="`listBox_${feature.feature_id}`"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.list-features {



}
</style>
