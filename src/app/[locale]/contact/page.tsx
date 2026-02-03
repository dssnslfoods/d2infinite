import { setRequestLocale, getTranslations } from 'next-intl/server';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: `${t('title')} | D2Infinite`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | D2Infinite`,
      description: t('subtitle'),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-8 lg:pt-28 lg:pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ContactInfo locale={locale} />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
