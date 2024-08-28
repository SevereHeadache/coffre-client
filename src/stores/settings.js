import { ref } from 'vue';
import { defineStore } from 'pinia';

const KEY_EDITOR_FONTSIZE = 'coffre_editorfontsize';
const KEY_EXPLORER_WIDTH = 'coffre_explorerwidth';
const KEY_EXPLORER_EXPANDED = 'coffre_explorerexpanded';

export const useSettingsStore = defineStore('settings', () => {
  const editorFontSize = ref(
    parseInt(localStorage.getItem(KEY_EDITOR_FONTSIZE) ?? 16),
  );

  function saveEditorFontSize(size) {
    editorFontSize.value = size;
    localStorage.setItem(KEY_EDITOR_FONTSIZE, size);
  }

  const explorerWidth = ref(
    localStorage.getItem(KEY_EXPLORER_WIDTH) ?? null,
  );

  function saveExplorerWidth(width) {
    explorerWidth.value = width;
    localStorage.setItem(KEY_EXPLORER_WIDTH, width);
  }

  const explorerExpandedValue = localStorage.getItem(KEY_EXPLORER_EXPANDED);
  const explorerExpanded = ref(
    explorerExpandedValue
      ? JSON.parse(explorerExpandedValue)
      : {},
  );

  function saveExplorerExpanded(nodes) {
    explorerExpanded.value = nodes;
    localStorage.setItem(KEY_EXPLORER_EXPANDED, JSON.stringify(nodes));
  }

  return {
    editorFontSize,
    saveEditorFontSize,
    explorerWidth,
    saveExplorerWidth,
    explorerExpanded,
    saveExplorerExpanded,
  };
});
