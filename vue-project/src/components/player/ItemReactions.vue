<script setup>

</script>

<template>
  <div class="box-buttons buttons-reaction">
    <button class="button">★</button>
    <button class="button">！</button>
    <button class="button">？</button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/sass/settings.scss';

.buttons-reaction {
  justify-content: flex-end;

  .button{
    $size: 52px;
    flex: unset;
    width: $size;
    height: $size;
    border: 1px solid currentColor;
    border-radius: 50%;
  }
}
</style>
