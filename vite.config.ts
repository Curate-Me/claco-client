import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";

export default defineConfig(({ mode }: { mode: string }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: "window",
    },
    base: isProduction ? "/dist/" : "./",
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };
});