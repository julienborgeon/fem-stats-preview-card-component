import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: { sourcemap: false, assetsInlineLimit: 0 },
  esbuild: { drop: ["console", "debugger"] },
});
