const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "http://localhost:3001/",
  devServer: {
    port: 3001,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "remote_component_a",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        shared: ["vue"],
      }),
    ],
  },
});
