import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Don't watch the reference screenshots folder — saving images there
      // was locking files and crashing the dev server (EBUSY).
      ignored: ['**/reference/**'],
    },
  },
})
