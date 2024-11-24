import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3004,
  },
  plugins: [
    react(),
    federation({
      filename: "remoteEntry.js",
      name: "react_vite_remote",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
});
