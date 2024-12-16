import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
export default defineConfig({
  server: {
    port: 2000,
  },
  html: {
    template: "./static/index.html",
    title: "hello",
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
  plugins: [pluginReact()],
});
