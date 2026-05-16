import { setRequestLocale } from 'next-intl/server';
import {
  HeroSection,
  TrustedBy,
  Capabilities,
  HowItWorks,
  ESGFeatured,
  Testimonials,
  CTABand,
} from '@/components/home';

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
      <Testimonials />
      <CTABand />
    </div>
  );
}
