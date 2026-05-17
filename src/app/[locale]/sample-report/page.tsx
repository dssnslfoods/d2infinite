import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  BarChart3,
  Download,
  ExternalLink,
  Layers,
  Lock,
  Sparkles,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Eyebrow, Glass, Reveal } from '@/components/ui';
import { CTABand } from '@/components/home';
import { Link } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sampleReport' });
  return {
    title: `${t('headlinePre')} ${t('headlineEm')} | D2Infinite`,
    description: t('lead'),
  };
}

interface FeatureDef {
  id: 'f1' | 'f2' | 'f3' | 'f4';
  Icon: ComponentType<{ size?: number }>;
  tint: '' | 'violet' | 'emerald' | 'amber';
}

const FEATURES: FeatureDef[] = [
  { id: 'f1', Icon: Layers, tint: '' },
  { id: 'f2', Icon: Lock, tint: 'violet' },
  { id: 'f3', Icon: BarChart3, tint: 'emerald' },
  { id: 'f4', Icon: Download, tint: 'amber' },
];

interface ShotDef {
  id: 'login' | 'dashboard' | 'env';
  src: string;
  ratio: number; // width/height for layout
}

const SHOTS: ShotDef[] = [
  { id: 'login', src: '/showcase/esg-login.png', ratio: 16 / 10 },
  { id: 'dashboard', src: '/showcase/esg-dashboard.png', ratio: 16 / 19 },
  { id: 'env', src: '/showcase/esg-environmental.png', ratio: 16 / 32 },
];

function SampleReportContent() {
  const t = useTranslations('sampleReport');
  const tCommon = useTranslations('common');

  const meta: { key: 'client' | 'industry' | 'scope' | 'stack'; val: string }[] = [
    { key: 'client', val: t('client') },
    { key: 'industry', val: t('industry') },
    { key: 'scope', val: t('scope') },
    { key: 'stack', val: t('stack') },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="section page-hero" style={{ paddingTop: 160, paddingBottom: 40 }}>
        <div className="container-x">
          <Reveal>
            <div style={{ maxWidth: 920, textAlign: 'center', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex' }}>
                <Eyebrow>{t('eyebrow')}</Eyebrow>
              </div>
              <h1 className="h1" style={{ marginTop: 22 }}>
                {t('headlinePre')} <span className="gradient-text">{t('headlineEm')}</span>
              </h1>
              <p className="lead" style={{ marginTop: 22, maxWidth: 760, margin: '22px auto 0' }}>
                {t('lead')}
              </p>
            </div>
          </Reveal>

          {/* Meta strip */}
          <Reveal delay={120}>
            <div
              className="meta-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                marginTop: 56,
                maxWidth: 1080,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {meta.map((m) => (
                <Glass key={m.key} style={{ padding: 18 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--text-3)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    {t(`labels.${m.key}`)}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      marginTop: 6,
                      color: 'var(--text-1)',
                      lineHeight: 1.4,
                      fontWeight: 500,
                    }}
                  >
                    {m.val}
                  </div>
                </Glass>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brief */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container-x">
          <Reveal>
            <Glass
              strong
              className="glass-xl"
              style={{ padding: 42, borderRadius: 28, maxWidth: 920, margin: '0 auto' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <Sparkles size={18} style={{ color: 'var(--cyan-400)' }} />
                <h2 className="h3" style={{ fontSize: 22, fontWeight: 500 }}>
                  {t('brief.title')}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p className="body-text" style={{ fontSize: 15.5, lineHeight: 1.7 }}>
                  {t('brief.p1')}
                </p>
                <p className="body-text" style={{ fontSize: 15.5, lineHeight: 1.7 }}>
                  {t('brief.p2')}
                </p>
              </div>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* Screenshots */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container-x">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {SHOTS.map((shot, i) => (
              <Reveal key={shot.id}>
                <Glass
                  strong
                  className="glass-xl"
                  style={{ padding: 28, borderRadius: 24, overflow: 'hidden' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 18,
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 12,
                          color: 'var(--cyan-400)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.18)' }}
                      />
                      <h3 style={{ fontSize: 18, fontWeight: 500 }}>
                        {t(`shots.${shot.id}Title`)}
                      </h3>
                    </div>
                    <span className="tag">
                      <ExternalLink size={10} /> Live System
                    </span>
                  </div>
                  <p
                    className="body-text"
                    style={{ fontSize: 14.5, marginBottom: 20, maxWidth: 820 }}
                  >
                    {t(`shots.${shot.id}Desc`)}
                  </p>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: 14,
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      aspectRatio: shot.ratio,
                    }}
                  >
                    <Image
                      src={shot.src}
                      alt={t(`shots.${shot.id}Title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1240px) 90vw, 1180px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      priority={i === 0}
                    />
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
              <Eyebrow>{t('outcomes.title')}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div
              className="stat-grid-4"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
                maxWidth: 920,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {(['o1', 'o2', 'o3', 'o4'] as const).map((k) => (
                <Glass key={k} style={{ padding: 24, textAlign: 'center' }}>
                  <div
                    className="mono gradient-text"
                    style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}
                  >
                    {t(`outcomes.${k}Val`)}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--text-3)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginTop: 8,
                      fontWeight: 500,
                    }}
                  >
                    {t(`outcomes.${k}Label`)}
                  </div>
                </Glass>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
              <h2 className="h2">{t('features.title')}</h2>
            </div>
          </Reveal>
          <div
            className="cap-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}
          >
            {FEATURES.map((f) => (
              <Reveal key={f.id}>
                <Glass className="card-pad">
                  <div className={`card-icon ${f.tint}`}>
                    <f.Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 500, marginTop: 6 }}>
                    {t(`features.${f.id}Title`)}
                  </h3>
                  <p className="body-text" style={{ fontSize: 14 }}>
                    {t(`features.${f.id}Desc`)}
                  </p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container-x">
          <Reveal>
            <Glass
              style={{
                padding: '20px 28px',
                borderRadius: 16,
                maxWidth: 880,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p
                className="caption"
                style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-3)' }}
              >
                {t('note')}
              </p>
              <Link
                href="/contact"
                className="btn btn-glass btn-sm"
                style={{ marginTop: 14 }}
              >
                {tCommon('requestDemo')} <ArrowRight size={12} />
              </Link>
            </Glass>
          </Reveal>
        </div>
      </section>

      <CTABand />

      <style>{`
        @media (max-width: 900px) {
          .meta-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cap-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .meta-grid { grid-template-columns: 1fr !important; }
          .cap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default async function SampleReportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SampleReportContent />;
}
