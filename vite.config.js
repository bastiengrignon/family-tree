import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import visualizer from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export const aliases = {
  '@components': resolve(__dirname, './src/components'),
  '@pages': resolve(__dirname, './src/pages'),
  '@constants': resolve(__dirname, './src/constants'),
  '@lib': resolve(__dirname, './src/lib'),
  '@store': resolve(__dirname, './src/store'),
  '@hooks': resolve(__dirname, './src/hooks'),
};

export default defineConfig({
  plugins: [react(), visualizer],
  resolve: {
    alias: aliases,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/_mantine";',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@mantine')) {
            return 'mantine';
          }
          if (id.includes('redux')) {
            return 'redux';
          }
          if (id.includes('supabase')) {
            return 'supabase';
          }
          if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) {
            return 'react-router';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
