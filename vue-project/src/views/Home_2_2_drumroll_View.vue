<script setup>
import BoxFeature from '@/components/home/BoxFeature_scroll.vue';
import BoxPickup from '@/components/home/BoxPickup_box.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

import { onMounted } from 'vue';

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// gsap使う？
gsap.registerPlugin(Observer);

const anim_scroll = () => {
  
}

// vanil js api使う？
onMounted(() => {
  const options = {
    root: null,
    rootMargin: "-20% 0px",
    threshold: 0.5,
  };

  const items = document.querySelectorAll('.box');

  const animation = (entries, observer) => {
    entries.forEach(entry => {
      // console.log(entry)
      // console.log(entry.target.querySelector('img').getAttribute('alt'))
      // console.log(entry.intersectionRatio)
      // console.log(`root:  top: ${entry.rootBounds.top}  bottom: ${entry.rootBounds.height}`)
      // console.log(`entry: top: ${entry.boundingClientRect.top}  bottom: ${entry.boundingClientRect.bottom}`)
      const el = entry.target;
      console.log()
      if (entry.isIntersecting) {
        el.classList.remove('is-prev', 'is-next');
      }

      if (!entry.isIntersecting) {
        if (entry.rootBounds.top > entry.boundingClientRect.top) {
          el.classList.add('is-prev');
        }
        if (entry.rootBounds.height < entry.boundingClientRect.bottom) {
          el.classList.add('is-next');
        }
      }
    })
  }

  const observer = new IntersectionObserver(animation, options);

  items.forEach(item => {
    observer.observe(item);
  });

})

</script>

<template>
  <main class="main page-index">
    <section class="section-movies">
      <div class="list-wrapper">
        <div class="list-features">
          <div
            v-for="item in pickupData.items"
            class="box"
          >
            <BoxPickup
              :key="item.item_id"
              :item_id="item.item_id"
              :title="item.title"
              :items="item.items"
              :feature_id="pickupData.feature_id"
            />
          </div>
          <div
            v-for="feature in itemsData"
            class="box"
          >
            <BoxFeature
              :key="feature.feature_id"
              :id="feature.feature_id"
              :title="feature.title"
              :items="feature.items"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.section-movies {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
}

.list-features {
  height: 100dvh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.box {
  transform-style: preserve-3d;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  // height: 100dvh;
  
  > * {
    transform: rotateX(0);
    transition: all ease 30ms;
  }

  &.is-prev > *{
    transform-origin: 50% 150% -5dvh;
    transform: translateZ(-5dvh) rotateX(60deg);
  }

  &.is-next > *{
    transform-origin: 50% 0%;
    transform: rotateX(-60deg) translateZ(-5dvh);
  }

  &.is-prev, &.is-next {
    opacity: 0.6;
  }
}

</style>
