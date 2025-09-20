import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // メモリ使用量を最適化
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('phaser')) {
              return 'phaser-vendor'
            }
            if (id.includes('colyseus')) {
              return 'colyseus-vendor'
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'mui-vendor'
            }
            if (id.includes('@reduxjs') || id.includes('react-redux')) {
              return 'redux-vendor'
            }
            // その他のnode_modulesは小さなチャンクに分割
            return 'vendor'
          }
        },
      },
    },
  },
})
