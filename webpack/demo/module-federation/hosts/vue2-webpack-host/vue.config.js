const { defineConfig } = require("@vue/cli-service");
// const { ModuleFederationPlugin } = require("webpack").container;
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");
const deps = require("./package.json").dependencies;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8001,
  },
  publicPath: "auto",
  configureWebpack: {
    target: "web",
    plugins: [
      // new ModuleFederationPlugin({
      //   name: "host",
      //   remotes: {
      //     Vue2WebpackRemote: "vue2_webpack_remote@http://localhost:3001/remoteEntry.js",
      //   },
      //   shared: ["vue"],
      // }),
      new ModuleFederationPlugin({
        name: "host",
        remotes: {
          Vue2WebpackRemote: "vue2_webpack_remote@http://localhost:3001/remoteEntry.js",
          ReactWebpackRemote: "react_webpack_remote@http://localhost:3002/remoteEntry.js",
          Vue3ViteRemote: "vue3_vite_remote@http://localhost:3003/remoteEntry.js",
        },
        shared: {
          vue: { singleton: true },
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      }),
    ],
  },
});
