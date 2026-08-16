import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// base is injected at build time per-site by build_site.sh (see vite.base.txt)
import { readFileSync } from 'fs';

let base = '/';
try {
  base = readFileSync(__dirname + '/vite.base.txt', 'utf-8').trim() || '/';
} catch {}

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
