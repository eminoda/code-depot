import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  html: { title: "rsbuild-remote-two" },
  server: {
    port: 2002,
  },
  dev: {
    writeToDisk: true,
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2002",
  },
  plugins: [pluginVue()],
  tools: {
    rspack: {
      resolve: {
        // 与内置的 resolve.extensions 合并
        extensions: [".vue"],
      },
      plugins: [
        new ModuleFederationPlugin({
          name: "remote_two",
          exposes: {
            "./App": "./src/App.vue",
            // "./App": "./src/util.ts",
          },
          shared: {
            vue: {
              singleton: true,
            },
          },
          // dts: {
          //   generateTypes: {
          //     compilerInstance: "vue-tsc",
          //   },
          // },
        }),
      ],
    },
  },
});
