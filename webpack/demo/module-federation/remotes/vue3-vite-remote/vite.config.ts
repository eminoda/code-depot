import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3003,
  },
  plugins: [
    vue(),
    federation({
      filename: "remoteEntry.js",
      name: "vue3_vite_remote",
      exposes: {
        "./App": "./src/App.vue",
        // "./vue3": "./node_modules/vue/dist/vue.global.js",
      },
      remotes: {},
      shared: { vue: { singleton: true } },
    }),
  ],
});
