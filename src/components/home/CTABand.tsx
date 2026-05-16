import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Eyebrow, Glass, Reveal } from '@/components/ui';

export default function CTABand() {
  const t = useTranslations('home.cta');
  const tCommon = useTranslations('common');

  return (
    <section style={{ padding: '80px 0', marginTop: 40 }}>
      <div className="container-x">
        <Reveal>
          <Glass
            strong
            style={{
              padding: '72px 56px',
              borderRadius: 36,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(34, 211, 238, 0.18), transparent 60%), radial-gradient(ellipse 60% 100% at 50% 100%, rgba(139, 92, 246, 0.15), transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'inline-flex' }}>
                <Eyebrow>{t('eyebrow')}</Eyebrow>
              </div>
              <h2 className="h2" style={{ margin: '22px auto 0', maxWidth: 760 }}>
                {t('titlePre')} <span className="gradient-text">{t('titleEm')}</span>
              </h2>
              <p className="lead" style={{ margin: '18px auto 0', maxWidth: 560 }}>
                {t('lead')}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  marginTop: 32,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Link href="/contact" className="btn btn-primary">
                  {tCommon('bookBriefing')} <ArrowRight size={16} />
                </Link>
                <Link href="/solutions" className="btn btn-glass">
                  {tCommon('exploreSolutions')}
                </Link>
              </div>
            </div>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
