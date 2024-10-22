import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      // sw （首次）安装
      if (registration.installing) {
        console.log("[main] sw installing");
      } else if (registration.waiting) {
        console.log("[main] sw waiting");
      }
      // sw 已安装
      else if (registration.active) {
        console.log("[main] sw active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();
