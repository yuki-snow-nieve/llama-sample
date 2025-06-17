<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Parallax } from 'swiper/modules';

import "swiper/css";
// import "swiper/css/pagination";

defineProps({
  feature_id: String,
  items: {
    item_id: String,
    title: String,
    movie: String
  },
});

const modules = [ Pagination, Autoplay, Parallax ]

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

</script>

<template>
  <section class="box-pickup">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 5000,
        pauseOnMouseEnter: true
      }"
      :pagination="{ clickable: true }"
      parallax
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="list-movies"
    >
      <swiper-slide
        v-for="item in items"
        :key="item.item_id"
      >
        <RouterLink
          :to="`/player/${feature_id}/${item.item_id}`"
          @click="$emit('itemClicked', $el.querySelector('.movie-list'))"
        >
          <dl class="movie-item">
            <dt class="movie-title"
              data-swiper-parallax-opacity="0"
              data-swiper-parallax-duration="2000"
            >
              {{ item.title }}
            </dt>
            <dd class="movie-image">
              <img
                :src="`https://img.youtube.com/vi/${item.item_id}/maxresdefault.jpg`"
                :alt="item.title"
              />
            </dd>
          </dl>
          <div class="item-safix"
            data-swiper-parallax-opacity="0"
            data-swiper-parallax-duration="2000"
          >
            この作品を見る
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.box-pickup {
  aspect-ratio: 1 / 1;
}

.list-movies {
  display: flex;
  flex-direction: column;
  height: 100%;

  ::v-deep {
    .swiper-wrapper {
      flex: 1;
    }
  }
}

.movie-item {
  display: flex;
  flex-direction: column;
  padding-top: math.div((100% - math.div(100, 16) * 9), 2);

  .movie-title {
    order: 2;
    margin-left: settings.$spacer-min * 2;
    margin-top: settings.$spacer-min * 2;
    font-size: 1.8rem;
    font-weight: bold;
  }
  .movie-image {
    order: 1;
  }
}

.item-safix {
  margin-right: settings.$spacer-min * 2;
  text-align: right;
}

::v-deep {

  .swiper-pagination {
    display: flex;
    gap: 4px;
    height: 4px;

    .swiper-pagination-bullet {
      flex: 1;
      height: inherit;
      background-color: rgba(white, 0.3);
    }

    .swiper-pagination-bullet-active {
      background-color: rgba(white, 1);
    }
  }

  }

</style>
