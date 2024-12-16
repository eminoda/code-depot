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
    assetPrefix: "http://localhost:3000/remote_react_rsbuild",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "remote_react_rsbuild",
      exposes: {
        "./Button": "./src/components/Button.tsx",
        "./Modal": "./src/components/Modal.tsx",
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
        "antd": {
          singleton: true,
          requiredVersion: "^5.22.4",
          version: "5.22.4",
        },
        "axios": {
          singleton: true,
          requiredVersion: "^1.7.9",
          version: "1.7.9",
        },
      },
    }),
  ],
});
