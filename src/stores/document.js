import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getDocumentContents, saveDocument } from '@/client/client';

export const useDocumentStore = defineStore('document', () => {
  const document = ref(null);

  function select(document) {
    getDocumentContents(document.path)
      .then((response) => {
        this.document = document;
        this.document.content = response.data;
      });
  }

  function save(content = null) {
    if (this.document !== null) {
      saveDocument(this.document.path, content, true);
    }
  }

  return {
    document,
    select,
    save,
  };
});
