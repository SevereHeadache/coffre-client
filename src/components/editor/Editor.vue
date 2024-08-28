<script setup>
import { ref } from 'vue';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import Action from '@/components/editor/Action.vue';
import PreviewIcon from '@/components/icons/PreviewIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import SaveIcon from '@/components/icons/SaveIcon.vue';
import FontSizeAction from '@/components/editor/FontSizeAction.vue';
import { useSettingsStore } from '@/stores/settings';
import { useDocumentStore } from '@/stores/document';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/hardcore.css';

const settingsStore = useSettingsStore();
const documentStore = useDocumentStore();

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';

      return hljs.highlight(code, { language }).value;
    }
  }),
);

const raw = ref(null);
const parsed = ref(null);
const preview = ref(true);

function parse() {
  parsed.value.innerHTML = marked.parse(raw.value ?? '');
}

function togglePreview() {
  preview.value = !preview.value;
}

function changeFontSize(size) {
  settingsStore.saveEditorFontSize(size);
}

function loadDocument(content) {
  raw.value = content;
  parse();
}

function saveDocument() {
  documentStore.save(raw.value);
}

function input() {
  parse();
  if (import.meta.env.VITE_AUTOSAVE === 'true') {
    saveDocument();
  }
}

documentStore.$subscribe((mutation, state) => {
  if (state.document) {
    loadDocument(state.document.content);
  }
});
</script>

<template>
  <div>
    <textarea
      id="editor-editor"
      class="editor-content-view"
      v-show="!preview"
      :style="{ fontSize: settingsStore.editorFontSize + 'pt' }"
      v-model="raw"
      @keyup="input"
    />
    <div
      id="editor-preview"
      class="editor-content-view"
      :style="{ fontSize: settingsStore.editorFontSize + 'pt' }"
      ref="parsed"
      v-show="preview"
    />
    <div id="editor-actions">
      <Action @click="togglePreview" :title="preview ? 'Edit' : 'Preview'">
        <EditIcon v-if="preview" />
        <PreviewIcon v-else />
      </Action>
      <Action :title="'Font size'">
        <FontSizeAction @changeFontSize="changeFontSize" :fontSize="settingsStore.editorFontSize" />
      </Action>
      <Action @click="saveDocument" :title="'Save'">
        <SaveIcon />
      </Action>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/editor.css';
</style>
