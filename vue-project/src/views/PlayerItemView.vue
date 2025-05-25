<script setup>
import itemDetailData from '@/assets/tempData/itemDetailData.json';
import buttonsReactions from '@/components/player/ItemReactions.vue';
import buttonsClose from '@/components/elements/buttons_close.vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const clickedCloseButton = (() => {
  router.push({ name: 'itemDetail', params: { feature_id: route.params.feature_id, item_id: route.params.item_id }})
})

</script>

<template>
  <div class="page-detail">
    <buttonsClose class="button_close" @clicked="clickedCloseButton" />
    <section class="section-detail">
      <header class="details-header">
        <h1 class="movie-title">
          {{itemDetailData.title}}
        </h1>
        <div class="icons">
          <span class="icon_release">{{itemDetailData.release}}</span>
        </div>
      </header>
      <div class="details-body">
        <div v-html="itemDetailData.description" class="details-body-main"></div>
      </div>
      <footer class="details-footer">
        <buttonsReactions />
        <div class="button-search">
          <a href="./" class="button button_border">上映館を探す</a>
        </div>
      </footer>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.page-detail {
  container-type: inline-size;
  container-name: detailView;
  position: fixed;
  top: settings.$sizeH_globalHeader;
  height: calc(100cqh - #{settings.$sizeH_globalHeader});
  left: 0;
  right: 0;
  z-index: settings.$layer-detail;
  padding: settings.$spacer-min settings.$spacer-min * 2;
  background: settings.$theme-main-background;
}

$size-close-button: 44px;
.button_close{
  position: absolute;
  top: settings.$spacer-min;
  right: settings.$spacer-min * 2;
  display: block;
}

.section-detail {
  $spacer-top: $size-close-button + settings.$spacer-min * 3;
  display: grid;
  grid-template-areas:
    "header"
    "body"
    "footer";
  grid-template-rows: auto 1fr auto;
  height: calc(100% - #{$spacer-top});
  margin-top: $spacer-top;
  overflow: hidden;
}

.details-header {
  grid-area: header;
  margin-bottom: settings.$spacer-min*4;
}

.details-body {
  grid-area: body;
  overflow: scroll;
}

.details-footer {
  grid-area: footer;
  margin-top: settings.$spacer-min*4;
}

.movie-title {
  @include settings.lettring_movieTitle;
  margin-bottom: settings.$spacer-min*2;
}

.button-search{
  margin-top: settings.$spacer-min*2;
}
</style>