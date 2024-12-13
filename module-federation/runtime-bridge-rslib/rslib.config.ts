import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: ["./src/index.ts"],
    },
  },
  lib: [
    {
      format: "umd",
      umdName: "Runtime",
      bundle: true,
      dts: false,
      // format: 'esm',
      autoExternal: {
        dependencies: false,
        peerDependencies: false,
        devDependencies: false,
      },
    },
  ],
  output: {
    target: "web",
    distPath: {
      root: "../host-demo-react/public",
    },
    cleanDistPath: true,
  },
  plugins: [pluginReact()],
});
