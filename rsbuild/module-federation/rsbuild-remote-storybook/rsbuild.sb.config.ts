import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTailwindCSS } from "rsbuild-plugin-tailwindcss";

export default defineConfig({
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
    assetPrefix: "http://localhost:2003",
  },
  tools: {
    postcss: {
      postcssOptions: {
        config: true,
      },
    },
  },
  plugins: [
    pluginTailwindCSS({
      config: "./tailwind.config.js",
    }),
    pluginReact(),
  ],
});
