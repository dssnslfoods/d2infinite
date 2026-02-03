'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UtensilsCrossed, FlaskConical, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

type FilterType = 'all' | 'Food & Beverage';

export default function CaseStudiesClient() {
  const t = useTranslations('caseStudies');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'Food & Beverage', label: t('filterFoodBeverage') },
  ];

  const caseStudies = [
    {
      id: 'case1',
      tag: 'Food & Beverage',
      icon: UtensilsCrossed,
      color: 'from-lime-500 to-green-500',
      badgeVariant: 'success' as const,
    },
    {
      id: 'case2',
      tag: 'Food & Beverage',
      icon: FlaskConical,
      color: 'from-cyan-500 to-teal-500',
      badgeVariant: 'default' as const,
    },
  ];

  const filteredCases = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter((cs) => cs.tag === activeFilter);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCases.map((caseStudy) => {
            const Icon = caseStudy.icon;
            return (
              <Card key={caseStudy.id} className="group" padding="lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${caseStudy.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant={caseStudy.badgeVariant} size="sm" className="mb-2">
                      {t(`${caseStudy.id}.tag`)}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {t(`${caseStudy.id}.title`)}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {t(`${caseStudy.id}.summary`)}
                </p>

                {/* Challenge, Solution, Results */}
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">
                      Challenge
                    </h4>
                    <p className="text-sm text-slate-600">{t(`${caseStudy.id}.challenge`)}</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-cyan-900 mb-1">Solution</h4>
                    <p className="text-sm text-cyan-800">{t(`${caseStudy.id}.solution`)}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-emerald-900 mb-1">Results</h4>
                    <p className="text-sm text-emerald-800">{t(`${caseStudy.id}.results`)}</p>
                  </div>
                </div>

                <button className="inline-flex items-center text-cyan-600 font-medium text-sm hover:text-cyan-700 transition-colors group/btn">
                  {t('readMore')}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">No case studies found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
