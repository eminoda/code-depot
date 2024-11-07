import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const dashboard = document.createElement("div");

document.body.prepend(dashboard);
createRoot(dashboard).render(
  <StrictMode>
    <App />
  </StrictMode>
);
