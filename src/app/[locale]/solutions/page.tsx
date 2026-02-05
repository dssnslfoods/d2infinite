import { setRequestLocale, getTranslations } from 'next-intl/server';
import { FileBarChart2, LayoutDashboard, Server, Users, CheckCircle2, Target, Package, BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';
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

  const highlights = [
    { icon: LayoutDashboard, label: t('heroHighlight1'), color: 'text-cyan-500' },
    { icon: FileBarChart2, label: t('heroHighlight2'), color: 'text-blue-500' },
    { icon: Server, label: t('heroHighlight3'), color: 'text-indigo-500' },
    { icon: Users, label: t('heroHighlight4'), color: 'text-violet-500' },
  ];

  return (
    <section className="pt-20 pb-8 lg:pt-24 lg:pb-12 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t('subtitle')}
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5 shadow-soft border border-slate-100"
                  >
                    <Icon className={`w-5 h-5 ${h.color} flex-shrink-0`} />
                    <span className="text-sm font-medium text-slate-700">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Dashboard illustration */}
          <div className="flex-shrink-0 w-full max-w-md lg:max-w-lg">
            <div className="relative">
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-soft-lg border border-slate-200/80 p-5 relative z-10">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 h-5 bg-slate-100 rounded-full flex-1 max-w-[180px]" />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-lg p-3">
                    <TrendingUp className="w-4 h-4 text-cyan-500 mb-1" />
                    <div className="text-lg font-bold text-slate-800">94%</div>
                    <div className="text-[10px] text-slate-500 leading-tight">Efficiency</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-3">
                    <Activity className="w-4 h-4 text-blue-500 mb-1" />
                    <div className="text-lg font-bold text-slate-800">2.4k</div>
                    <div className="text-[10px] text-slate-500 leading-tight">Data Points</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-lg p-3">
                    <PieChart className="w-4 h-4 text-indigo-500 mb-1" />
                    <div className="text-lg font-bold text-slate-800">12</div>
                    <div className="text-[10px] text-slate-500 leading-tight">KPIs</div>
                  </div>
                </div>

                {/* Chart area */}
                <div className="bg-slate-50 rounded-lg p-4 mb-3">
                  <div className="flex items-end justify-between gap-1.5 h-20">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-cyan-500 to-blue-400 opacity-70"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Table rows */}
                <div className="space-y-2">
                  {[
                    { w: '60%', accent: 'bg-cyan-200' },
                    { w: '80%', accent: 'bg-blue-200' },
                    { w: '45%', accent: 'bg-indigo-200' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${row.accent}`} />
                      <div className="h-2 bg-slate-100 rounded flex-1" style={{ maxWidth: row.w }} />
                      <div className="h-2 w-10 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent card - top right */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-soft border border-slate-100 p-3 z-20">
                <BarChart3 className="w-6 h-6 text-cyan-500" />
              </div>

              {/* Background glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-3xl -z-10 blur-xl" />
            </div>
          </div>
        </div>
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
