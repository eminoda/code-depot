import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: {
      "/amis": {
        target: "https://aisuda.bce.baidu.com",
        changeOrigin: true,
      },
    },
  },
});
