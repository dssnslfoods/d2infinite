import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CTABand } from '@/components/home';
import SampleReportClient from './SampleReportClient';
import { buildPageMetadata, breadcrumbSchema, localeUrl } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sampleReport' });
  return buildPageMetadata({
    locale,
    path: 'sample-report',
    title: `${t('headlinePre')} ${t('headlineEm')}`.replace(/\.$/, ''),
    description: t('lead'),
    keywords:
      locale === 'th'
        ? ['ตัวอย่างรายงาน', 'sample report', 'ESG dashboard', 'SmartInventory', 'showcase', 'D2Infinite']
        : ['sample report', 'live showcase', 'ESG dashboard', 'SmartInventory', 'production deployment', 'D2Infinite'],
  });
}

export default async function SampleReportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: 'nav' });

  const crumbs = breadcrumbSchema([
    { name: nav('home'), url: localeUrl(locale) },
    { name: nav('sampleReport'), url: localeUrl(locale, 'sample-report') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <SampleReportClient />
      <CTABand />
    </>
  );
}
