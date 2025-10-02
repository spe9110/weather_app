import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/weather_app/',
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100 // check every 100ms
    }
  }
})