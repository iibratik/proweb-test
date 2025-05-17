import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ['6cbe-84-54-78-151.ngrok-free.app'],
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 👈 это и есть alias "@"
    }
  }
})
