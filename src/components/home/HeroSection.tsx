'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            {/* Tagline badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <span className="text-cyan-300 text-sm font-medium">{tagline}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              {t('headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-xl text-slate-300 mb-10 leading-relaxed">
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

          {/* Dashboard visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Dashboard photo */}
              <div className="w-full h-[350px] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <Image
                  src="/images/hero-data-analytics.jpg"
                  alt="Data analytics dashboard"
                  width={500}
                  height={350}
                  className="object-cover w-full h-full"
                  priority
                />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent rounded-2xl" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-8 left-4 w-48 bg-white rounded-xl p-4 shadow-2xl">
                <div className="text-xs text-slate-500 mb-1">Real-time KPI</div>
                <div className="text-2xl font-bold text-slate-900">+23.5%</div>
                <div className="text-xs text-emerald-600 font-medium">Efficiency</div>
              </div>
              {/* Floating photo accent */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-xl border border-white/20 shadow-xl overflow-hidden">
                <Image
                  src="/images/data-visualization.jpg"
                  alt="Data visualization"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-cyan-500/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
