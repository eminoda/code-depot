import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";
export default defineConfig({
  source: {
    entry: {
      SubApp: "./src/App.tsx",
    },
  },
  output: {
    assetPrefix: "/subapp/",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      externals: {
        SubApp: "SubApp",
      },
      output: {
        path: path.resolve("../main-app/public/subapp/"),
        library: "SubApp",
        filename: "[name].bundle.js",
        libraryTarget: "umd",
        libraryExport: "default",
      },
    },
  },
});
