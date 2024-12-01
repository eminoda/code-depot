import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { dependencies as deps } from "./package.json";

export default defineConfig({
  source: {
    entry: {
      // index: "./src/components/index.ts",
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
  output: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:8001",
  },
  plugins: [pluginReact()],
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
    bundleAnalyze: {
      analyzerMode: "static",
      openAnalyzer: false,
      // Distinguish by environment names, such as `web`, `node`, etc.
      reportFilename: `report-web.html`,
    },
  },
  tools: {
    rspack: {
      // externals: {
      //   echarts: "echarts",
      //   xlsx: "xlsx",
      // },
      // externals: {
      //   // amis: "amis",
      // },
      // externals: {
      //   react: "react",
      //   "react-dom": "react-dom",
      //   axios: "axios",
      // },
      plugins: [
        new ModuleFederationPlugin({
          name: "remote_storybook",
          exposes: {
            ".": "./src/components/index.ts",
            "./Button": "./src/components/Button",
            "./List": "./src/components/List",
            "./Tabs": "./src/components/Tabs",
            "./Form": "./src/components/Form.ts",
            "./Controller": "./src/components/Controller.ts",
            "./InputBox": "./src/components/InputBox.ts",
            // "./InputText": "./src/components/InputText.tsx",
          },
          shared: {
            react: { singleton: true, requiredVersion: deps.react },
            "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
            axios: { singleton: true, requiredVersion: deps["axios"] },
            "react-hook-form": { eager: true, singleton: true, requiredVersion: deps["react-hook-form"] },
            // amis: { singleton: true, requiredVersion: deps["amis"] },
          },
          // shared: ["react", "react-dom", "axios"],
        }),
      ],
    },
  },
});
