import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      filename: "remoteEntry.js",
      name: "ComponentC",
      exposes: {
        "./App": "./src/App.tsx",
      },
      remotes: {},
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
});
