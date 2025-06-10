<script setup>
defineProps({
  item_id: String,
  title: String,
  movie: String,
  feature_id: String,
});

</script>

<template>
  <div class="movie-item">
    <RouterLink
      :to="{name: 'player_transition', params: {'feature_id': feature_id,'item_id': item_id }}"
    >
      <div class="pickup-header">tr / PICK UP</div>
      <dl class="item pickup-body">
        <dt class="item-title">{{ title }}</dt>
        <dd class="item-image">
          <img
            :src="`https://img.youtube.com/vi/${item_id}/maxresdefault.jpg`"
            :alt="title"
            :item-id="item_id"
          />
        </dd>
      </dl>
      <div class="pickup-footer">
        この作品を見る
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

$space-block-side: settings.$spacer-min * 4;

.movie-item {
  position: relative;
  margin: settings.$spacer-min * 10 $space-block-side;
  background-color: rgba(white, 0.1);
}

.pickup-header {
  padding-top: settings.$spacer-min;
  color: settings.$theme-main-background;
  font-size: 3.6rem;
  font-weight: bold;
  text-align: center;
}
.pickup-body {
  padding-block: settings.$spacer-min;
}
.pickup-footer {
  padding-bottom: settings.$spacer-min;
  padding-right: settings.$spacer-min;
  text-align: right;
}

.item {
  display: flex;
  flex-direction: column;
  gap: settings.$spacer-min * 3;

  .item-title {
    order: 2;
    padding-inline: settings.$spacer-min * 2;
    font-size: 2.0rem;
    font-weight: bold;
    line-height: 1.4;
  }

  .item-image {
    order: 1;
    margin-inline: -1 * $space-block-side;
  }
}

</style>