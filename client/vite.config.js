import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://54.66.124.33:5000',
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
