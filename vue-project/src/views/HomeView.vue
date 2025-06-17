<script setup>
import BoxFeature from '../components/home/BoxFeature.vue';
import BoxPickup from '@/components/home/BoxPickup.vue';
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
        <div v-if="show" class="list-wrapper swiper">
          <div class="list-features">
            <BoxPickup
              v-for="item in pickupData.items"
              :key="item.item_id"
              :id="item.item_id"
              :title="item.title"
              :feature_id="pickupData.feature_id"
              class="movie-item"
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
.t-list-enter-active,
.t-list-leave-active {
  transition: opacity 0.5s ease;
}

.t-list-enter-from,
.t-list-leave-to {
  opacity: 0;
}
</style>
