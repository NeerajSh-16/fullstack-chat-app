import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  daisyui:{
    themes: ["light", "dark", "cupcake", "retro", "valentine", "forest", "luxury"]
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5001', // Adjust if backend runs on a different port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
