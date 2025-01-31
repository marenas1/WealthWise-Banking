import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: import.meta.env.VITE_PORT || 5173  // Use the port provided by Render, fallback to 5173 for local development
  },
  plugins: [react()],
})
