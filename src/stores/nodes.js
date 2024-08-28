import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getDocuments } from '@/client/client';
import { useSettingsStore } from '@/stores/settings';

export const useNodesStore = defineStore('nodes', () => {
  const settingsStore = useSettingsStore();

  const nodes = ref([]);

  async function refresh() {
    await getDocuments().then((response) => {
      nodes.value = response.data;
      expand(settingsStore.explorerExpanded);
    });
  }

  function expand(data, collection = nodes.value) {
    for (const toExpand in data) {
      if (collection[toExpand]) {
        collection[toExpand].expanded = true;
        const children = collection[toExpand].children;
        if (children) {
          expand(data[toExpand], collection[toExpand].children);
        }
      }
    }
  }

  function selectNode(path) {
    let collection = nodes.value;
    let result = null;
    path.forEach(pathPart => {
      for (const key in collection) {
        if (key === pathPart) {
          result = collection[key];
          collection = result.children;
          if (collection) {
            result.expanded = true;
          }
          break;
        }
      }
    });

    return result;
  }

  function getExpanded(collection = nodes.value) {
    const result = {};
    for (const key in collection) {
      const node = collection[key];
      if (node.expanded) {
        result[key] = {};
        if (node.children) {
          result[key] = getExpanded(node.children);
        }
      }
    }

    return result;
  }

  return {
    nodes,
    refresh,
    selectNode,
    getExpanded,
  };
});
