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
        // 安全なチャンク分離: 大きなライブラリのみ分離
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Phaserは大きいので分離（依存関係が少ない）
            if (id.includes('phaser')) {
              return 'phaser'
            }
            // その他はすべて一つのvendorチャンクに
            return 'vendor'
          }
        },
      },
    },
  },
})
