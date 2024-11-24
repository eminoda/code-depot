import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3005,
  },
  plugins: [
    react(),
    federation({
      filename: "remoteEntry.js",
      name: "storyboot_remote",
      exposes: {
        "./Title": "./src/components/Title.tsx",
        // "./List": "./src/components/List.tsx",
        // "./App": "./src/App.tsx",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
});
