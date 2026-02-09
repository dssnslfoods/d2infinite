import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = messages.metadata as Record<string, string>;

  const baseUrl = 'https://d2infinite.com';

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: `${baseUrl}/${locale}`,
      siteName: 'D2Infinite',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.ogTitle,
      description: t.ogDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        th: `${baseUrl}/th`,
      },
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
        {/* Google Fonts - loaded via CSS for better build compatibility */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Alternate language links */}
        <link rel="alternate" hrefLang="en" href="https://d2infinite.com/en" />
        <link rel="alternate" hrefLang="th" href="https://d2infinite.com/th" />
        <link rel="alternate" hrefLang="x-default" href="https://d2infinite.com/en" />
      </head>
      <body className={`font-sans antialiased bg-white text-slate-900 ${locale === 'th' ? 'font-thai' : ''}`}>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to main content
          </a>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
          </div>
          <OrganizationSchema locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function OrganizationSchema({ locale }: { locale: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'D2Infinite Co.,Ltd.',
    url: 'https://d2infinite.com',
    email: 'contact@d2infinite.com',
    telephone: '+66 870 783 663',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '422/147 Panya Indra Rd., Samwa-Tawantok',
      addressLocality: 'Khet Klong Samwa',
      addressRegion: 'Bangkok',
      postalCode: '10510',
      addressCountry: 'TH',
    },
    description: locale === 'th'
      ? 'เครื่องมือวิเคราะห์ข้อมูลผ่านการพัฒนาแพลตฟอร์มเว็บแอปพลิเคชัน'
      : 'Data analytics tools through web-application platform development.',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
