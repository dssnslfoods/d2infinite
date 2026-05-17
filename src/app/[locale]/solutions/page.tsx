import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Activity, FileText, Layers, Users } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { Eyebrow, Glass, Reveal } from '@/components/ui';
import { CTABand } from '@/components/home';
import SolutionMock from '@/components/solutions/SolutionMock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return {
    title: `${t('headlinePre')} ${t('headlineEm')} | D2Infinite`,
    description: t('lead'),
  };
}

interface SolutionItem {
  id: 'infographic' | 'realtime' | 'platform' | 'support';
  Icon: ComponentType<{ size?: number }>;
  tint: '' | 'violet' | 'emerald' | 'amber';
  tintRgba: string;
}

const ITEMS: SolutionItem[] = [
  { id: 'infographic', Icon: FileText, tint: '', tintRgba: 'rgba(34, 211, 238, 0.15)' },
  { id: 'realtime', Icon: Activity, tint: 'violet', tintRgba: 'rgba(167, 139, 250, 0.15)' },
  { id: 'platform', Icon: Layers, tint: 'emerald', tintRgba: 'rgba(52, 211, 153, 0.15)' },
  { id: 'support', Icon: Users, tint: 'amber', tintRgba: 'rgba(251, 191, 36, 0.15)' },
];

const BULLET_COLORS: Record<'outcomes' | 'kpis' | 'deliverables', string> = {
  outcomes: '#34d399',
  kpis: '#22d3ee',
  deliverables: '#a78bfa',
};

function SolutionsContent() {
  const t = useTranslations('solutions');

  return (
    <div className="page-enter">
      <section className="section" style={{ paddingTop: 160, paddingBottom: 48 }}>
        <div className="container-x">
          <Reveal>
            <div style={{ maxWidth: 840 }}>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 className="h1" style={{ marginTop: 22 }}>
                {t('headlinePre')} <span className="gradient-text">{t('headlineEm')}</span>
              </h1>
              <p className="lead" style={{ marginTop: 22, maxWidth: 680 }}>
                {t('lead')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 36 }}>
              {ITEMS.map((s) => {
                const item = t.raw(`items.${s.id}`) as { title: string };
                return (
                  <a key={s.id} href={`#${s.id}`} className="btn btn-glass btn-sm">
                    <s.Icon size={14} /> {item.title.split(' ').slice(0, 2).join(' ')}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '24px 0 80px' }}>
        <div className="container-x">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {ITEMS.map((s, i) => {
              const item = t.raw(`items.${s.id}`) as {
                title: string;
                tagline: string;
                desc: string;
                outcomes: string[];
                kpis: string[];
                deliverables: string[];
              };
              const lefty = i % 2 === 0;
              const groups: { t: string; items: string[]; key: keyof typeof BULLET_COLORS }[] = [
                { t: t('labels.outcomes'), items: item.outcomes, key: 'outcomes' },
                { t: t('labels.kpis'), items: item.kpis, key: 'kpis' },
                { t: t('labels.deliverables'), items: item.deliverables, key: 'deliverables' },
              ];

              const detail: ReactNode = (
                <div>
                  <div className={`card-icon ${s.tint}`} style={{ width: 54, height: 54 }}>
                    <s.Icon size={26} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18 }}>
                    <span
                      className="mono"
                      style={{ fontSize: 12, color: 'var(--text-3)', letterSpacing: '0.08em' }}
                    >
                      0{i + 1}
                    </span>
                    <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.18)' }} />
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--text-3)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.tagline}
                    </span>
                  </div>
                  <h2 className="h2" style={{ marginTop: 14, fontSize: 'clamp(28px, 3vw, 40px)' }}>
                    {item.title}
                  </h2>
                  <p className="lead" style={{ marginTop: 14, fontSize: 17 }}>
                    {item.desc}
                  </p>
                  <div
                    className="bullet-grid"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 28 }}
                  >
                    {groups.map((g) => (
                      <div key={g.t}>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'var(--text-3)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            marginBottom: 10,
                            fontWeight: 500,
                          }}
                        >
                          {g.t}
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 7,
                          }}
                        >
                          {g.items.map((it) => (
                            <li
                              key={it}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 8,
                                fontSize: 13.5,
                                color: 'var(--text-2)',
                                lineHeight: 1.4,
                              }}
                            >
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: '50%',
                                  background: BULLET_COLORS[g.key],
                                  boxShadow: `0 0 6px ${BULLET_COLORS[g.key]}`,
                                  marginTop: 7,
                                  flexShrink: 0,
                                }}
                              />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );

              const mock: ReactNode = (
                <Glass style={{ height: 320, borderRadius: 18 }}>
                  <SolutionMock kind={s.id} />
                </Glass>
              );

              return (
                <Reveal key={s.id}>
                  <Glass
                    id={s.id}
                    strong
                    className="glass-xl"
                    style={{ padding: 42, borderRadius: 28, position: 'relative' }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: -100,
                        right: -80,
                        width: 400,
                        height: 400,
                        background: `radial-gradient(circle, ${s.tintRgba}, transparent 60%)`,
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      className="sol-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: lefty ? '1.2fr 1fr' : '1fr 1.2fr',
                        gap: 48,
                        alignItems: 'center',
                        position: 'relative',
                      }}
                    >
                      {lefty ? detail : mock}
                      {lefty ? mock : detail}
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
          .sol-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 720px) {
          .bullet-grid { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .bullet-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolutionsContent />;
}

// Note: SolutionsContent uses useTranslations which works in server components when setRequestLocale has been called.

