<template>
  <button @click="$emit('clicked')" class="button_close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <path d="M310.7,54.7c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0l-105.3,105.4L54.6,9.5C42.1-3,21.8-3,9.3,9.5s-12.5,32.8,0,45.3l105.4,105.3L9.4,265.5c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0l105.3-105.4,105.4,105.3c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-105.4-105.3,105.3-105.4h0Z"/>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.button_close {
  $size: 44px;
  width: $size;
  height: $size;
  aspect-ratio: 1 / 1;

  svg {
    width: inherit;
    height: inherit;
    fill: currentColor;
  }
}
</style>
