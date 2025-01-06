<template>
  <div class="content">
    <h1>Rsbuild with Vue</h1>
    <p>Start building amazing things with Rsbuild.</p>
    <div>
      <RemoteReactRsbuildButton name="I'm vue remote component" />
      <RemoteReactRsbuildButton name="I'm vue remote component" @click="ModalRef.show()" />
      <RemoteReactRsbuildTable />
    </div>
    <RemoteReactRsbuildModal ref="ModalRef" />
  </div>
</template>

<script setup lange="ts">
// import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { defineAsyncComponent } from "vue";
import * as Vue from "vue";
import * as Antd from "ant-design-vue";
import { ref } from "vue";
import RuntimeBridgeVue from "RuntimeBridgeVue";

console.log(Antd)
const options = {
  name: "host_vue",
  remotes: [
    {
      name: "remote_vue_rsbuild",
      // entry: "http://localhost:3001/mf-manifest.json",
      entry: "http://localhost:3000/dist/mf-manifest.json",
    },
  ],
  shared: {
    vue: {
      version: "3.5.13",
      lib: () => Vue,
      shareConfig: { singleton: true, requiredVersion: "3.5.13" },
    },
    'ant-design-vue': {
      version: "4.2.6",
      // lib: () => Antd,
      // shareConfig: { singleton: false, requiredVersion: "^4.2.0" },
    },
  },
};

const runtime = new RuntimeBridgeVue(options);
const RemoteReactRsbuildButton = runtime.loadRemoteComponent("remote_vue_rsbuild/Button", false);
const RemoteReactRsbuildTable = runtime.loadRemoteComponent("remote_vue_rsbuild/Table", false);
const RemoteReactRsbuildModal = runtime.loadRemoteComponent("remote_vue_rsbuild/Modal", false);

const ModalRef = ref<InstanceType<typeof RemoteReactRsbuildModal>>(null)
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
