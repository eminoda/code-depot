import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
// import { pluginDts } from "rsbuild-plugin-dts";
import path from "path";
export default defineConfig({
  source: {
    entry: {
      sdk: "./src/runtime-entry.ts",
    },
  },
  resolve: {
    alias: {
      // "react-router-dom": "./node_modules/@module-federation/bridge-react/dist/router-v6.es.js",
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
      // strategy: "split-by-module",
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
      // externalsType: "commonjs",
      externals: {
        // react: "React",
        // "react-dom": "ReactDOM",
        // "react-router-dom": "ReactRouterDOM",
      },
      output: {
        path: path.resolve("../../helloworld-react/public/runtime/"),
        clean: true,
        library: "RuntimeLib",
        filename: "[name].bundle.js",
        libraryTarget: "umd",
        libraryExport: "default",
      },
    },
  },
});
