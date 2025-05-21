<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
import { ref, computed } from 'vue';

import ItemInfo from '../components/player/ItemInfo.vue';

import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCreative } from 'swiper/modules';
const swiperModules = [EffectCreative];

const isShowInfo = ref(false)

//dataの取得
const list = ((params_id) => {
  if ( params_id === "pickup") {
    return pickupData;
  } else {
    return itemsData.find( ({ feature_id }) => feature_id === params_id );
  }
})(route.params.feature_id);

const initial_item_index = ((params_id) => {
	return list.items.findIndex( ({item_id}) => item_id === params_id);
})(route.params.item_id);

const active_index = ref(initial_item_index)

const active_item = computed(()  => {
  console.log( list.items[active_index.value])
  return list.items[active_index.value];
});

//ページ遷移
const closeDetail = (() => {
  console.log('closeItemComponent')
})

//UIの設定
const setVisibleSlideClass = (slides, activeIndex) => {
  // if (slides[activeIndex - 2]) {
  //   slides[activeIndex - 2].classList.add('swiper-slide-prev-prev')
  // }
  // if (slides[activeIndex + 2]) {
  //   slides[activeIndex + 2].classList.add('swiper-slide-next-next')
  // }
}


const onSlideNextTransitionStart = (e) => {
  console.log('slideNextTransitionStart');
  // deleteMovieInfo(e.slides[e.activeIndex - 1]);
  // deletePlayerItem(e.slides[e.activeIndex - 1]);
}

const onSlidePrevTransitionStart = (e) => {
  console.log('slidePrevTransitionStart');
  // deleteMovieInfo(e.slides[e.activeIndex + 1]);
  // deletePlayerItem(e.slides[e.activeIndex + 1]);
}

const onSlideChangeTransitionStart = (e) => {
  console.log('slideChangeTransitionStart');
  hideMovieInfo();
  // e.slides.forEach(slide => {
  //   if (slide.classList.contains('swiper-slide-prev-prev')) {
  //     slide.classList.remove('swiper-slide-prev-prev')
  //   }
  //   if (slide.classList.contains('swiper-slide-next-next')) {
  //     slide.classList.remove('swiper-slide-next-next')
  //   }
  // })
  // setVisibleSlideClass(e.slides, e.activeIndex)
}

const onSlideChangeTransitionEnd = (swiper) => {
  console.log('slideChangeTransitionEnd');
  active_index.value = swiper.activeIndex;
  showMovieInfo();
  // startAutoPlay(e.slides[e.activeIndex]);
}

const onSlideChange = () => {
  console.log('slide change');
};

const showMovieInfo = () => {
  console.log('showMovieInfo')
  isShowInfo.value = true
  console.log('isShowInfo: ' + isShowInfo.value)
}

const hideMovieInfo = () => {
  console.log('deleteMovieInfo')
  isShowInfo.value = false
  console.log('isShowInfo: ' + isShowInfo.value)
}

const startAutoPlay = () => {
  console.log('startAutoPlay')
}

const deletePlayerItem = () => {
  console.log('deletePlayerItem')
}
</script>

<template>
  <main class="main page-player">
    <section class="section-movies">
      <h2 class="list-title">{{ list.title }}</h2>
      <swiper
        class="movie-list"
        :direction="'vertical'"
        :height=708
        :loop=false
        :initialSlide=initial_item_index
        :slidesPerView=3
        :speed=300
        :lazyPreloadPrevNext=2
        :modules="swiperModules"
        :effect="'creative'"
        :creativeEffect="{
          limitProgress: 1,
          perspective: false,
          prev: {      
            translate: [0, '-100%', 0],
            rotate: [0, 0, -45],
            scale: 0.46,
            opacity: 0.4
          },
          next: {
            translate: [0, '100%', 0],
            rotate: [0, 0, 45],
            scale: 0.46,
            opacity: 0.4
          }
        }"
        @slideChange="onSlideChange"
        @slideChangeTransitionStart="onSlideChangeTransitionStart"
        @slideNextTransitionStart="onSlideNextTransitionStart"
        @slidePrevTransitionStart="onSlidePrevTransitionStart"
        @slideChangeTransitionEnd="onSlideChangeTransitionEnd"
      >
        <swiper-slide
          v-for="item in list.items"
          class="movie-item"
        >
          <img
            :src="`https://img.youtube.com/vi/${item.item_id}/maxresdefault.jpg`"
            :alt="item.title"
          />
        </swiper-slide>
      </swiper>
      <ItemInfo
        v-if="isShowInfo"
        :feature_id="route.params.feature_id"
        :item_id="active_item.item_id"
        :title="active_item.title"
      />
    </section>

    <router-view @clickedCloseSelf="closeDetail"></router-view>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.section-movies {
  width: 100%;
}

.list-title {
  position: absolute;
  top: settings.$sizeH_globalHeader + 24px;
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 8px;
  box-shadow: 0 0 8px 8px rgba(settings.$theme-main-background, 0.3);
  background-color: rgba(settings.$theme-main-background, 0.3);
  font-size: 1.6rem;
  font-weight: normal;
}

.movie-list {
  container-type: inline-size;
  container-name: canvas;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.swiper:deep {
  .swiper-wrapper {
    $activeContentHeight: 100cqw * 9/16;
    --height: calc(#{$activeContentHeight} + #{settings.$sizeH_globalHeader});

    position: relative;
    transform: translate3d(0, var(--height), 0);

    &:before {
      content: "";
      display: block;
      position: absolute;
      top: calc(-1 * var(--height));
      width: 100%;
      height: var(--height);
    }
  }

  .swiper-slide {
    transform-origin: 0 50%;

    a {
      display: block;
    }

    &.swiper-slide-active {
    }

    &.swiper-slide-prev {
      height: fit-content !important;
    }

    &.swiper-slide-next {
      height: fit-content !important;
    }

    &:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)  {
      opacity: 0 !important;
    }

    &:not([class*="swiper-slide-"]) {
    }
  }
}

.movie-item {
  contain: paint;
  position: relative;
  overflow: visible !important;

  &:deep {
    img {
      position: relative;
      z-index: 1;
    }

    iframe {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .movie-item-header {
      padding: 0 16px;
      background: rgba(settings.$theme-main-background, 0.2);  
    }

    .movie-item-footer {
      padding: 0 16px;
      background: rgba(settings.$theme-main-background, 0.2);  
    }    
  }
}

.movie-info {
  $activeContentHeight: 100cqw * 9/16;
  --height: calc(50cqh + #{math.div($activeContentHeight, 4)});
  position: fixed;
  top: var(--height);
  z-index: settings.$layer-detail;
  width: 100%;
}
</style>
