import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [
      react(),
    ],
    publicDir: 'cards',
    define: {
      // Security fix: Only expose specific keys, not the whole process.env object
      'process.env.API_KEY': JSON.stringify(env.API_KEY || (process as any).env.API_KEY || '')
    }
  };
});