import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType } from 'react';
import { Eyebrow, Glass, Reveal } from '@/components/ui';
import ContactForm from './ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('headlinePre')} ${t('headlineEm')} | D2Infinite`,
    description: t('lead'),
  };
}

interface InfoItem {
  Icon: ComponentType<{ size?: number }>;
  label: string;
  val: string;
  href: string;
}

function ContactContent() {
  const t = useTranslations('contact');
  const tRoot = useTranslations();

  const items: InfoItem[] = [
    { Icon: Mail, label: t('info.emailLabel'), val: 'contact@d2infinite.com', href: 'mailto:contact@d2infinite.com' },
    { Icon: Phone, label: t('info.phoneLabel'), val: '+66 870 783 663', href: 'tel:+66870783663' },
    { Icon: MapPin, label: t('info.addressLabel'), val: t('info.address'), href: '#' },
  ];

  return (
    <div className="page-enter">
      <section className="section" style={{ paddingTop: 160 }}>
        <div className="container-x">
          <Reveal>
            <div style={{ maxWidth: 840, textAlign: 'center', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex' }}>
                <Eyebrow>{t('eyebrow')}</Eyebrow>
              </div>
              <h1 className="h1" style={{ marginTop: 22 }}>
                {t('headlinePre')} <span className="gradient-text">{t('headlineEm')}</span>
              </h1>
              <p className="lead" style={{ marginTop: 22 }}>{t('lead')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '24px 0 80px' }}>
        <div className="container-x">
          <div
            className="contact-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24 }}
          >
            <Reveal>
              <Glass strong style={{ padding: 36, borderRadius: 24 }}>
                <h2 className="h3" style={{ fontSize: 22, fontWeight: 500 }}>{t('info.title')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 28 }}>
                  {items.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 14, textDecoration: 'none' }}
                    >
                      <div className="card-icon" style={{ width: 42, height: 42, flexShrink: 0 }}>
                        <c.Icon size={18} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11.5,
                            color: 'var(--text-3)',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                          }}
                        >
                          {c.label}
                        </div>
                        <div
                          style={{ fontSize: 15, marginTop: 4, color: 'var(--text-1)', lineHeight: 1.45 }}
                        >
                          {c.val}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: 36,
                    padding: '24px 0 0',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      color: 'var(--text-3)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    {t('info.responseTitle')}
                  </div>
                  <div style={{ fontSize: 15.5, marginTop: 8, color: 'var(--text-1)' }}>
                    {t('info.responseBody')}
                  </div>
                  <p style={{ marginTop: 18, color: 'var(--cyan-400)', fontSize: 13.5, fontStyle: 'italic' }}>
                    {tRoot('tagline')}
                  </p>
                </div>
              </Glass>
            </Reveal>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
