'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Leaf, BarChart3, FileText, LogIn, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Link } from '@/i18n/routing';

const tabs = [
  {
    key: 'dashboard',
    icon: BarChart3,
    image: '/images/products/esg-performance-dashboard.png',
  },
  {
    key: 'reports',
    icon: FileText,
    image: '/images/products/trend-chart-analytics.png',
  },
  {
    key: 'platform',
    icon: LogIn,
    image: '/images/products/esg-smart-performance-login.png',
  },
];

export default function ESGShowcaseSection() {
  const t = useTranslations('esgShowcase');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              {t('badge')}
            </span>
          </div>
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            dark
          />
        </ScrollReveal>

        {/* Main content: screenshot + features */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Screenshot viewer - takes 3/5 width on lg */}
          <ScrollReveal className="lg:col-span-3" delay={100}>
            {/* Tab buttons */}
            <div className="flex gap-2 mb-4">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{t(`tabs.${tab.key}`)}</span>
                  </button>
                );
              })}
            </div>

            {/* Browser frame mockup */}
            <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/40">
              {/* Browser header bar */}
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 font-mono">
                  esg-performance.d2infinite.com
                </div>
              </div>
              {/* Screenshot */}
              <div className="relative aspect-[16/9] bg-slate-900">
                {tabs.map((tab, index) => (
                  <div
                    key={tab.key}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      activeTab === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={tab.image}
                      alt={t(`tabs.${tab.key}Alt`)}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Caption */}
            <p className="text-slate-500 text-sm mt-3 text-center">
              {t(`tabs.${tabs[activeTab].key}Caption`)}
            </p>
          </ScrollReveal>

          {/* Features panel - takes 2/5 width on lg */}
          <ScrollReveal className="lg:col-span-2" delay={250}>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-2">
                {t('features.title')}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                {t('features.subtitle')}
              </p>

              <ul className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">
                      {t(`features.feature${i}`)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Client badge */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                  {t('client.label')}
                </p>
                <p className="text-white font-semibold">
                  {t('client.name')}
                </p>
                <p className="text-slate-400 text-sm">
                  {t('client.description')}
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/case-studies"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                {t('cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
