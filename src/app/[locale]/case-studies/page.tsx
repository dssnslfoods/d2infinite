import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHeader from '@/components/ui/SectionHeader';
import CaseStudiesClient from './CaseStudiesClient';
import { CTASection } from '@/components/home';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudies' });

  return {
    title: `${t('title')} | D2Infinite`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | D2Infinite`,
      description: t('subtitle'),
    },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'caseStudies' });

  return (
    <>
      <section className="pt-20 pb-8 lg:pt-28 lg:pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        </div>
      </section>
      <CaseStudiesClient />
      <CTASection />
    </>
  );
}
