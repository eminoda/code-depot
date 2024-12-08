import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { link } from "fs";
import path from "path";
export default defineConfig({
  source: {
    entry: {
      sdk: "./src/bootstrap.tsx",
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
      root: path.resolve("../mf-bridge-host/public/runtime"),
    },
    cleanDistPath: path.resolve("../mf-bridge-host/public/runtime"),
  },
  plugins: [
    pluginReact({
      splitChunks: {
        react: true,
      },
    }),
  ],
  tools: {
    rspack: {
      externals: {
        // react: "react",
        // "react-dom": "react-dom",
        // "react-router-dom": "ReactRouterDOM",
      },
      output: {
        library: "RuntimeLib",
        filename: "[name].bundle.js",
        libraryTarget: "umd",
        libraryExport: "default",
      },
    },
  },
});
