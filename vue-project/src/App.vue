<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import GlobalHeader from './components/global/Header.vue';
</script>

<template>
  <GlobalHeader />
  <RouterView v-slot="{ Component }">
    <component :is="Component" :key="$route.path" @itemClicked="transition" />
  </RouterView>
</template>

<style lang="scss">
@use 'sass:math';
@use '@/sass/settings.scss';

#app > .main {
  width: 100%;
  max-width: math.div(100vh * 9, 16);
}
</style>
