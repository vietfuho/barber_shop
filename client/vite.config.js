import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // cổng frontend
    proxy: {
      "/api": {
        target: "http://localhost:5000", // backend Node.js
        changeOrigin: true,
        secure: false,
      },
    },
  },
})