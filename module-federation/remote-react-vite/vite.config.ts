import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    origin: "http://localhost:2002",
    port: 2002,
  },
  base: "http://localhost:2002",
  plugins: [
    react(),
    federation({
      name: "remote_react_vite",
      manifest: true,
      exposes: {
        "./Button": "./src/components/Button",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.3.0",
          version: "18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.0",
          version: "18.3.1",
        },
      },
    }),
  ],
});
