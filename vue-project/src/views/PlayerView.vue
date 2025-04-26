<script>
import pickupData from '@/assets/tempData/pickupItems.json';
import itemsData from '@/assets/tempData/items.json';

export default {
  data() {
    return {
      feature: {},
      initialActive: Number,
    };
  },
  beforeRouteEnter(to, from, next) {
    const ids = to.path.split('/');
    const feature_id = ids.at(-2);
    const item_id = ids.at(-1);

    let feature = {};
    let activeItemOrder = 0;

    if (feature_id === 'pickup') {
      feature = pickupData;
    } else {
      feature = itemsData.filter((d) => {
        return d.feature_id === feature_id;
      })[0];
    }

    for (var i = 0; i < feature.items.length; i++) {
      if (feature.items[i].item_id == item_id) {
        activeItemOrder = i;
        break;
      }
    }

    next((vm) => vm.setData(feature, activeItemOrder));
  },
  mounted() {},
  methods: {
    setData(feature, activeOrder) {
      this.feature = feature;
      this.initialActive = activeOrder;
    },
  },
};
</script>

<template>
  <main class="main page-player">
    <section id="listCanvas" class="section-movies">
      <BoxFeature
        v-for="feature in itemsData"
        :key="feature.feature_id"
        :id="feature.feature_id"
        :title="feature.title"
        :items="feature.items"
        class="swiper-slide"
        @itemClicked="transition"
      />
    </section>
    <RouterView />
  </main>
</template>

<style scoped>
.movie-item {
  contain: paint;
}
</style>
