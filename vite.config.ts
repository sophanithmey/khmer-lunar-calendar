import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: [
        'moon-icon.svg',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'maskable-icon-512x512.png',
        'maskable-icon-192x192.png',
        'og-image.jpg',
        'angkor-moon-hero.jpg',
        'buddha-holy-day.jpg',
        'moon-map.jpg',
        'moon-realistic.jpg'
      ],
      manifest: {
        name: 'ចន្ទខ្មែរ — ប្រតិទិនចន្ទគតិខ្មែរ & តារាសាស្ត្រ',
        short_name: 'ចន្ទខ្មែរ',
        description:
          'ប្រតិទិនចន្ទគតិខ្មែរ ថ្ងៃសីលឧបោសថ ពិធីបុណ្យជាតិ-សាសនា ដំណាក់កាលព្រះចន្ទ 3D និងកម្មវិធីបម្លែងកាលបរិច្ឆេទសកល',
        theme_color: '#071426',
        background_color: '#071426',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        lang: 'km',
        dir: 'ltr',
        categories: ['utilities', 'lifestyle', 'education'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/maskable-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/moon-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ],
        shortcuts: [
          {
            name: 'ប្រតិទិនចន្ទគតិ (Calendar)',
            short_name: 'ប្រតិទិន',
            description: 'មើលប្រតិទិនចន្ទគតិខ្មែរប្រចាំខែ និងថ្ងៃសីល',
            url: '/calendar',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'កម្មវិធីបម្លែងថ្ងៃ (Converter)',
            short_name: 'បម្លែងថ្ងៃ',
            description: 'បម្លែងកាលបរិច្ឆេទសកលទៅជាចន្ទគតិខ្មែរ',
            url: '/converter',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'រុករកព្រះចន្ទ 3D (Moon Explorer)',
            short_name: 'ព្រះចន្ទ 3D',
            description: 'រុករកដំណាក់កាលព្រះចន្ទ 3D តាមតារាសាស្ត្រ',
            url: '/explorer',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'ពិធីបុណ្យជាតិ & សាសនា (Festivals)',
            short_name: 'ពិធីបុណ្យ',
            description: 'បញ្ជីពិធីបុណ្យប្រពៃណីជាតិ និងថ្ងៃសីល',
            url: '/festivals',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000
  }
});
