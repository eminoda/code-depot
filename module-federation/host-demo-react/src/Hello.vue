<template>
  <div>
    Vue Code
    <button @click="add">count: {{ count }}</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
const add = () => {
  count.value += 1;
};
</script>
<style scoped lang="less"></style>
