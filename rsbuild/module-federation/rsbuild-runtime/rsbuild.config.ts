import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  html: {
    template: "./static/index.html",
    title: "runtime",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      externals: {
        react: "React",
        "react-dom": "ReactDOM",
        // amis: "amis",
        // axios: "axios",
      },
      plugins: [
        // new ModuleFederationPlugin({
        //   name: "host",
        //   remotes: {
        //     remote_storybook: "remote_storybook@http://127.0.0.1:2003/mf-manifest.json",
        //   },
        // }),
      ],
    },
  },
});
