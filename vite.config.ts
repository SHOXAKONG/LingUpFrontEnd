import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: [
      '.ngrok-free.app',
      'lingup.uz',
      'api.lingup.uz',
    ],
    proxy: {
      '/api': {
        target: 'https://api.lingup.uz',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
