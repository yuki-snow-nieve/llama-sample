<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <header class="global-header">
    <h1 class="logo">
      <img src="@/assets/brand/logo_llama.svg" alt="トレラマ" class="logo-llama" />
      <img src="@/assets/brand/logo_text.svg" alt="トレーラーマニア" class="logo-text" />
    </h1>
    <div>
      <button>Join Us!</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '/src/sass/_settings.scss';

.global-header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  z-index: settings.$layer-globalHeader;
  height: settings.$sizeH_globalHeader;
  background-color: rgba(settings.$theme-main-background, 0.66);
  background: rgba(settings.$theme-main-background, 0.86);
  font-weight: bold;
  color: #999999;

  // + .main {
  //   margin-top: settings.$sizeH_globalHeader;
  // }
}

.logo {
  display: flex;
  align-items: center;
  gap: 6px;
  height: inherit;
  padding: 2px 4px;

  .logo-llama, .logo-text {
    height: inherit;
  }

  .logo-text {
    height: 60%;
  }
}
</style>
