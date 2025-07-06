<script setup>
import BoxFeature from '@/components/home/BoxFeature_big.vue';
import BoxPickup from '@/components/home/BoxPickup_box.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

import { ref, onMounted } from 'vue';

import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCreative } from 'swiper/modules';
const swiperModules = [EffectCreative];

const viewHeight = ref(0);
const swiperHeight = ref(0);
onMounted(() => {
  viewHeight.value = document.getElementsByClassName('main')[0].getBoundingClientRect().height;
  swiperHeight.value = viewHeight.value * 0.6 + viewHeight.value * 0.6* 2;
  console.log(viewHeight.value)
  console.log(swiperHeight.value)
})

const onSwiperAfterInit = (e) => {
  console.log(e.slides);
  Array.from(e.slides).prototype.forEach(slide => {
    console.log(slide)
    console.log('slide: ' + slide.getBoundingClientRect().height)
    console.log('item: ' + slide.children.getBoundingClientRect().height)
  })
  e.slides.prototype.forEach(slide => {
    console.log(slide)
    console.log('slide: ' + slide.getBoundingClientRect().height)
    console.log('item: ' + slide.children.getBoundingClientRect().height)
  });
}

</script>

<template>
  <main class="main page-index">
    <section class="section-movies">
      <div class="list-wrapper">
        <swiper
          class="list-features"
          :direction="'vertical'"
          :height="swiperHeight"
          :autoheight="true"
          :loop=true
          :initialSlide=0
          :slidesPerView=3
          :speed=300
          :lazyPreloadPrevNext=2
          :modules="swiperModules"
          :effect="'creative'"
          :creativeEffect="{
            limitProgress: 3,
            perspective: false,
            prev: {      
              translate: [0, '-100%', 0],
              rotate: [60, 0, 0],
              scale: 0.86,
              opacity: 0.4
            },
            next: {
              translate: [0, '100%', 0],
              rotate: [-60, 0, 0],
              scale: 0.86,
              opacity: 0.4
            }
          }"
          @afterInit="onSwiperAfterInit"
        >
          <swiper-slide
            v-for="item in pickupData.items"
          >
            <BoxPickup
              :key="item.item_id"
              :item_id="item.item_id"
              :title="item.title"
              :items="item.items"
              :feature_id="pickupData.feature_id"
            />
          </swiper-slide>
          <swiper-slide
            v-for="feature in itemsData"
          >
            <BoxFeature
              :key="feature.feature_id"
              :id="feature.feature_id"
              :title="feature.title"
              :items="feature.items"
            />
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.page-index {
  overflow: hidden;
}

.swiper:deep {
  .swiper-wrapper {
     $activeContentHeight: math.div(100cqw * 9, 16);
  
    position: relative;
    transform: translate3d(0, $activeContentHeight, 0);

  }

  .swiper-slide {
    &.swiper-slide-active {
      opacity: 1 !important;
    }

    &.swiper-slide-prev {
      transform-origin: center bottom;
    }

    &.swiper-slide-next {
      transform-origin: center top;
    }
  }

  .swiper-slide {
    > .movie-item, >.box-feature {
      height: 100%;
      margin-top: 0;
      margin-bottom: 0;
    }

    > .movie-item {
      display: flex;
      align-items: center;
    }
  }

}
</style>
