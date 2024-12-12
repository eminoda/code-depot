<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { defineAsyncComponent } from "vue";

const options = {
  name: "host_storybook",
  remotes: [
    {
      name: "remote_two",
      entry: "http://localhost:2002/mf-manifest.json",
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

const RemoteReactRsbuildButton = defineAsyncComponent(() => loadRemote("remote_two/R2Button"));
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
  <RemoteReactRsbuildButton />
  <HelloWorld msg="Vite + Vue" />
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
