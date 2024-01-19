import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  preview: {
    port: 4004,
  },
  server: {
    port: 4004,
  },
  build: {
    rollupOptions: {},
  },
});
