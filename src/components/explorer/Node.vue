<script setup>
import { computed, h, ref } from 'vue';
import CaretIcon from '@/components/icons/CaretIcon.vue';
import AddIcon from '@/components/icons/AddIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import router from '@/router';
import { useDocumentStore } from '@/stores/document';
import { iconStyle, showContextMenu } from '@/context-menu/context-menu';
import { deleteDocument } from '@/client/client';
import { useNodesStore } from '@/stores/nodes';
import NodeForm from './NodeForm.vue';
import { useNodeForm } from './nodeForm';
import { useSettingsStore } from '@/stores/settings';
import EditIcon from '../icons/EditIcon.vue';

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
});

const settingsStore = useSettingsStore();
const nodesStore = useNodesStore();
const documentStore = useDocumentStore();
const nodeNewForm = useNodeForm();
const nodeRenameForm = useNodeForm();

const hidden = ref(false);

function active() {
  if (documentStore.document) {
    return props.node.path === documentStore.document.path;
  }

  return false;
}

function hasChildren() {
  if (!props.node.children) {
    return false;
  }

  return props.node.children.length !== 0;
}
const rotation = computed(() => {
  return props.node.expanded ? 180 : 0;
});

function select() {
  props.node.expanded = !props.node.expanded;
  settingsStore.saveExplorerExpanded(nodesStore.getExpanded());
  router.push('/' + props.node.path);
  documentStore.select({
    name: props.node.name,
    path: props.node.path,
  });
}

function rename(e) {
  hidden.value = false;
  nodeRenameForm.edit(e, props.node.path);
}

function onContextMenu(e) {
  showContextMenu(e, [
    {
      label: 'New',
      icon: h(AddIcon, { style: iconStyle }),
      onClick: () => {
        props.node.expanded = true;
        nodeNewForm.init('#node-new-form > input');
      },
    },
    {
      label: 'Rename',
      icon: h(EditIcon, { style: iconStyle }),
      onClick: () => {
        hidden.value = true;
        nodeRenameForm.init('#node-rename-form > input');
      },
    },
    {
      label: 'Delete',
      icon: h(DeleteIcon, { style: iconStyle }),
      onClick: () => {
        deleteDocument(props.node.path).then(() => nodesStore.refresh());
      },
    },
  ]);
}
</script>

<template>
  <div>
    <div class="node-main">
      <div
        v-show="!hidden"
        :class="['node-wrapper', { 'node-active': active() }]"
        @click="select"
        @contextmenu.prevent="onContextMenu"
      >
        <span v-if="hasChildren()" class="node-icon">
          <CaretIcon :style="{ transform: `rotate(${rotation}deg)` }" />
        </span>
        <span class="node-item-name">{{ props.node.name }}</span>
      </div>
      <NodeForm
        id="node-rename-form"
        v-if="nodeRenameForm.active.value"
        :value="props.node.name"
        @focusout="rename"
      />
      <Node
        v-show="props.node.expanded"
        v-for="child in props.node.children"
        :key="child.path"
        :node="child"
      />
      <NodeForm
        id="node-new-form"
        v-if="nodeNewForm.active.value"
        @focusout="(e) => nodeNewForm.create(e, props.node.path)"
      />
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/node.css";
</style>
