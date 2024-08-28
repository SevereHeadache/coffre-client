<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});

function enter(e) {
  e.target.blur();
}
</script>

<template>
  <div>
    <input class="nodeform-main" :value="props.value" @keyup.enter="enter"/>
  </div>
</template>

<style scoped>
@import "@/assets/nodeForm.css";
</style>
