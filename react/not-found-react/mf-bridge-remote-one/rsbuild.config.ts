import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import path from "path";
import pkg from "./package.json";

const devDeps = pkg.dependencies;

export default defineConfig({
  server: {
    port: 2001,
  },
  html: {
    title: "MF Remote One",
  },
  output: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2000/mf_remote_one",
    distPath: {
      root: path.resolve("../mf-bridge-host/public/mf_remote_one"),
    },
    cleanDistPath: path.resolve("../mf-bridge-host/public/mf_remote_one"),
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "mf_remote_one",
      exposes: {
        // "./App": "./src/App.tsx",
        "./App": "./src/export-app.tsx",
      },
      // shared: ["react", "react-dom"],
      shared: [
        {
          react: {
            singleton: true,
            // version: devDeps["react"],
            version: devDeps["react"],
            requiredVersion: "^18.3.0",
          },
        },
        {
          "react-dom": {
            singleton: true,
            version: devDeps["react-dom"],
            requiredVersion: "^18.3.0",
          },
        },
      ],
    }),
  ],
});
