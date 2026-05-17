import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  HeroSection,
  TrustedBy,
  Capabilities,
  HowItWorks,
  ESGFeatured,
  CTABand,
} from '@/components/home';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const home = await getTranslations({ locale, namespace: 'home.hero' });

  return buildPageMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description'),
    keywords:
      locale === 'th'
        ? ['D2Infinite', home('eyebrow'), 'แดชบอร์ดผู้บริหาร', 'data platform', 'ESG', 'realtime dashboard']
        : ['D2Infinite', home('eyebrow'), 'executive dashboard', 'data platform', 'ESG', 'realtime dashboard'],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="page-enter">
      <HeroSection />
      <TrustedBy />
      <Capabilities />
      <HowItWorks />
      <ESGFeatured />
      <CTABand />
    </div>
  );
}
