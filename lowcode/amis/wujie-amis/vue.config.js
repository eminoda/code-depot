const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    externals: {
      amis: "amisRequire",
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "node_modules/amis/sdk"),
            to: path.resolve(__dirname, "public/sdk/"),
          },
        ],
      }),
    ],
  },
  devServer: {
    devMiddleware: { writeToDisk: true },
    proxy: {
      "/amis": {
        target: "https://aisuda.bce.baidu.com/",
        changeOrigin: true,
      },
    },
  },
});
