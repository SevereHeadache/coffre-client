<script setup>
import { h, onMounted } from 'vue';
import Node from '@/components/explorer/Node.vue';
import NodeForm from '@/components/explorer/NodeForm.vue';
import { iconStyle, showContextMenu } from '@/context-menu/context-menu';
import AddIcon from '@/components/icons/AddIcon.vue';
import { useNodesStore } from '@/stores/nodes';
import { useNodeForm } from '@/components/explorer/nodeForm';
import router from '@/router';
import { useDocumentStore } from '@/stores/document';

const documentStore = useDocumentStore();
const nodesStore = useNodesStore();
const nodeForm = useNodeForm();

function onContextMenu(e) {
  showContextMenu(e, [
    {
      label: 'New',
      icon: h(AddIcon, { style: iconStyle }),
      onClick: () => nodeForm.init('#explorer-node-form > input'),
    },
  ]);
}

onMounted(async () => {
  await nodesStore.refresh();

  let currentPath = decodeURI(router.options.history.location);
  currentPath = currentPath.substring(1);
  if (currentPath === '') {
    return;
  }
  currentPath = currentPath.split('/');

  const node = nodesStore.selectNode(currentPath);
  if (node !== null) {
    documentStore.select(node);
  }
});
</script>

<template>
  <div @contextmenu.self.prevent="onContextMenu">
      <div id="explorer-main">
        <Node
          v-for="node in nodesStore.nodes"
          :key="node.path"
          :node="node"
        />
        <NodeForm
          id="explorer-node-form"
          v-if="nodeForm.active.value"
          :style="{ 'margin-left': '0.8em' }"
          @focusout="nodeForm.create"
        />
      </div>
  </div>
</template>

<style scoped>
@import '@/assets/explorer.css';
</style>
