import { renameDocument, saveDocument } from '@/client/client';
import router from '@/router';
import { useDocumentStore } from '@/stores/document';
import { useNodesStore } from '@/stores/nodes';
import { useSettingsStore } from '@/stores/settings';
import { nextTick, ref } from 'vue';

export function useNodeForm() {
  const nodesStore = useNodesStore();
  const documentStore = useDocumentStore();
  const settingsStore = useSettingsStore();

  const active = ref(false);

  async function init(selector) {
    active.value = true;
    await nextTick();
    document.querySelector(selector).focus();
  }

  function create(e, path = null) {
    const value = e.target.value;
    active.value = false;
    if (value) {
      path = path
        ? path + '/' + value
        : value;
      saveDocument(path).then(async () => {
        await nodesStore.refresh();
        router.push('/' + path);
        const node = nodesStore.selectNode(path.split('/'));
        if (node !== null) {
          documentStore.select(node);
        }
        settingsStore.saveExplorerExpanded(nodesStore.getExpanded());
      });
    }
  }

  function edit(e, path) {
    const value = e.target.value;
    active.value = false;
    renameDocument(path, value).then(async () => {
      // Update expanded nodes with new name
      const expanded = settingsStore.explorerExpanded;
      let exp = expanded;
      const pathParts = path.split('/');
      const filename = pathParts.pop();
      for (let i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i];
        if (!exp[pathPart]) {
          break;
        }
        exp = exp[pathPart];
      }
      if (exp[filename]) {
        exp[value] = exp[filename];
        delete exp[filename];
        settingsStore.saveExplorerExpanded(expanded);
      }

      await nodesStore.refresh();

      // If renamed currently editing node, update location and reselect
      let currentPath = fileStore.file.path;
      if (currentPath === path) {
        currentPath = currentPath.split('/');
        currentPath.pop();
        currentPath.push(value);

        router.push('/' + currentPath.join('/'));
        const node = nodesStore.selectNode(currentPath);
        if (node !== null) {
          documentStore.select(node);
        }
      }
    });
  }

  return { active, init, create, edit };
}
