import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base: the same build serves the github.io preview path and averongroup.ca at the root.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
