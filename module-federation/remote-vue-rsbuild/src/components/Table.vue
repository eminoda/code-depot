<template>
  <a-table :dataSource="dataSource" :columns="columns" />
</template>

<script setup lang="ts">
import { Table as ATable } from "ant-design-vue";
// import { ref } from "vue";

//   const props = defineProps({
//     type: String,
//     name: String,
//   });

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
</script>

<style scoped></style>
