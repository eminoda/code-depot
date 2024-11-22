<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <RemoteApp /> -->
    <div ref="remoteRef"></div>
    <ComponentA />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ReactDOM from "react-dom/client";
import { createElement } from "react";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    ComponentA: () => import("ComponentA/App"),
  },
  mounted() {
  },
};
</script>
