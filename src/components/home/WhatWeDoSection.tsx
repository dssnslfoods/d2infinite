'use client';

import { useTranslations } from 'next-intl';
import { FileBarChart, Activity, Database } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { CardWithIcon } from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function WhatWeDoSection() {
  const t = useTranslations('whatWeDo');

  const items = [
    {
      icon: FileBarChart,
      title: t('item1.title'),
      description: t('item1.description'),
    },
    {
      icon: Activity,
      title: t('item2.title'),
      description: t('item2.description'),
    },
    {
      icon: Database,
      title: t('item3.title'),
      description: t('item3.description'),
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <CardWithIcon
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
