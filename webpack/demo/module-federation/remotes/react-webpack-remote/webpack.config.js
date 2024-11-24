const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");

const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    // new ModuleFederationPlugin({
    //   name: "remote_component_b_react",
    //   filename: "remoteEntry.js",
    //   exposes: {
    //     "./App": "./src/App",
    //   },
    //   // shared: { react: { singleton: true } },
    //   shared: { react: { singleton: true, requiredVersion: deps.react }, "react-dom": { singleton: true, requiredVersion: deps["react-dom"] } },
    // }),
    new ModuleFederationPlugin({
      name: "react_webpack_remote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
