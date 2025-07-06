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
  <section :id="id" class="box-feature">
    <header class="feature-header">
      <h2 class="feature-title">{{ title }}</h2>
    </header>
    <ul class="feature-body movie-list">
      <li
        v-for="item in items"
        class="movie-item"
      >
        <RouterLink
          :to="`/player/${id}/${item.item_id}`"
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 $space-block-side;
  padding-block: settings.$spacer-min * 6;
  background-color: rgba(white, 0.1);
}

.feature-header {
  padding-inline: settings.$spacer-min;

  .feature-title {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.4;
  }
}

.feature-body {
  padding: settings.$spacer-min * 4 0;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: settings.$spacer-min;
  padding-inline: settings.$spacer-min;

  .movie-item {
    width: calc(math.div(100%, 3) - settings.$spacer-min * 2/3);
    contain: paint;

    a {
      height: inherit;
      display: block;
    }

    img {
      position: relative;
      height: inherit;
      contain: paint;
    }
  }
}

.feature-footer {
  font-size: 1.6rem;

  a {
    height: inherit;
    display: block;
  }

  .link-more {
    align-items: center;
    height: 100%;
    justify-content: center;
    display: flex;
  }
}
</style>
