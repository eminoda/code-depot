import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  html: {
    title: "React Amis",
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  output: {
    assetPrefix: '/',
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024 // 10kb，對應 url-loader 的 limit=10000
              }
            }
          },
          {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            type: 'asset/resource' // 對應 file-loader
          },
          {
            test: /\.ttf$/,
            type: 'asset/resource' // 對應 file-loader
          }
        ]
      }
    }
  },
  server: {
    proxy: {
      "/amis": {
        target: "https://aisuda.bce.baidu.com",
        changeOrigin: true,
      },
    },
    open: false
  },
});
