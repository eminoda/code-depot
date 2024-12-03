import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    template: "./static/index.html",
    title: "hello",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      externals: {
        // react: "React",
        // "react-dom": "ReactDOM",
      },
    },
  },
});
