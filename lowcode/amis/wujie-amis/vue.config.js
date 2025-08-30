const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/subApp/audit",
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
    port: 8001,
    devMiddleware: { writeToDisk: true },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/amis": {
        target: "https://aisuda.bce.baidu.com/",
        changeOrigin: true,
      },
    },
  },
});
