import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'inBox Note Hub',
          short_name: 'inBox',
          description: 'A community-driven knowledge card repository.',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          orientation: 'portrait',
          icons: [
            {
              src: 'https://gudong.s3.bitiful.net/icon/inbox.svg?no-wait=on',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            },
            {
              src: 'https://gudong.s3.bitiful.net/icon/inbox.svg?no-wait=on',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: /^\/api\//,
              handler: 'NetworkOnly',
              method: 'GET'
            }
          ]
        }
      }),
      viteStaticCopy({
        targets: [
          { src: 'cards', dest: '' }
        ]
      })
    ],
    
    define: {
      // Security fix: Only expose specific keys, not the whole process.env object
      'process.env.API_KEY': JSON.stringify(env.API_KEY || (process as any).env.API_KEY || '')
    }
  };
});
