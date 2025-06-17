<script setup>
import BoxFeature from '@/components/home/BoxFeature_scroll.vue';
import BoxPickup from '@/components/home/BoxPickup_swiper.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

const emit = defineEmits(['itemClicked']);

const transition = (el) => {
  emit('itemClicked', 'hometoplay', el);
};
</script>

<template>
  <main class="main page-index">
    <section class="section-movies">
      <div class="list-wrapper">
        <div class="list-features">
          <BoxPickup
            :feature_id="pickupData.feature_id"
            :items="pickupData.items"
          />
          <BoxFeature
            v-for="feature in itemsData"
            :key="feature.feature_id"
            :id="feature.feature_id"
            :title="feature.title"
            :items="feature.items"
            class=""
            @itemClicked="transition"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style>

</style>
