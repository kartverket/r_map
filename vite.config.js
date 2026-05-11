import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  css: {
    preprocessorOptions: {
      scss: {
        // _main.scss uses @import at line 1515 (after 1514 lines of CSS rules);
        // moving those to @use would reorder the cascade, so we silence the
        // remaining @import deprecation warnings until _main.scss can be split.
        silenceDeprecations: ['import'],
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})
