<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    :class="['hint--left', 'action-main']"
    :style="{ fill: 'var(--color-text)' }"
    :aria-label="title"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
@import 'hint.css/hint.min.css';
@import '@/assets/action.css';
</style>