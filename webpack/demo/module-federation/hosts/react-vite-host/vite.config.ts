import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      // remotes: {
      //   "Vue3ViteRemote": "vue3_vite_remote@http://localhost:3003/remoteEntry.js",
      // },
      remotes: {
        ReactViteRemote: {
          type: "module",
          name: "ReactViteRemote",
          entry: "http://localhost:3004/remoteEntry.js",
          entryGlobalName: "react_vite_remote",
          shareScope: "default",
        },
        StoryBookRemote: {
          type: "module",
          name: "StoryBookRemote",
          entry: "http://localhost:3005/remoteEntry.js",
          entryGlobalName: "storyboot_remote",
          shareScope: "default",
        },
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
});
