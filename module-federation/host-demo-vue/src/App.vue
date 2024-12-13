<script setup lang="ts">
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { defineAsyncComponent } from "vue";

const options = {
  name: "host_vue",
  remotes: [
    {
      name: "remote_vue_vite",
      entry: "http://localhost:3001/mf-manifest.json",
    },
  ],
  shared: {
    // react: {
    //   version: "18.3.1",
    //   lib: () => React,
    //   // shareConfig: { singleton: true, requiredVersion: "18.5" },
    // },
    // "react-dom": {
    //   version: "18.3.1",
    //   lib: () => ReactDOM,
    //   // shareConfig: { singleton: true, requiredVersion: "18.5" },
    // },
  },
};

init(options);

const RemoteReactRsbuildButton = defineAsyncComponent(() => loadRemote("remote_vue_vite/Button"));
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1>host_vue</h1>
  <h2>remote_vue_vite</h2>
  <RemoteReactRsbuildButton type="primary" name="hello" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
