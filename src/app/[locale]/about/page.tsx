import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Eye, Target, Handshake, Lightbulb, Users, Code, Palette, BarChart3 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { CTASection } from '@/components/home';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('title')} | D2Infinite`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | D2Infinite`,
      description: t('subtitle'),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    { key: 'clarity', icon: Eye, color: 'from-cyan-500 to-cyan-600' },
    { key: 'precision', icon: Target, color: 'from-blue-500 to-blue-600' },
    { key: 'partnership', icon: Handshake, color: 'from-indigo-500 to-indigo-600' },
    { key: 'innovation', icon: Lightbulb, color: 'from-violet-500 to-violet-600' },
  ];

  const team = [
    { key: 'member1', icon: Users, color: 'from-slate-600 to-slate-700' },
    { key: 'member2', icon: Code, color: 'from-cyan-500 to-cyan-600' },
    { key: 'member3', icon: Palette, color: 'from-pink-500 to-rose-500' },
    { key: 'member4', icon: BarChart3, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                {t('story.title')}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{t('story.p1')}</p>
                <p>{t('story.p2')}</p>
                <p>{t('story.p3')}</p>
              </div>
            </div>
            <div className="relative">
              {/* Visual element */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="text-3xl font-bold text-cyan-600 mb-1">100+</div>
                    <div className="text-sm text-slate-500">Projects Delivered</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="text-3xl font-bold text-cyan-600 mb-1">50+</div>
                    <div className="text-sm text-slate-500">Happy Clients</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="text-3xl font-bold text-cyan-600 mb-1">5+</div>
                    <div className="text-sm text-slate-500">Industries</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="text-3xl font-bold text-cyan-600 mb-1">24/7</div>
                    <div className="text-sm text-slate-500">Support</div>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('values.title')} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.key} className="text-center" padding="lg">
                  <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center shadow-md mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {t(`values.${value.key}.title`)}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t(`values.${value.key}.description`)}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('team.title')} subtitle={t('team.subtitle')} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => {
              const Icon = member.icon;
              return (
                <Card key={member.key} className="text-center" padding="lg">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {t(`team.${member.key}.name`)}
                  </h3>
                  <p className="text-cyan-600 font-medium text-sm mb-3">
                    {t(`team.${member.key}.role`)}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t(`team.${member.key}.bio`)}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
