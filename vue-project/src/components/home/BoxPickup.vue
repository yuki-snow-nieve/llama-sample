<script setup>
defineProps({
  id: String,
  title: String,
  movie: String,
  feature_id: String,
});
</script>

<template>
  <div>
    <RouterLink :to="`/player/${feature_id}/${id}`">
      <img
        :src="`https://img.youtube.com/vi/${id}/maxresdefault.jpg`"
        :alt="title"
      />
    </RouterLink>
  </div>
</template>
