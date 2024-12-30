import { pluginVue } from "@rsbuild/plugin-vue";
// import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      vruntime: "./src/vruntime",
    },
  },
  lib: [
    {
      bundle: true,
      dts: true,
      format: "umd",
      umdName: 'RuntimeBridgeVue',
    },
  ],
  output: {
    target: "web",
    distPath: {
      // root: "../../host-demo-vue/public",
      root: "../../host-demo-react/public",
    },
    externals: {
      vue: "Vue",
    },
    // cleanDistPath: true,
  },
  // plugins: [pluginReact(), pluginVue()],
  plugins: [pluginVue()],
});
