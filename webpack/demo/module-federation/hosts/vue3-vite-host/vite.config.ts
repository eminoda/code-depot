import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host",
      // remotes: {
      //   "Vue3ViteRemote": "vue3_vite_remote@http://localhost:3003/remoteEntry.js",
      // },
      remotes: {
        Vue3ViteRemote: {
          type: "module",
          name: "Vue3ViteRemote",
          entry: "http://localhost:3003/remoteEntry.js",
          entryGlobalName: "vue3_vite_remote",
          shareScope: "default",
        },
      },
      shared: { vue: { singleton: true } },
    }),
  ],
});
