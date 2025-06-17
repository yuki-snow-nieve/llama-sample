<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  title: String,
  items: {
    item_id: String,
    title: String,
    movie: String,
    mainthumb: Boolean
  },
});

const thumbItem = computed(() => {
  return props.items.find( item => item.mainthumb )
})

const listItems = computed(() => {
  return props.items.filter( item => !item.mainthumb )
})

</script>

<template>
  <section :id="id" class="box-feature">
    <header class="feature-header">
      <h2 class="feature-title">{{ title }}</h2>
      <div class="movie-item">
        <RouterLink
          :to="`/player/${id}/${thumbItem.item_id}`"
        >
          <div class="item-image">
            <img
              :src="`https://img.youtube.com/vi/${thumbItem.item_id}/maxresdefault.jpg`"
              :alt="thumbItem.title"
              :item-id="thumbItem.item_id"
            />
          </div>
        </RouterLink>
      </div>
    </header>
    <ul class="feature-body movie-list">
      <li
        v-for="item in listItems"
        class="movie-item"
        :style="`view-transition-name: ${item.item_id}`"
      >
        <RouterLink
          :to="`/player/${id}/${item.item_id}`"
          @click="$emit('itemClicked', $el.querySelector('.movie-list'))"
        >
          <div class="item-image">
            <img
              :src="`https://img.youtube.com/vi/${item.item_id}/maxresdefault.jpg`"
              :alt="item.title"
              :item-id="item.item_id"
            />
          </div>
        </RouterLink>
      </li>
    </ul>
    <footer class="feature-footer">
      <RouterLink
        :to="`/player/${id}/${thumbItem.item_id}`"
        class="link-more"
      >
        もっと見る
      </RouterLink>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

$space-block-side: settings.$spacer-min * 4;

.box-feature {
  margin: settings.$spacer-min * 10 $space-block-side;
  background-color: rgba(white, 0.1);
}

.feature-header {
  display: flex;
  gap: settings.$spacer-min * 2;
  padding-top: settings.$spacer-min * 6;
  padding-inline: settings.$spacer-min * 2;
  padding-bottom: settings.$spacer-min * 4;

  .feature-title {
    order: 2;
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.4;
    width: 50%;
  }

  .movie-item {
    order: 1;
    width: 50%;
  }
}



.movie-list {
  margin-inline: -1 * $space-block-side;
  overflow-x: auto;
  white-space: nowrap;
  font-size: 0;

  .movie-item {
    display: inline-block;
    width: 38vw;
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

.feature-footer {
  padding-block: settings.$spacer-min * 4;
  padding-inline: settings.$spacer-min * 2;
  text-align: right;
}

</style>
