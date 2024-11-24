import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  server: {
    port: 2001,
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: "rs_remote",
          exposes: {
            "./App": "./src/App.tsx",
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
