import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/rspack');

export default defineConfig({
  server: {
    port: 3005,
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      output: {
        uniqueName: 'app',
      },
      plugins: [
        new ModuleFederationPlugin({
          filename: 'remoteEntry.js',
          name: 'SbRemote',
          exposes: {
            './App': './src/App.tsx',
          },
        }),
      ],
    },
  },
});
