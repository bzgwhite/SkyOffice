import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // メモリ使用量を最適化
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          phaser: ['phaser'],
          colyseus: ['colyseus.js'],
          mui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
})
