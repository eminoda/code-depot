const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    target: "web",
    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        remotes: {
          ComponentA: "remote_component_a_vue2@http://localhost:3001/remoteEntry.js",
          ComponentB: "remote_component_b_react@http://localhost:3002/remoteEntry.js",
        },
        shared: { react: { singleton: true }, "react-dom": { singleton: true } },
      }),
    ],
  },
});
