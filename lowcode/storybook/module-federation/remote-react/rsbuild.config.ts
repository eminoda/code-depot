import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  server: {
    port: 2001,
  },
  dev: {
    assetPrefix: "http://localhost:2001",
  },
  output: {
    assetPrefix: "http://localhost:3000/remote_one",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "remote_one",
      exposes: {
        "./R1Button": "./src/components/R1Button.tsx",
        "./R1Modal": "./src/components/R1Modal.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.3.0",
          version: "18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.0",
          version: "18.3.1",
        },
      },
    }),
  ],
});
