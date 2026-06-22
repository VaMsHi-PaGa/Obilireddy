import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed on Netlify, which serves the site from the domain root, so `base`
// is '/'. (If you ever host under a sub-path — e.g. GitHub Pages at
// /<repo>/ — set base to `/<repo>/` for the build instead.)
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
  },
});
