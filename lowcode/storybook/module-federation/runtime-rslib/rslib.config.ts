import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/index.ts'],
    },
  },
  lib: [
    {
      format: 'umd',
      umdName: 'Runtime',
      bundle: true,
      dts: true,
      // format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
});
