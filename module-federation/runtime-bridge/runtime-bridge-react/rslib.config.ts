import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      rruntime: ['./src/index.tsx'],
    },
  },
  lib: [
    // {
    //   bundle: false,
    //   dts: true,
    //   format: 'esm',
    // },
    {
      format: 'umd',
      umdName: 'RuntimeBridgeReact',
      bundle: true,
      dts: true,
    },
  ],
  output: {
    target: "web",
    distPath: {
      root: "../../host-demo-react/public",
    },
    // cleanDistPath: true,
  },
  plugins: [pluginReact()],
});
