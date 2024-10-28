import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: "index.html",
        background: "src/background.tsx",
      },
      output: {
        entryFileNames: "[name].js", // 静态资源文件命名规则
      },
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: "manifest.json", dest: "./" }],
    }),
  ],
});
