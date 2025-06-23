<script setup>
import BoxFeature from '@/components/home/BoxFeature_scroll.vue';
import BoxPickup from '@/components/home/BoxPickup_box.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';
</script>

<template>
  <main class="main page-index">
    <section class="section-movies">
      <div class="list-wrapper">
        <div class="list-features">
          <BoxPickup
            v-for="item in pickupData.items"
            :key="item.item_id"
            :item_id="item.item_id"
            :title="item.title"
            :items="item.items"
            :feature_id="pickupData.feature_id"
          />
          <BoxFeature
            v-for="feature in itemsData"
            :key="feature.feature_id"
            :id="feature.feature_id"
            :title="feature.title"
            :items="feature.items"
            class=""
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.list-features :deep(.movie-item) {
  /* スクロールアニメーションの設定 */
  transform-style: preserve-3d;
  animation: rolling_out linear both; /* アニメーションを指定。イージングはlinear。animation-fill-modeはboth */
  animation-timeline: view();
  animation-range: 20%; /* 開始: 要素がビューポートに完全に入った時、終了: ビューポートの真ん中 */
}

@keyframes rolling_out {
  0% {
    transform: rotateX(-60deg) translateY(-20px);
  }
  25% {
    transform: rotateX(0) translateY(0);
  }
  75% {
    transform: rotateX(0) translateY(0);
  }
  100% {
    transform: rotateX(60deg) translateY(20px);
  }
}

</style>
