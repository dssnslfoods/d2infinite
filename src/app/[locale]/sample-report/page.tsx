import { setRequestLocale, getTranslations } from 'next-intl/server';
import { CTABand } from '@/components/home';
import SampleReportClient from './SampleReportClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sampleReport' });
  return {
    title: `${t('headlinePre')} ${t('headlineEm')} | D2Infinite`,
    description: t('lead'),
  };
}

export default async function SampleReportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SampleReportClient />
      <CTABand />
    </>
  );
}
