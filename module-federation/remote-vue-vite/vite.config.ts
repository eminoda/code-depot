import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    origin: "http://localhost:3001",
    port: 3001,
  },
  base: "http://localhost:3001",
  plugins: [
    vue(),
    federation({
      name: "remote_vue_vite",
      manifest: true,
      // remotes: {
      //   esm_remote: {
      //     type: "module",
      //     name: "esm_remote",
      //     entry: "https://[...]/remoteEntry.js",
      //   },
      //   var_remote: "var_remote@https://[...]/remoteEntry.js",
      // },
      exposes: {
        "./Button": "./src/components/Button.vue",
      },
      // shared: {
      //   react: {
      //     singleton: true,
      //   },
      //   "react/": {
      //     singleton: true,
      //   },
      // },
    }),
  ],
});
