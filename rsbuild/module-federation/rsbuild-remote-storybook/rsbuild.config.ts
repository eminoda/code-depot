import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { dependencies as deps } from "./package.json";
import path from "path";
export default defineConfig({
  source: {
    entry: {
      // index: "./src/components/index.ts",
      // index: "./src/index.ts",
    },
  },
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
    assetPrefix: "http://localhost:3000/remote_storybook/",
  },
  plugins: [pluginReact()],
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
    // bundleAnalyze: {
    //   analyzerMode: "static",
    //   openAnalyzer: false,
    //   // Distinguish by environment names, such as `web`, `node`, etc.
    //   reportFilename: `report-web.html`,
    // },
  },
  tools: {
    rspack: {
      output: {
        path: path.resolve("../../helloworld-react/public/remote_storybook/"),
      },
      externals: {
        react: "React",
        "react-dom": "ReactDOM",
        // axios: "axios",
      },
      plugins: [
        new ModuleFederationPlugin({
          name: "remote_storybook",
          exposes: {
            "./Button": "./src/components/Button",
            "./List": "./src/components/List",
            "./Input": "./src/components/Input",
            "./Tabs": "./src/components/Tabs",
            "./Form": "./src/components/Form.ts",
            "./Controller": "./src/components/Controller.ts",
            "./InputBox": "./src/components/InputBox.ts",
            // "./InputText": "./src/components/InputText.tsx",
          },
          shared: {
            react: { singleton: true, requiredVersion: deps.react },
            "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
            axios: { singleton: true, requiredVersion: deps["axios"] },
            amis: { singleton: true, requiredVersion: deps["amis"] },
            // "react-hook-form": { eager: true, singleton: true, requiredVersion: deps["react-hook-form"] },
          },
        }),
      ],
    },
  },
});
