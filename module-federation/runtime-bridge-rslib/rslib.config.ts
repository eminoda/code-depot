import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: ["./src/index.tsx"],
    },
  },
  lib: [
    // {
    //   format: "umd",
    //   umdName: "Runtime",
    //   bundle: true,
    //   dts: false,
    //   autoExternal: {
    //     dependencies: false,
    //     peerDependencies: false,
    //     // devDependencies: false,
    //   },
    // },
    {
      format: "esm",
      autoExternal: {
        dependencies: false,
      },
    },
  ],
  output: {
    target: "web",
    distPath: {
      root: "../host-demo-react/public/runtime-lib",
    },
    cleanDistPath: true,
    // externals: {
    //   react: "React",
    //   "react-dom": "ReactDOM",
    // },
  },
  plugins: [pluginReact()],
});
