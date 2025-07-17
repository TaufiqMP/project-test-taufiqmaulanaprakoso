import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
<<<<<<< HEAD
  base: process.env.VITE_BASE_PATH || "/project-test-taufiqmaulanaprakoso",
=======
>>>>>>> 3788bffc598d1d4f98a938745ae82e6bbdf9fb7d
  server: {
    proxy: {
      '/api': {
        target: 'https://suitmedia-backend.suitdev.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})

