import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'melodiket',
    short_name: 'melodiket',
    description: '밴드 공연 티케팅 서비스',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
