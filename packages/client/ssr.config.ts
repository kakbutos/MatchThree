import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'styled-components',
        '@emotion/react',
        '@emotion/styled',
      ],
      output: {
        dir: 'dist-ssr',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
