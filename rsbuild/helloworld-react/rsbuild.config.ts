import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    template: "./static/index.html",
  },
  tools: {
    rspack: {
      externals: {
        runtime: "runtime",
      },
    },
  },
  plugins: [pluginReact()],
});
