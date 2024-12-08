import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  server: {
    port: 2008,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:2008",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        // new ModuleFederationPlugin({
        //   name: "remote_sb",
        //   exposes: {
        //     // "./Title": "./src/components/Title.tsx",
        //     // "./List": "./src/components/List.tsx",
            
        //     ".": "./src/components/index.ts",
        //   },
        //   shared: {
        //     react: {
        //       singleton: true,
        //     },
        //     "react-dom": {
        //       singleton: true,
        //     },
        //   },
        // }),
      ],
    },
  },
});
