import { setRequestLocale } from 'next-intl/server';
import {
  HeroSection,
  SocialProofSection,
  WhatWeDoSection,
  SolutionsPreviewSection,
  HowItWorksSection,
  UseCasesSection,
  TestimonialsSection,
  CTASection,
} from '@/components/home';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <WhatWeDoSection />
      <SolutionsPreviewSection />
      <HowItWorksSection />
      <UseCasesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
