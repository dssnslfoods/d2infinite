'use client';

import { useTranslations } from 'next-intl';
import { Leaf, FlaskConical, Gauge, Wallet } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function UseCasesSection() {
  const t = useTranslations('useCases');

  const useCases = [
    {
      icon: Leaf,
      key: 'esgPlatform',
      gradient: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
    },
    {
      icon: FlaskConical,
      key: 'oneRd',
      gradient: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Gauge,
      key: 'oeeFnb',
      gradient: 'from-orange-500 to-amber-500',
      bg: 'bg-orange-50',
    },
    {
      icon: Wallet,
      key: 'payrollth',
      gradient: 'from-violet-500 to-purple-500',
      bg: 'bg-violet-50',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <ScrollReveal key={useCase.key} delay={index * 120}>
                <div
                  className={`${useCase.bg} rounded-2xl p-6 lg:p-8 border border-white/50 card-lift hover:shadow-soft-lg group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${useCase.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                        {t(`${useCase.key}.title`)}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {t(`${useCase.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
