'use client';

import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = ['testimonial1', 'testimonial2', 'testimonial3'];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((key, index) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-slate-100 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-md">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="text-slate-700 leading-relaxed mb-6 pt-4">
                &ldquo;{t(`${key}.quote`)}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-400">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {t(`${key}.author`)}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t(`${key}.company`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
