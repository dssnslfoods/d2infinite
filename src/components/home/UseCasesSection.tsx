'use client';

import { useTranslations } from 'next-intl';
import { Factory, ShoppingBag, Truck, Heart } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function UseCasesSection() {
  const t = useTranslations('useCases');

  const useCases = [
    {
      icon: Factory,
      key: 'manufacturing',
      gradient: 'from-orange-500 to-amber-500',
      bg: 'bg-orange-50',
    },
    {
      icon: ShoppingBag,
      key: 'retail',
      gradient: 'from-pink-500 to-rose-500',
      bg: 'bg-pink-50',
    },
    {
      icon: Truck,
      key: 'logistics',
      gradient: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Heart,
      key: 'healthcare',
      gradient: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.key}
                className={`${useCase.bg} rounded-2xl p-6 lg:p-8 border border-white/50 hover:shadow-soft-lg transition-all duration-300 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${useCase.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
