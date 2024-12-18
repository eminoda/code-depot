import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      // index: ["./src/**"],
      rruntime: "./src/rruntime.ts",
      vruntime: "./src/vruntime.ts",
    },
  },
  lib: [
    {
      bundle: true,
      dts: true,
      format: "umd",
      umdName: "RuntimeAll",
    },
  ],
  output: {
    target: "web",
  },
  plugins: [pluginReact()],
});
