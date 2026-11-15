import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Review only: ?v=2 stops the photo at the hero.
document.documentElement.dataset.v = new URLSearchParams(location.search).get("v") || "1";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
