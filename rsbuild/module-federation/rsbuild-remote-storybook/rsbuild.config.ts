import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { dependencies as deps } from "./package.json";

export default defineConfig({
  source: {
    entry: {
      index: "./src/components/index.ts",
      // index: "./src/index.ts",
    },
  },
  html: { title: "rsbuild-remote-storybook" },
  server: {
    port: 2003,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2003",
  },
  performance: {
    chunkSplit: {
      strategy: "split-by-module",
    },
    bundleAnalyze: {
      analyzerMode: "static",
      openAnalyzer: false,
      // Distinguish by environment names, such as `web`, `node`, etc.
      reportFilename: `report-web.html`,
    },
  },

  output: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:8001",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      // externals: {
      //   echarts: "echarts",
      //   xlsx: "xlsx",
      // },
      // externals: {
      //   react: "react",
      //   "react-dom": "react-dom",
      //   "axios": "axios",
      // },
      plugins: [
        new ModuleFederationPlugin({
          name: "remote_storybook",
          exposes: {
            // ".": "./src/stories/index.tsx",
            ".": "./src/components/index.ts",
          },
          shared: {
            react: { eager: false, singleton: true, requiredVersion: deps.react },
            "react-dom": { eager: false, singleton: true, requiredVersion: deps["react-dom"] },
            axios: { eager: false, singleton: true, requiredVersion: deps["axios"] },
          },
          // shared: ["react", "react-dom", "axios"],
        }),
      ],
    },
  },
});
