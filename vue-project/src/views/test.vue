<script setup>
  import { onMounted } from 'vue'

  onMounted(() => {
    const wrapper = document.getElementById('wrapper');
    const canvas1 = document.getElementById('test1');
    console.log(window.getComputedStyle(wrapper).getPropertyValue("--ratio_16_9_forw100per"));
    const canvas1_h = window.getComputedStyle(wrapper).getPropertyValue("--ratio_16_9_forw100per");
    console.log(canvas1_h)
    canvas1.style.height = canvas1_h;
  })


</script>

<template>

<div id="wrapper" class="wrapper">
  <div id= "test0" class="test0">base</div>
  <div id= "test1" class="test1">test1</div>
</div>

</template>

<style lang="scss" scoped>
@use 'sass:math';

.wrapper {
  padding-top: 50px;

  --ratio_16_9_forw100per: calc(50cqh + #{math.div(math.div(100cqw * 9, 16), 4)});
}

.test0 {
  background-color: #40e1bc;
  height: var(--ratio_16_9_forw100per);
}

.test1 {
  background-color: #c74299;
}

</style>
