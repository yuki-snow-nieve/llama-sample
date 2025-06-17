<script setup>
import BoxFeature from '../components/home/BoxFeature2_3.vue';
import BoxPickup from '../components/home/BoxPickup_box.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

</script>

<template>
  <main class="main page-index">
    <section id="listCanvas" class="section-movies">
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

<style>

</style>
