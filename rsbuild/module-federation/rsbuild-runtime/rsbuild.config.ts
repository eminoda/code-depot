import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      // externals: {
      //   react: "react",
      //   "react-dom": "react-dom",
      //   amis: "amis",
      //   axios: "axios",
      // },
    },
  },
});
