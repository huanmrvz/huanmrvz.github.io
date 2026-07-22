import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// User site (huanmrvz.github.io) → base: '/'
// Project Pages (username.github.io/repo) → set base: '/repo-name/'
export default defineConfig({
  base: "/",
  plugins: [react()],
});
