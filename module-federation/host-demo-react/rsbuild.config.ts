import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginVueJsx } from "@rsbuild/plugin-vue-jsx";

export default defineConfig({
  server: {
    port: 2000,
  },
  html: {
    template: "./static/index.html",
    title: "React Host App",
  },
  resolve: {
    alias: {
      "@runtime": "./public/runtime-lib/index.js",
    },
  },
  output: {
    externals: {
      // runtime: "Runtime",
      // react: "React",
      // "react-dom": "ReactDOM",
    },
  },
  plugins: [pluginVueJsx(), pluginVue(), pluginReact()],
});
