import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site deploys to GitHub Pages under https://<user>.github.io/<REPO_NAME>/
// so Vite needs `base` set to the repository name. Detected from the remote as
// "Obilireddy". If you fork/rename the repo, update this constant.
const REPO_NAME = 'Obilireddy';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
  },
}));
