<template>
  <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { Modal as AModal } from "ant-design-vue";
console.log(123)
import { ref } from "vue";

//   const props = defineProps({
//     type: String,
//     name: String,
//   });

const open = ref<boolean>(false);

const handleOk = () => {
  open.value = false;
};

defineExpose({
  show: () => {
    open.value = true;
  },
  close: () => {
    open.value = false;
  },
});
</script>

<style scoped></style>
