import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 👇 necessary fallback for SPA (React Router)
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
