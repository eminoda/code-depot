import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  server: {
    port: 3001,
  },
  dev: {
    assetPrefix: "http://localhost:3001",
  },
  output: {
    assetPrefix: "http://localhost:3000/dist",
    // externals: {
    //   vue: "Vue",
    // },
  },
  plugins: [
    pluginVue(),
    pluginModuleFederation({
      name: "remote_vue_rsbuild",
      exposes: {
        "./Button": "./src/exposes/Button",
        "./Table": "./src/exposes/Table",
        "./Modal": "./src/exposes/Modal",
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: "^3.5.13",
          version: "3.5.13",
        },
        "ant-design-vue": {
          singleton: false,
          requiredVersion: "^4.2.0",
          version: "4.2.6",
        },
      },
    }),
  ],
});
