<template>
  <div id="app">
    <h1>我是主项目</h1>
    <div id="wujie-container"></div>
  </div>
</template>

<script>
import { startApp } from "wujie";

export default {
  name: "App",
  mounted() {
    startApp({
      name: "wujie-amis",
      url: "http://localhost:8081",
      el: document.getElementById("wujie-container"),
    });
  },
};
</script>

<style></style>
