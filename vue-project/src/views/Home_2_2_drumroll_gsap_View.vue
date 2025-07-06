<script setup>
import BoxFeature from '@/components/home/BoxFeature_scroll.vue';
import BoxPickup from '@/components/home/BoxPickup_box.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

import { useTemplateRef, onMounted } from 'vue';

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap使う？
gsap.registerPlugin(ScrollTrigger, Observer);

const list_wrapper = useTemplateRef('list');

onMounted(() => {
  console.log(`home is mounted`)

  const list_boxes = list_wrapper.value.querySelectorAll('.box');

  const rotateAngle = 360 / 6;

  const defaultState = {
    z: 0,
    scaleY: 1,
    opacity: 1,
  }

  const afterRotateState = {
    z: '-30cqh',
    scaleY: 0.3,
    opacity: 0.3,
  }

  const scrollTrigerCommonSetting = {
    toggleActions: 'play none none reverse',
    scrub: true,
  }

  Array.from(list_boxes).forEach(box => {

    gsap.fromTo(box, {
        rotationX: -1 * rotateAngle,
        ...afterRotateState,
      },{
        rotationX: 0,
        ...defaultState,
        ease: 'Power2.out',
        scrollTrigger: {
          trigger: box,
          start: 'top 90%',
          end: 'top 80%',
          ...scrollTrigerCommonSetting,
          markers: true,
          onToggle: (self) => {
            if (self.isActive) {
              self.trigger.classList.add('is_next');
              self.trigger.style.transformOrigin = '0 50% -30cqh'
            } else {
              self.trigger.classList.remove('is_next');
            }
          },
        }
      }
    )

    gsap.fromTo(box, {
        rotationX: 0,
        ...defaultState,
      },{
        rotationX: rotateAngle,
        ...afterRotateState,
        ease: 'Power2.in',
        scrollTrigger: {
          trigger: box,
          start: 'bottom 20%',
          end: 'bottom 10%',
          ...scrollTrigerCommonSetting,
          // markers: true,
          onToggle: (self) => {
            if (self.isActive) {
              self.trigger.classList.add('is_prev');
              self.trigger.style.transformOrigin = '100% 50% -30cqh'
            } else {
              self.trigger.classList.remove('is_prev');
            }
          },
        }
      }
    )

  })
})

</script>

<template>
  <main class="main page-index">
    <section class="section-movies">
      <div class="list-wrapper">
        <div ref="list" class="list-features">
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


.list-features {
  transform-style: preserve-3d;
  perspective: 100cqh;

  padding-top: 20cqh;
}

.box {
  backface-visibility: hidden;
  transform-style: preserve-3d;

  min-height: 50cqh;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.box {
  :deep {
    .movie-item, .box-feature {
      margin: 0 24px !important;
    }
  }
}

</style>
