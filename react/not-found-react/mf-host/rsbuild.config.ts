import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    template: "./static/index.html",
    
    title: "MF Host",
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
  plugins: [pluginReact()],
});
