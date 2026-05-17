import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Decision Intelligence Platform`,
    short_name: SITE_NAME,
    description:
      'Bespoke data platforms, infographic intelligence, and realtime executive dashboards.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#0a0f1e',
    theme_color: '#0a0f1e',
    orientation: 'portrait',
    categories: ['business', 'productivity', 'finance'],
    lang: 'en',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
