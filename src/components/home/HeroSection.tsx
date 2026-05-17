import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Play, Shield, Users } from 'lucide-react';
import { Eyebrow, Reveal } from '@/components/ui';
import HeroDashboard from './HeroDashboard';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');

  return (
    <section className="section hero-section" style={{ paddingTop: 160 }}>
      <div className="container-x">
        <div
          className="hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}
        >
          <div>
            <Reveal>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display" style={{ marginTop: 22 }}>
                {t('headlinePre')} <span className="gradient-text">{t('headlineEm')}</span>
                <br />
                {t('headlinePost')}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="lead" style={{ marginTop: 24, maxWidth: 540 }}>
                {t('lead')}
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary">
                  {tCommon('requestDemo')} <ArrowRight size={16} />
                </Link>
                <Link href="/solutions" className="btn btn-glass">
                  <Play size={14} /> {tCommon('watch')}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <div style={{ display: 'flex', gap: 32, marginTop: 48, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-3)' }}>
                  <Shield size={14} /> {t('trust1')}
                </div>
                <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-3)' }}>
                  <Users size={14} /> {t('trust2')}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <HeroDashboard />
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .hero-section { padding-top: 120px !important; }
        }
        @media (max-width: 600px) {
          .hero-section { padding-top: 100px !important; }
        }
      `}</style>
    </section>
  );
}
