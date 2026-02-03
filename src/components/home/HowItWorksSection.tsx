'use client';

import { useTranslations } from 'next-intl';
import { Search, Wrench, Rocket, TrendingUp } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      icon: Search,
      key: 'discover',
      number: '01',
    },
    {
      icon: Wrench,
      key: 'build',
      number: '02',
    },
    {
      icon: Rocket,
      key: 'deploy',
      number: '03',
    },
    {
      icon: TrendingUp,
      key: 'improve',
      number: '04',
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="relative">
                  {/* Step card */}
                  <div className="text-center lg:text-center">
                    {/* Icon with number */}
                    <div className="relative inline-flex mb-6">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-soft-lg flex items-center justify-center relative z-10">
                        <Icon className="w-9 h-9 text-cyan-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md z-20">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {t(`${step.key}.title`)}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t(`${step.key}.description`)}
                    </p>
                  </div>

                  {/* Arrow connector (mobile/tablet) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-cyan-200" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
