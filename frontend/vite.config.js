import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/analyze': {
        target: 'http://localhost:6767',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
