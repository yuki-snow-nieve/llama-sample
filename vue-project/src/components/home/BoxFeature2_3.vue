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
  let list = [];
  let count = 2;
  if (props.items.length > 4) {
    count = 5
  }
  for ( let i = 0; i < props.items.length; i++ ) {
    let item = props.items[i];
    if ( !item.mainthumb ) {
      list.push(item)
    }
    if ( list.length >= count ) {
      break;
    }
    
  }
  return list;
})

</script>

<template>
  <section class="box-feature">
    <header class="feature-header">
      <h2 class="feature-title">{{ title }}</h2>
      <div class="movie-item">
        <RouterLink
          :to="`/player/${id}/${thumbItem.item_id}`"
          @click="$emit('itemClicked', $el.querySelector('.movie-list'))"
        >
          <img
            :src="`https://img.youtube.com/vi/${thumbItem.item_id}/maxresdefault.jpg`"
            :alt="thumbItem.title"
          />
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
          <img
            :src="`https://img.youtube.com/vi/${item.item_id}/maxresdefault.jpg`"
            :alt="item.title"
          />
        </RouterLink>
      </li>
      <li class="list-safix movie-item">
        <RouterLink
          to="/player/${id}/${thumbItem.item_id}"
          class="link-more"
        >
          もっと見る
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

$space-block-side: settings.$spacer-min * 4;

.box-feature {
  margin: settings.$spacer-min * 10 $space-block-side;
  padding-block: settings.$spacer-min * 6;
  background-color: rgba(white, 0.1);
}

.feature-header {
  display: flex;
  gap: settings.$spacer-min * 2;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: settings.$spacer-min;
  padding-inline: settings.$spacer-min;

  .movie-item {
    width: calc(math.div(100%, 3) - settings.$spacer-min * 2/3);
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

  .list-safix {
    .link-more {
      align-items: center;
      height: 100%;
      justify-content: center;
      display: flex;
    }
  }
}

</style>
