import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copy } from 'vite-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
          {
              src: 'node_modules/pdfjs-dist/build/pdf.worker.mjs',
              dest: 'dist',
          },
      ],
    }),    
  ],
})
