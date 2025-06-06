import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@google/generative-ai']
  },
  build: {
    commonjsOptions: {
      include: [/@google\/generative-ai/, /node_modules/]
    },
  },
  server: {
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com/v1beta',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  }
}); 