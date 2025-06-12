import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  html: {
    title: "React Amis",
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  server: {
    proxy: {
      "/amis": {
        target: "https://aisuda.bce.baidu.com",
        changeOrigin: true,
      },
    },
    open: false
  },
});
