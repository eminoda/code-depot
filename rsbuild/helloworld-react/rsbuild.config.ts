import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    template: "./static/index.html",
    title: "hello",
  },
  tools: {
    rspack: {
      externals: {
        "RuntimeLib": "RuntimeLib",
      },
    },
  },
  plugins: [pluginReact()],
});
