import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import'
import ViteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    styleImport({
      libs: [
        {
          libraryName: '@fect-ui/vue',
          esModule: true,
          resolveStyle: (name) => {
            if (name === 'form') {
              return
            } else {
              return `@fect-ui/vue/es/${name}/index.css`
            }
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: [{ find: '@admin', replacement: resolve(__dirname, 'src') }],
  },
  // less
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        // move console.log
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsDir: 'static/img/',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  // config proxy
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        // /api/todo -> http://localhost:4000/todo
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
