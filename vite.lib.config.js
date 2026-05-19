import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'RMap',
      fileName: () => 'main.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => {
        if (id.endsWith('.css')) return false;
        return [
          /^react(\/.*)?$/,
          /^react-dom(\/.*)?$/,
          /^ol(\/.*)?$/,
          /^react-bootstrap(\/.*)?$/,
          /^bootstrap(\/.*)?$/,
          /^@fortawesome\/.*/,
        ].some(pattern => pattern.test(id));
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
