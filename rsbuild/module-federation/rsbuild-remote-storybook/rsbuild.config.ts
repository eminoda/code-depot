import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { dependencies as deps } from "./package.json";

export default defineConfig({
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
    assetPrefix: "http://localhost:2003",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: "remote_storybook",
          exposes: {
            // ".": "./src/stories/index.tsx",
            ".": "./src/components/index.ts",
          },
          shared: {
            react: { eager: true, singleton: true, requiredVersion: deps.react },
            "react-dom": { eager: true, singleton: true, requiredVersion: deps["react-dom"] },
          },
        }),
      ],
    },
  },
});
