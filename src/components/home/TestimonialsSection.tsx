'use client';

import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';

const avatarColors = [
  'from-cyan-400 to-blue-500',
  'from-violet-400 to-purple-500',
  'from-emerald-400 to-teal-500',
];

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = ['testimonial1', 'testimonial2', 'testimonial3'];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((key, index) => (
            <ScrollReveal key={key} delay={index * 150}>
              <div
                className="bg-white rounded-2xl p-8 shadow-soft card-lift hover:shadow-soft-lg border border-slate-100 relative"
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
                  <div className={`w-12 h-12 bg-gradient-to-br ${avatarColors[index]} rounded-full flex items-center justify-center`}>
                    <span className="text-lg font-bold text-white">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
