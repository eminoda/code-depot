import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  html: {
    template: "./static/index.html",
    title: "hello",
  },
  tools: {
    rspack: {
      externals: {
        RuntimeLib: "RuntimeLib",
        react: "React",
        "react-dom": "ReactDOM",
        // "react-router-dom": "ReactRouterDOM",
      },
    },
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "host",
      remotes: {
        remote_one: "remote_one@http://127.0.0.1:2001/mf-manifest.json",
      },
    }),
  ],
});
