import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react-icons") ||
              id.includes("react-loading-skeleton") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("react-hot-toast")
            ) {
              return "ui-vendor";
            }
            if (id.includes("recharts")) {
              return "charts";
            }
            if (id.includes("moment") || id.includes("axios")) {
              return "utils";
            }
            if (
              id.includes("react-syntax-highlighter") ||
              id.includes("refractor")
            ) {
              return "syntax-highlighter";
            }
            if (id.includes("@uiw/react-md-editor")) {
              return "editor-vendor";
            }
            if (id.includes("react-markdown") || id.includes("remark-gfm")) {
              return "markdown";
            }
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "react-vendor";
            }
          }
        },
      },
    },
  },
});
