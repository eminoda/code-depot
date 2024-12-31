<template>
  <div>
    <!-- <RuntimeBridgeVueButton name="xx2x" /> -->123
  </div>
</template>
<script setup lang="ts">
import { lazyPureVueInReact } from "veaury";
import RuntimeBridgeVue from "RuntimeBridgeVue";

import { ref } from "vue";
import * as Vue from "vue";

const options = {
  name: "host_storybook",
  remotes: [
    {
      name: "remote_react_rsbuild",
      entry: "http://localhost:2001/mf-manifest.json",
    },
    // {
    //   name: "remote_react_vite",
    //   entry: "http://localhost:2002/mf-manifest.json",
    // },
    {
      name: "remote_vue_rsbuild",
      entry: "http://localhost:3001/mf-manifest.json",
    },
  ],
  shared: {
    vue: {
      version: "3.5.13",
      lib: () => Vue,
    },
  },
};

const runtimeBridgeVue = new RuntimeBridgeVue(options);
const RuntimeBridgeVueButton = runtimeBridgeVue.loadRemoteComponent("remote_vue_rsbuild/Button");


const count = ref(0);
const add = () => {
  count.value += 1;
};
</script>
<style scoped lang="less"></style>
