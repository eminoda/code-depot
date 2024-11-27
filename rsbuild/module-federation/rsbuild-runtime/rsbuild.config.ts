import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  source: {
    entry: {
      runtime: "./src/runtime.ts",
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      output: {
        library: "runtime",
        libraryTarget: "umd",
        filename: "runtime.js",
        globalObject: "this",
      },
    },
  },
});
