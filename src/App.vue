<script setup>
import Explorer from '@/components/explorer/Explorer.vue';
import Editor from '@/components/editor/Editor.vue';
import Resizer from '@/components/resizer/Resizer.vue';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();
</script>

<template>
  <div id="app-main">
    <div id="app-container-wrapper">
      <Explorer
        id="app-explorer-container"
        :style="{ width: settingsStore.explorerWidth + 'px' }"
      />
      <Resizer
        id="app-divider-container"
        element="app-explorer-container"
      />
      <Editor
        id="app-editor-container"
      />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/app.css';
</style>
