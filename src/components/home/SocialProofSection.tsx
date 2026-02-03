'use client';

import { useTranslations } from 'next-intl';

export default function SocialProofSection() {
  const t = useTranslations('socialProof');

  // Placeholder company logos (using text placeholders)
  const companies = [
    { name: 'TechCorp', width: 'w-28' },
    { name: 'IndustrialCo', width: 'w-32' },
    { name: 'LogiFlow', width: 'w-24' },
    { name: 'RetailMax', width: 'w-28' },
    { name: 'HealthPlus', width: 'w-26' },
    { name: 'FinanceHub', width: 'w-30' },
  ];

  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-slate-500 mb-8">
          {t('title')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {companies.map((company) => (
            <div
              key={company.name}
              className={`${company.width} h-10 flex items-center justify-center`}
            >
              <div className="text-slate-400 font-semibold text-lg tracking-tight opacity-60 hover:opacity-100 transition-opacity">
                {company.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
