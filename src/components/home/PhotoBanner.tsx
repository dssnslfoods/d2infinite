'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function PhotoBanner() {
  const t = useTranslations('photoBanner');

  return (
    <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/tech-abstract.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-cyan-900/60" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 right-10 lg:right-20 -translate-y-1/2 hidden md:flex gap-3">
        {[80, 60, 40].map((size, i) => (
          <div
            key={i}
            className="rounded-full border border-cyan-400/30"
            style={{ width: size, height: size }}
          />
        ))}
      </div>
    </section>
  );
}
