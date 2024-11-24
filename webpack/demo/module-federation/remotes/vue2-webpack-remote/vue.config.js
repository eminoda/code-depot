const { defineConfig } = require("@vue/cli-service");
// const { ModuleFederationPlugin } = require("webpack").container;
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3001,
  },
  publicPath: "auto",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      // new ModuleFederationPlugin({
      //   name: "vue2_webpack_remote",
      //   filename: "remoteEntry.js",
      //   exposes: {
      //     "./App": "./src/App",
      //   },
      //   shared: ["vue"],
      // }),
      new ModuleFederationPlugin({
        name: "vue2_webpack_remote",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.vue",
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
});
