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

<style scoped>
</style>
