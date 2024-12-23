<template>
  <!-- <Button :type="props.type">{{ props.name }}</Button> -->
  <div>{{ props.name }}</div>
</template>

<script setup lang="ts">
// import { Button } from "ant-design-vue";
const props = defineProps({
  type: String,
  name: String,
});
</script>

<style scoped></style>
