import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Decision intelligence for modern leadership`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Bespoke data platforms, infographic intelligence, and realtime executive dashboards engineered for leaders who refuse to wait for answers.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
