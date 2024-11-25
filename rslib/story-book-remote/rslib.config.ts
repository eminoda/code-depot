import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  // source: {
  //   entry: {
  //     index: ["./src/**"],
  //   },
  // },
  lib: [
    // {
    //   bundle: false,
    //   dts: true,
    //   format: "esm",
    // },
    {
      bundle: false,
      dts: true,
      format: "mf",
      output: {
        distPath: {
          root: "./dist/mf",
        },
        // for production, add online assetPrefix here
        assetPrefix: "http://localhost:2000/mf",
      },
      // for Storybook to dev
      dev: {
        assetPrefix: "http://localhost:2008/mf",
      },
      // for Storybook to dev
      server: {
        port: 2008,
      },
      plugins: [
        pluginModuleFederation({
          name: "remote_storybook",
          exposes: {
            "./Button": "./src/Button",
          },
          // can not add 'remote' here, because you may build 'esm' or 'cjs' assets in one build.
          // if you want the Rslib package use remote module, please see below.
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
  ],
  output: {
    target: "web",
  },
  plugins: [
    pluginReact({
      fastRefresh: true,
      swcReactOptions: {
        runtime: "classic",
      },
    }),
  ],
});
