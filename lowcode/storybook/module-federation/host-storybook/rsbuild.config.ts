import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  server: {
    port: 2008,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2008",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "host_storybook",
      remotes: {
        remote_react_rsbuild: "remote_react_rsbuild@http://127.0.0.1:2001/mf-manifest.json",
      },
      // shared: {
      //   react: {
      //     singleton: true,
      //     requiredVersion: "^18.3.0",
      //     version: "18.3.1",
      //   },
      //   "react-dom": {
      //     singleton: true,
      //     requiredVersion: "^18.3.0",
      //     version: "18.3.1",
      //   },
      // },
    }),
  ],
  tools: {
    rspack: {
      // be attention!!!
      plugins: [],
    },
  },
});
