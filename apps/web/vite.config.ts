import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@circuit/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@circuit/board-sdk': path.resolve(__dirname, '../../packages/board-sdk/src'),
      '@circuit/component-sdk': path.resolve(__dirname, '../../packages/component-sdk/src'),
      '@circuit/circuit-engine': path.resolve(__dirname, '../../packages/circuit-engine/src'),
      '@circuit/simulation-sdk': path.resolve(__dirname, '../../packages/simulation-sdk/src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
