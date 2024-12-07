import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { link } from "fs";
import path from "path";
export default defineConfig({
  source: {
    entry: {
      sdk: "./src/bootstrap.ts",
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
      // strategy: "split-by-module",
    },
  },
  output: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2000/runtime",
    distPath: {
      root: path.resolve("../mf-host/public/runtime"),
    },
    cleanDistPath: path.resolve("../mf-host/public/runtime"),
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      output: {
        library: "RuntimeLib",
        filename: "[name].bundle.js",
        libraryTarget: "umd",
        libraryExport: "default",
      },
    },
  },
});
