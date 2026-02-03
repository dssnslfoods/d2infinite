import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'D2Infinite - Decision Support, Delivered',
  description: 'Infographic reports and real-time dashboards that turn data into executive actions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
