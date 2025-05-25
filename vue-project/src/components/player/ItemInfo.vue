<script setup>
import buttonsReactions from '@/components/player/ItemReactions.vue';

defineProps({
  feature_id: String,
  item_id: String,
  title: String
});

</script>

<template>
  <div class="movie-info">
    <h1 class="movie-title">{{title}}</h1>
    <buttonsReactions />
    <div class="box-buttons">
      <RouterLink
        :to="{ name: 'itemDetail', params: { feature_id: feature_id, item_id: item_id }}"
        class="button button_outline"
      >
        詳細を見る
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.movie-info {
  padding: 0 settings.$spacer-min*2;
  background: rgba(settings.$theme-main-background, 0.2);
}

.movie-title {
  margin: 1em 0;
  @include settings.lettring_movieTitle
}
</style>