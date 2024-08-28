<script setup>
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const props = defineProps({
  element: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    default: 50,
  },
});

function startResize() {
  document.body.style.cursor = 'col-resize';
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', endResize);
}

function resize(e) {
  const $el = document.getElementById(props.element);
  const width = (e.clientX - $el.offsetLeft);
  $el.style.width = (width < props.min ? props.min : width) + 'px';
}

function endResize() {
  const width = document.getElementById(props.element).style.width;
  settingsStore.saveExplorerWidth(parseInt(width));
  document.body.style.cursor = '';
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', endResize);
}
</script>

<template>
  <div>
    <div id="resizer-main" @mousedown="startResize" />
  </div>
</template>

<style scoped>
@import '@/assets/resizer.css';
</style>
