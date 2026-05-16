import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, FlaskConical, Leaf, Wallet } from 'lucide-react';
import type { ComponentType } from 'react';
import { Eyebrow, Glass, Reveal, Stat } from '@/components/ui';
import { CTABand } from '@/components/home';
import { Link } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cases' });
  return {
    title: `${t('headlinePre')} ${t('headlineEm')} | D2Infinite`,
    description: t('lead'),
  };
}

interface CaseDef {
  id: 'esg' | 'rd' | 'payroll';
  Icon: ComponentType<{ size?: number }>;
  tint: 'emerald' | 'violet' | '';
  tintRgba: string;
  borderColor: string;
}

const CASES: CaseDef[] = [
  { id: 'esg', Icon: Leaf, tint: 'emerald', tintRgba: 'rgba(52, 211, 153, 0.14)', borderColor: '#fb7185' },
  { id: 'rd', Icon: FlaskConical, tint: '', tintRgba: 'rgba(34, 211, 238, 0.14)', borderColor: '#22d3ee' },
  { id: 'payroll', Icon: Wallet, tint: 'violet', tintRgba: 'rgba(167, 139, 250, 0.14)', borderColor: '#a78bfa' },
];

const BLOCK_COLORS = { challenge: '#fb7185', solution: '#22d3ee', result: '#34d399' };

function CasesContent() {
  const t = useTranslations('cases');
  const tCommon = useTranslations('common');

  return (
    <div className="page-enter">
      <section className="section" style={{ paddingTop: 160, paddingBottom: 60 }}>
        <div className="container-x">
          <Reveal>
            <div style={{ maxWidth: 840, textAlign: 'center', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex' }}>
                <Eyebrow>{t('eyebrow')}</Eyebrow>
              </div>
              <h1 className="h1" style={{ marginTop: 22 }}>
                {t('headlinePre')} <span className="gradient-text">{t('headlineEm')}</span>
              </h1>
              <p className="lead" style={{ marginTop: 22 }}>
                {t('lead')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="stat-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
                marginTop: 64,
                maxWidth: 920,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {[
                { v: 100, s: '+', l: t('stats.projects') },
                { v: 50, s: '+', l: t('stats.teams') },
                { v: 5, s: '', l: t('stats.industries') },
                { v: 6, s: '×', l: t('stats.faster'), d: 1 },
              ].map((s) => (
                <Glass key={s.l} style={{ padding: 24, textAlign: 'center' }}>
                  <Stat value={s.v} suffix={s.s} label={s.l} decimals={s.d ?? 0} />
                </Glass>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container-x">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {CASES.map((c) => {
              const item = t.raw(`items.${c.id}`) as {
                industry: string;
                title: string;
                summary: string;
                m1v: string;
                m1l: string;
                m2v: string;
                m2l: string;
                m3v: string;
                m3l: string;
                challenge: string;
                solution: string;
                result: string;
              };
              const metrics = [
                { v: item.m1v, l: item.m1l },
                { v: item.m2v, l: item.m2l },
                { v: item.m3v, l: item.m3l },
              ];
              return (
                <Reveal key={c.id}>
                  <Glass strong style={{ padding: 42, borderRadius: 28, position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: -150,
                        right: -100,
                        width: 480,
                        height: 480,
                        background: `radial-gradient(circle, ${c.tintRgba}, transparent 60%)`,
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      className="case-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.5fr',
                        gap: 48,
                        position: 'relative',
                      }}
                    >
                      <div>
                        <div className={`card-icon ${c.tint}`} style={{ width: 54, height: 54 }}>
                          <c.Icon size={26} />
                        </div>
                        <span className={`tag ${c.tint}`} style={{ marginTop: 18, display: 'inline-flex' }}>
                          {item.industry}
                        </span>
                        <h2 className="h3" style={{ marginTop: 14, fontSize: 'clamp(22px, 2.2vw, 30px)' }}>
                          {item.title}
                        </h2>
                        <p className="body-text" style={{ marginTop: 14, fontSize: 15 }}>
                          {item.summary}
                        </p>

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            marginTop: 24,
                            padding: '20px 0',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {metrics.map((m) => (
                            <div
                              key={m.l}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                gap: 12,
                              }}
                            >
                              <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{m.l}</span>
                              <span
                                className="mono gradient-text"
                                style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}
                              >
                                {m.v}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Link href="/contact" className="btn btn-glass" style={{ marginTop: 24 }}>
                          {c.id === 'payroll' ? tCommon('contactUs') : tCommon('readCase')}{' '}
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {(['challenge', 'solution', 'result'] as const).map((k) => (
                          <div
                            key={k}
                            style={{
                              padding: 18,
                              borderRadius: 14,
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              borderLeft: `3px solid ${BLOCK_COLORS[k]}`,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 11,
                                color: 'var(--text-3)',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                marginBottom: 8,
                                fontWeight: 600,
                              }}
                            >
                              {t(`labels.${k}`)}
                            </div>
                            <p className="body-text" style={{ fontSize: 14.5, lineHeight: 1.55 }}>
                              {item[k]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Glass>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand />

      <style>{`
        @media (max-width: 1000px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .case-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CasesContent />;
}
