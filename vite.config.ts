import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'cards',
          dest: '' // This copies 'cards' folder to the root of 'dist'
        }
      ]
    })
  ],
  define: {
    // Polyfill process.env for the Google GenAI SDK usage in the existing code
    'process.env': process.env
  }
});