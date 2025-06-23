<script setup>
defineProps({
  id: String,
  title: String,
  items: {
    item_id: String,
    title: String,
    movie: String,
  },
});
</script>

<template>
  <section class="box-feature">
    <h2 class="list-title">{{ title }}</h2>
    <ul class="movie-list">
      <li
        v-for="item in items"
        class="movie-item"
        :style="`view-transition-name: ${item.item_id}`"
      >
        <RouterLink
          :to="`/player/${id}/${item.item_id}`"
          @click="$emit('itemClicked', $el.querySelector('.movie-list'))"
        >
          <img
            :src="`https://img.youtube.com/vi/${item.item_id}/maxresdefault.jpg`"
            :alt="item.title"
          />
        </RouterLink>
      </li>
    </ul>
    <div class="list-safix">
      <RouterLink :to="`/player/${id}/${items[0].item_id}`">もっと見る</RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.movie-list {
  overflow-x: auto;
  white-space: nowrap;
  font-size: 0;

  .movie-item {
    display: inline-block;
    // width: 56vw;
    height: 123px;
    margin-right: settings.$spacer-min;
    font-size: 1.6rem;
    contain: paint;

    a {
      height: inherit;
      display: block;
    }

    img {
      height: inherit;
    }
  }
}

.list-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 2em * 1.4;
  margin-bottom: settings.$spacer-min;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1.4;
}

.list-safix {
  margin-top: settings.$spacer-min * 2;

  a {
    display: block;
    text-align: center;
    line-height: 1;
  }
}
</style>
