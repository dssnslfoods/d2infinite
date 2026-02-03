'use client';

import { useTranslations } from 'next-intl';
import { FileBarChart2, LayoutDashboard, Server, Users } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';

export default function SolutionsPreviewSection() {
  const t = useTranslations('solutions');

  const solutions = [
    {
      icon: FileBarChart2,
      key: 'infographicReport',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: LayoutDashboard,
      key: 'realtimeDashboard',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Server,
      key: 'dataPlatform',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Users,
      key: 'executiveSupport',
      color: 'from-violet-500 to-violet-600',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.key} className="group cursor-pointer" padding="lg">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                      {t(`${solution.key}.title`)}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t(`${solution.key}.description`)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button href="/solutions" variant="outline" icon={ArrowRight}>
            {t('viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
}
