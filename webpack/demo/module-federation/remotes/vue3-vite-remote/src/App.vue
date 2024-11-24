<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div>
    <h2>vue3 vite remote</h2>
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped></style>
