'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const t = useTranslations('hero');
  const tagline = useTranslations()('tagline');

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          {/* Tagline badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="text-cyan-300 text-sm font-medium">{tagline}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            {t('headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            {t('subheadline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg" icon={ArrowRight}>
              {t('requestDemo')}
            </Button>
            <Button href="/solutions" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10 hover:!border-white/50">
              <Play className="w-5 h-5 mr-2" />
              {t('viewSolutions')}
            </Button>
          </div>
        </div>

        {/* Stats or visual element */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Dashboard preview mockup */}
            <div className="w-[500px] h-[350px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-white/10 rounded-lg w-3/4" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-24 bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 rounded-lg" />
                  <div className="h-24 bg-white/10 rounded-lg" />
                  <div className="h-24 bg-white/10 rounded-lg" />
                </div>
                <div className="h-32 bg-white/10 rounded-lg" />
                <div className="flex gap-3">
                  <div className="h-4 bg-cyan-400/40 rounded w-1/4" />
                  <div className="h-4 bg-white/10 rounded w-1/3" />
                  <div className="h-4 bg-white/10 rounded w-1/5" />
                </div>
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-12 w-48 bg-white rounded-xl p-4 shadow-2xl">
              <div className="text-xs text-slate-500 mb-1">Real-time KPI</div>
              <div className="text-2xl font-bold text-slate-900">+23.5%</div>
              <div className="text-xs text-emerald-600 font-medium">Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
