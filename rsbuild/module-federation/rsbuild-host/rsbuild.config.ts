import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  html: {
    title: "rsbuild-host",
  },
  server: {
    port: 2000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2000",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            remote_one: "remote_one@http://localhost:2001/mf-manifest.json",
            remote_two: "remote_two@http://localhost:2002/mf-manifest.json",
            remote_storybook: "remote_storybook@http://localhost:2003/mf-manifest.json",
          },
          shared: {
            react: {
              singleton: true,
            },
            vue: {
              singleton: true,
            },
            "react-dom": {
              singleton: true,
            },
          },
          runtimePlugins: ["./src/error-runtime-plugin.ts"],
        }),
      ],
    },
  },
});
