import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack");

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          filename: "remoteEntry.js",
          name: "SbRemote",
          exposes: {
            "./Title": "./src/components/Title.tsx",
            "./List": "./src/components/List.tsx",
          },
          shared: { react: { singleton: true }, "react-dom": { singleton: true } },
        }),
      ],
    },
  },
});
