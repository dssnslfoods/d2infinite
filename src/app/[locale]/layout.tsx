import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuroraBackground from '@/components/ui/AuroraBackground';
import ScrollProgress from '@/components/ui/ScrollProgress';
import {
  SITE_URL,
  buildPageMetadata,
  organizationSchema,
  websiteSchema,
} from '@/lib/seo';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0a0f1e',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const t = messages.metadata as Record<string, string>;

  return {
    metadataBase: new URL(SITE_URL),
    ...buildPageMetadata({
      locale,
      path: '',
      title: t.title,
      description: t.description,
      keywords:
        locale === 'th'
          ? [
              'ระบบจัดการข้อมูล',
              'แดชบอร์ดผู้บริหาร',
              'ESG dashboard',
              'data platform',
              'business intelligence',
              'รายงานอินโฟกราฟิก',
              'realtime dashboard',
              'D2Infinite',
              'แพลตฟอร์มข้อมูล',
              'decision intelligence',
            ]
          : [
              'decision intelligence',
              'executive dashboard',
              'data platform',
              'business intelligence',
              'ESG dashboard',
              'realtime dashboard',
              'infographic reports',
              'D2Infinite',
              'Bangkok data company',
              'enterprise analytics',
            ],
    }),
    applicationName: 'D2Infinite',
    referrer: 'origin-when-cross-origin',
    category: 'business',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'th')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={locale === 'th' ? 'font-thai' : ''}>
        <AuroraBackground />
        <ScrollProgress />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <StructuredData locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function StructuredData({ locale }: { locale: string }) {
  const schemas = [organizationSchema(locale), websiteSchema(locale)];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
