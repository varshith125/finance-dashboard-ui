import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts') || id.includes('d3')) return 'recharts';
            if (id.includes('lucide-react')) return 'lucide';
            if (id.includes('react') || id.includes('react-dom')) return 'react';
            return 'vendor';
          }
        }
      }
    }
  }
})
