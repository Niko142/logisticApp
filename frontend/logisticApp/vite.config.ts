import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@styles": path.resolve(__dirname, "src/assets/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    },
  },
});
