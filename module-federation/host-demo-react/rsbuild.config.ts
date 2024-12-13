import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";
export default defineConfig({
  server: {
    port: 2000,
  },
  html: {
    template: "./static/index.html",
    title: "hello",
  },
  output: {
    externals: {
      runtime: "Runtime",
    },
  },
  plugins: [pluginReact()],
});
