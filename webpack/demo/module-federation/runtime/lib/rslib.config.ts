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
    //   dts: false,
    //   format: 'esm',
    // },
    {
      format: "mf",
      output: {
        distPath: {
          root: "./dist/mf",
        },
        assetPrefix: "mf",
      },
      plugins: [
        // ...
        pluginModuleFederation({
          name: "rslib_provider",
          exposes: {
            ".": "./src/index.tsx",
          },
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
      swcReactOptions: {
        runtime: "classic",
      },
    }),
  ],
});
