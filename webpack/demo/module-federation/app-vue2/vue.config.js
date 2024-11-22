const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    target: "web",
    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        remotes: {
          ComponentA: "remote_component_a@http://localhost:3001/remoteEntry.js",
        },
        // shared: { react: { singleton: true }, "react-dom": { singleton: true } },
      }),
    ],
  },
});
