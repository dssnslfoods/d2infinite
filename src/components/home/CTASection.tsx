'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function CTASection() {
  const t = useTranslations('cta');

  const stats = [
    { end: 50, suffix: '+', label: 'Projects Delivered' },
    { end: 99, suffix: '%', label: 'Client Satisfaction' },
    { end: 10, suffix: 'x', label: 'Faster Insights' },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stats row */}
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-8 mb-14">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-sm sm:text-base text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <Button
            href="/contact"
            size="lg"
            icon={ArrowRight}
            className="!bg-white !text-slate-900 hover:!bg-slate-100"
          >
            {t('button')}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
