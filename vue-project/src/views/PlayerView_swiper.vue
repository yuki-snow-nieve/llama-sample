<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import { ref, computed, onMounted, useTemplateRef } from 'vue';

import ItemInfo from '@/components/player/ItemInfo.vue';

import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCreative } from 'swiper/modules';
const swiperModules = [EffectCreative];

const isShowInfo = ref(true)

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

const active_item = ref(list.items[initial_item_index]);
const active_index = computed({
  get() {
    return initial_item_index
  },
  set(newValue) {
    active_item.value = list.items[newValue];
  }
})

//UIの設定
////Swiper設定
const boxSwiper = useTemplateRef('sectionPlayer');
const swiperHeight = ref(0);
onMounted(() => {
  const itemH = boxSwiper.value.offsetWidth * 9 / 16;
  swiperHeight.value = itemH * 3;
})

const onSlideChange = (swiper) => {
  active_index.value = swiper.activeIndex;
  router.push({ name: 'player', params: { feature_id: route.params.feature_id, item_id: active_item.value.item_id }})
};

const onSlideChangeTransitionStart = () => {
  isShowInfo.value = false;
}

const onSlideChangeTransitionEnd = () => {
  isShowInfo.value = true
}
</script>

<template>
  <main class="main page-player">
    <section ref="sectionPlayer" class="section-movies">
      <h2 class="list-title" id="swiperBox">{{ list.title }}</h2>
      <swiper
        class="movie-list"
        :direction="'vertical'"
        :height="swiperHeight"
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
        @slideChangeTransitionEnd="onSlideChangeTransitionEnd"
      >
        <swiper-slide
          v-for="(item, i) in list.items"
          class="movie-item"
          :key="i"
        >
          <img
            :src="`https://img.youtube.com/vi/${item.item_id}/maxresdefault.jpg`"
            :alt="item.title"
            :view-transition-name="item.item_id"
          />
          <iframe
            v-if="i === active_index"
            width="100%"
            height="100%"
            :src="`${item.movie}&autoplay=1&mute=1&controls=0`"
            :title="item.title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            :allowfullscreen="true"
          >
          </iframe>
        </swiper-slide>
        <swiper-slide
          v-for="i in 2"
          class="movie-item is_empty"
        >
        </swiper-slide>
      </swiper>
      <ItemInfo
        v-show="isShowInfo"
        :feature_id="route.params.feature_id"
        :item_id="active_item.item_id"
        :title="active_item.title"
      />
    </section>

    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.section-movies {
  position: relative;
  width: 100%;
}

.list-title {
  position: absolute;
  top: settings.$sizeH_globalHeader;
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
  width: 100%;
  max-width: var(--width-max-main-conteiner);
}

.swiper:deep {
  .swiper-wrapper {
    $activeContentHeight: math.div(100cqw * 9, 16);
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
      opacity: 1 !important;
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
      contain: paint;
    }

    iframe {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      opacity: 0;
      animation: opacity 300ms ease 1000ms forwards;
    }

    
    @keyframes opacity {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
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
  $activeContentHeight: math.div(100cqw * 9, 16);
  --height: calc(50cqh + #{math.div($activeContentHeight, 4)});
  position: absolute;
  top: var(--height);
  z-index: settings.$layer-detail;
  width: 100%;
}
</style>
