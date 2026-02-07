'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function SocialProofSection() {
  const t = useTranslations('socialProof');

  const companies = [
    { name: 'TechCorp' },
    { name: 'IndustrialCo' },
    { name: 'LogiFlow' },
    { name: 'RetailMax' },
    { name: 'HealthPlus' },
    { name: 'FinanceHub' },
  ];

  // Duplicate for seamless loop
  const marqueeItems = [...companies, ...companies];

  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-sm font-medium text-slate-500 mb-8">
            {t('title')}
          </p>
        </ScrollReveal>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          <div className="flex animate-marquee">
            {marqueeItems.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 mx-8 lg:mx-12 h-10 flex items-center justify-center"
              >
                <div className="text-slate-400 font-semibold text-lg tracking-tight whitespace-nowrap hover:text-cyan-500 transition-colors duration-300">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
