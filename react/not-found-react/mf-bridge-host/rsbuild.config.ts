import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import path from "path";

export default defineConfig({
  html: {
    template: "./static/index.html",
    title: "MF Host",
  },
  resolve: {
    alias: {
      // '@runtime': path.resolve(__dirname, "public/runtime/sdk.bundle.js"),
    },
  },
  tools: {
    rspack: {
      externals: {
        RuntimeLib: "RuntimeLib",
        // react: "React",
        // "react-dom": "ReactDOM",
        // "react-router-dom": "ReactRouterDOM",
      },
    },
  },
  server: {
    port: 2000,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    // },
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "host",
      remotes: {
        mf_remote_one: "mf_remote_one@http://localhost:2001/mf-manifest.json",
      },
    }),
  ],
});
