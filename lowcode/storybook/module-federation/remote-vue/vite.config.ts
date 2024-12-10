import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    origin: "http://localhost:2002",
    port: 2002,
  },
  base: "http://localhost:2002",
  plugins: [
    vue(),
    federation({
      name: "remote_two",
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
        "./R2Button": "./src/components/R2Button.vue",
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
