import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import path from "path";

export default defineConfig({
  html: { title: "rsbuild-remote-one" },
  source: {
    entry: {
      index: "./src/export-app.ts",
    },
    alias: {
      "react-router-dom$": "@module-federation/bridge-react/dist/router-v6.es.js",
    },
  },
  server: {
    port: 2001,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2001",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: "remote_one",
          exposes: {
            "./App": "./src/export-app",
          },
          shared: {
            react: {
              singleton: true,
            },
            "react-dom": {
              singleton: true,
            },
          },
        }),
      ],
    },
  },
});
