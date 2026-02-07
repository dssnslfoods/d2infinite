'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

export default function PhotoShowcase() {
  const t = useTranslations('photoShowcase');

  const photos = [
    {
      src: '/images/hero-data-analytics.jpg',
      alt: t('photo1Alt'),
      label: t('photo1Label'),
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      src: '/images/data-visualization.jpg',
      alt: t('photo2Alt'),
      label: t('photo2Label'),
      span: '',
    },
    {
      src: '/images/business-meeting.jpg',
      alt: t('photo3Alt'),
      label: t('photo3Label'),
      span: '',
    },
    {
      src: '/images/team-collaboration.jpg',
      alt: t('photo4Alt'),
      label: t('photo4Label'),
      span: 'md:col-span-2',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl ${photo.span}`}
            >
              <div className={`relative w-full ${index === 0 ? 'h-64 md:h-full min-h-[300px] md:min-h-[400px]' : 'h-48 md:h-52'}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                  <p className="text-white font-semibold text-sm lg:text-base translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {photo.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
