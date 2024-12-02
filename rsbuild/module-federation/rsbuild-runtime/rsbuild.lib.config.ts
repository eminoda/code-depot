import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
// import { pluginDts } from "rsbuild-plugin-dts";

export default defineConfig({
  source: {
    entry: {
      sdk: "./src/runtime-entry.ts",
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
  output: {
    assetPrefix: "/runtime/",
  },
  plugins: [
    pluginReact(),
    // pluginDts({
    //   distPath: "./dist/dist-types",
    // }),
  ],
  tools: {
    rspack: {
      output: {
        clean: true,
        filename: "[name].bundle.js",
        library: 'RuntimeLib',
      },
    },
  },
});
