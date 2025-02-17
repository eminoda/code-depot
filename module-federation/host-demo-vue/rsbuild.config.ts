import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  output: {
    externals: {
      vue: "Vue",
      RuntimeBridgeVue: "RuntimeBridgeVue",
    },
  },
  html: {
    template: "./static/index.html",
    title: "Vue Host App",
  },
  plugins: [
    pluginVue(),
    pluginModuleFederation({
      name: "host",
      remotes: {
        // remote_vue_rsbuild: "remote_vue_rsbuild@http://localhost:3001/mf-manifest.json",
        remote_vue_rsbuild: "remote_vue_rsbuild@http://localhost:3000/dist/mf-manifest.json",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
