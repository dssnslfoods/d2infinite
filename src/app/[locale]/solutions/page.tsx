import { setRequestLocale, getTranslations } from 'next-intl/server';
import { FileBarChart2, LayoutDashboard, Server, Users, CheckCircle2, Target, Package } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { CTASection } from '@/components/home';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: `${t('title')} | D2Infinite`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | D2Infinite`,
      description: t('subtitle'),
    },
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SolutionsHero locale={locale} />
      <SolutionsGrid locale={locale} />
      <CTASection />
    </>
  );
}

async function SolutionsHero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <section className="pt-20 pb-16 lg:pt-28 lg:pb-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      </div>
    </section>
  );
}

async function SolutionsGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  const solutions = [
    {
      icon: FileBarChart2,
      key: 'infographicReport',
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
    },
    {
      icon: LayoutDashboard,
      key: 'realtimeDashboard',
      color: 'from-cyan-500 to-cyan-600',
      bgLight: 'bg-cyan-50',
    },
    {
      icon: Server,
      key: 'dataPlatform',
      color: 'from-indigo-500 to-indigo-600',
      bgLight: 'bg-indigo-50',
    },
    {
      icon: Users,
      key: 'executiveSupport',
      color: 'from-violet-500 to-violet-600',
      bgLight: 'bg-violet-50',
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 lg:space-y-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isEven = index % 2 === 0;

            return (
              <Card key={solution.key} className="overflow-hidden" padding="lg" hover={false}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center shadow-lg mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                      {t(`${solution.key}.title`)}
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                      {t(`${solution.key}.description`)}
                    </p>

                    {/* Three columns: Outcomes, KPIs, Deliverables */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Outcomes */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <h3 className="font-semibold text-slate-900">
                            {t(`${solution.key}.outcomes`)}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {t(`${solution.key}.outcome${i}`)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* KPIs */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5 text-blue-500" />
                          <h3 className="font-semibold text-slate-900">
                            {t(`${solution.key}.kpis`)}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {t(`${solution.key}.kpi${i}`)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-5 h-5 text-violet-500" />
                          <h3 className="font-semibold text-slate-900">
                            {t(`${solution.key}.deliverables`)}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {t(`${solution.key}.deliverable${i}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Visual/Illustration placeholder */}
                  <div className={`flex-shrink-0 w-full lg:w-80 ${solution.bgLight} rounded-xl p-8 flex items-center justify-center`}>
                    <div className="w-full max-w-xs">
                      {/* Dashboard mockup */}
                      <div className="bg-white rounded-lg shadow-soft p-4">
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-slate-100 rounded w-2/3" />
                          <div className="grid grid-cols-2 gap-2">
                            <div className={`h-12 rounded bg-gradient-to-br ${solution.color} opacity-20`} />
                            <div className="h-12 rounded bg-slate-100" />
                          </div>
                          <div className="h-16 rounded bg-slate-50" />
                          <div className="flex gap-2">
                            <div className={`h-2 rounded w-1/3 bg-gradient-to-r ${solution.color} opacity-40`} />
                            <div className="h-2 rounded w-1/4 bg-slate-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
