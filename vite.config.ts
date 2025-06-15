import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@components": path.resolve(__dirname, "./client/src/components"),
      "@hooks": path.resolve(__dirname, "./client/src/hooks"),
      "@contexts": path.resolve(__dirname, "./client/src/contexts"),
      "@ui": path.resolve(__dirname, "./client/src/components/ui"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@assets": path.resolve(__dirname, "./client/src/assets")
    }
  },
  optimizeDeps: {
    exclude: [
      'chunk-CQOXCJX6',
      'chunk-WHWXNVRM',
      'chunk-ZSO26C7X',
      'chunk-6AEK6X72',
      'chunk-6Q367BFU',
      'chunk-547GWMLU',
      'chunk-TOWQQC2Y'
    ]
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      strict: true,
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../node_modules'),
      ],
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  cacheDir: path.resolve(__dirname, 'node_modules/.vite'),
  clearScreen: false
});
