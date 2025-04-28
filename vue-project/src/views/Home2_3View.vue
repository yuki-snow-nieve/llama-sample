<script setup>
import BoxFeature from '../components/home/BoxFeature2_1.vue';
import BoxPickup from '../components/home/BoxPickupSwiper.vue';
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

let show = true;

const emit = defineEmits(['itemClicked']);

const transition = (el) => {
  emit('itemClicked', 'hometoplay', el);
};
</script>

<template>
  <main class="main page-index">
    <section id="listCanvas" class="section-movies">
      <transition name="t-list" :duration="550">
        <div v-if="show" class="list-wrapper">
          <div class="list-features">
            <BoxPickup
              :id="pickupData.feature_id"
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
      </transition>
    </section>
  </main>
</template>

<style>

</style>
