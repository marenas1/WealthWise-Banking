import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: import.meta.env.PORT ? parseInt(import.meta.env.PORT) : 5173, // Use process.env.PORT if available, otherwise fallback to 4173
  },
  plugins: [react()],
})
