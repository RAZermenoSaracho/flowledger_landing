import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/landing-assets/",
  plugins: [react()],
  preview: {
    host: "127.0.0.1",
    port: 5181,
    allowedHosts: ["flowledger.razs.dev"],
  },
});
