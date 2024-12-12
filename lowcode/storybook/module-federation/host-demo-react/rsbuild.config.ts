import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
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
