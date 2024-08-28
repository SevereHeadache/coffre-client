<script setup>
import { ref } from 'vue';

const props = defineProps({
  fontSize: {
    type: Number,
    default: 16,
  },
  min: {
    type: Number,
    default: 8,
  },
  max: {
    type: Number,
    default: 99,
  },
});
const size = ref(props.fontSize);

const emit = defineEmits(['changeFontSize']);

function change() {
  const val = parseInt(size.value);
  if (isNaN(val) || val < props.min) {
    size.value = props.min;
  } else if (val > props.max) {
    size.value = props.max;
  } else {
    size.value = val;
  }
  emit('changeFontSize', size.value);
}
</script>

<template>
  <input
    class="fontsize-field"
    v-model="size"
    @change="change"
    @keyup.enter="(e) => { e.currentTarget.blur() }"
  />
</template>

<style scoped>
@import '@/assets/fontSizeAction.css';
</style>
