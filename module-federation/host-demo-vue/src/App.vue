<template>
  <!-- <Suspense> -->
  <div class="content">
    <h1>Rsbuild with Vue</h1>
    <p>Start building amazing things with Rsbuild.</p>
    <!-- <Suspense> -->
      <RemoteReactRsbuildButton name="I'm vue remote component" />
    <!-- </Suspense> -->
  </div>
  <!-- </Suspense> -->
</template>

<script setup lange="ts">
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { defineAsyncComponent } from "vue";
import * as Vue from "vue";
import RuntimeAll from "RuntimeAll";

const options = {
  name: "host_vue",
  remotes: [
    {
      name: "remote_vue_rsbuild",
      entry: "http://localhost:3001/mf-manifest.json",
    },
  ],
  shared: {
    vue: {
      version: "3.5.13",
      lib: () => Vue,
      shareConfig: { singleton: true, requiredVersion: "3.5.13" },
    },
  },
};

const runtime = new RuntimeAll(options);

init(options);

const RemoteReactRsbuildButton = runtime.loadRemoteComponent("remote_vue_rsbuild/Button");
// const RemoteReactRsbuildButton = defineAsyncComponent(()=> loadRemote("remote_vue_rsbuild/Button"))
console.log(RemoteReactRsbuildButton);
</script>
<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
