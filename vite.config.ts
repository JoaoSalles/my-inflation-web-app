import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // add visualizer({ open: true, filename: 'stats.html' }) to check build
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true, 
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  ...(command === 'serve' && {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }),
  ...(command === 'build' && {
    build: {
        minify: true
      }
    }),
}))
