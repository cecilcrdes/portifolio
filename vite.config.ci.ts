// vite.config.ci.ts — usado exclusivamente pelo GitHub Actions (CI/CD)
// Não contém plugins exclusivos do ambiente Manus (vite-plugin-manus-runtime,
// @builder.io/vite-plugin-jsx-loc) que não existem no npm público.
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const pagesBasePath = process.env.VITE_BASE_PATH?.replace(/^\/+|\/+$/g, "");

export default defineConfig({
  base: pagesBasePath ? `/${pagesBasePath}/` : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
