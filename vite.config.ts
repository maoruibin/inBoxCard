// FIX: Add reference to node types to fix error on process.cwd().
/// <reference types="node" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'cards',
            dest: '' // This copies 'cards' folder to the root of 'dist' so fetch('/cards/...') works
          }
        ]
      })
    ],
    define: {
      // Security fix: Only expose specific keys, not the whole process.env object
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || '')
    }
  };
});