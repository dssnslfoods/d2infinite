import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { BarChart3, Code2, Eye, Handshake, Lightbulb, Palette, Quote, Sparkles, Target, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import { Eyebrow, Glass, Reveal, Stat } from '@/components/ui';
import { CTABand } from '@/components/home';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('headlinePre')} ${t('headlineEm')} | D2Infinite`,
    description: t('lead'),
  };
}

interface PrincipleDef {
  id: 'clarity' | 'precision' | 'partnership' | 'compounding';
  Icon: ComponentType<{ size?: number }>;
  tint: '' | 'violet' | 'emerald' | 'amber';
}

const PRINCIPLES: PrincipleDef[] = [
  { id: 'clarity', Icon: Eye, tint: '' },
  { id: 'precision', Icon: Target, tint: 'violet' },
  { id: 'partnership', Icon: Handshake, tint: 'emerald' },
  { id: 'compounding', Icon: Lightbulb, tint: 'amber' },
];

interface TeamDef {
  id: 'leadership' | 'engineering' | 'design' | 'analytics';
  Icon: ComponentType<{ size?: number }>;
  tint: '' | 'violet' | 'rose' | 'emerald';
}

const TEAM: TeamDef[] = [
  { id: 'leadership', Icon: Users, tint: '' },
  { id: 'engineering', Icon: Code2, tint: 'violet' },
  { id: 'design', Icon: Palette, tint: 'rose' },
  { id: 'analytics', Icon: BarChart3, tint: 'emerald' },
];

function AboutContent() {
  const t = useTranslations('about');

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
                {t('headlinePre')} <span className="gradient-text">{t('headlineEm')}</span> {t('headlinePost')}
              </h1>
              <p className="lead" style={{ marginTop: 22 }}>{t('lead')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story + Stats */}
      <section style={{ padding: '24px 0 80px' }}>
        <div className="container-x">
          <div
            className="story-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}
          >
            <Reveal>
              <Glass strong className="glass-xl" style={{ padding: 42, borderRadius: 28 }}>
                <h2 className="h2" style={{ fontSize: 'clamp(28px, 2.8vw, 38px)' }}>
                  {t('story.title')}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>
                  {(['p1', 'p2', 'p3'] as const).map((k) => (
                    <p key={k} className="body-text" style={{ fontSize: 15.5, lineHeight: 1.7 }}>
                      {t(`story.${k}`)}
                    </p>
                  ))}
                </div>
              </Glass>
            </Reveal>

            <Reveal delay={120}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { v: 100, s: '+', l: t('stats.projects') },
                  { v: 50, s: '+', l: t('stats.clients') },
                  { v: 5, s: '', l: t('stats.industries') },
                  { v: 24, s: '/7', l: t('stats.support') },
                ].map((s) => (
                  <Glass key={s.l} style={{ padding: 28 }}>
                    <Stat value={s.v} suffix={s.s} label={s.l} />
                  </Glass>
                ))}
                <Glass style={{ padding: 28, gridColumn: 'span 2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Sparkles size={20} style={{ color: 'var(--cyan-400)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{t('stats.founded')}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>
                        {t('stats.foundedSub')}
                      </div>
                    </div>
                  </div>
                </Glass>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
              <Eyebrow>{t('principles.eyebrow')}</Eyebrow>
              <h2 className="h2" style={{ marginTop: 18 }}>
                {t('principles.titlePre')} <span className="gradient-text">{t('principles.titleEm')}</span>
              </h2>
            </div>
          </Reveal>
          <div className="cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {PRINCIPLES.map((p) => {
              const item = t.raw(`principles.items.${p.id}`) as { title: string; desc: string };
              return (
                <Reveal key={p.id}>
                  <Glass className="card-pad">
                    <div className={`card-icon ${p.tint}`}>
                      <p.Icon size={20} />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 500, marginTop: 6 }}>{item.title}</h3>
                    <p className="body-text" style={{ fontSize: 14 }}>{item.desc}</p>
                  </Glass>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
              <Eyebrow>{t('team.eyebrow')}</Eyebrow>
              <h2 className="h2" style={{ marginTop: 18 }}>{t('team.title')}</h2>
              <p className="lead" style={{ marginTop: 18 }}>{t('team.lead')}</p>
            </div>
          </Reveal>
          <div className="cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {TEAM.map((m) => {
              const item = t.raw(`team.items.${m.id}`) as { title: string; subtitle: string; desc: string };
              return (
                <Reveal key={m.id}>
                  <Glass className="card-pad">
                    <div className={`card-icon ${m.tint}`}>
                      <m.Icon size={20} />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 500, marginTop: 6 }}>{item.title}</h3>
                    <div className="tag" style={{ alignSelf: 'flex-start' }}>
                      {item.subtitle}
                    </div>
                    <p className="body-text" style={{ fontSize: 14 }}>{item.desc}</p>
                  </Glass>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <Glass
              strong
              className="glass-manifesto"
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
                    'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(34, 211, 238, 0.12), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto' }}>
                <Quote size={40} style={{ color: 'var(--cyan-400)', opacity: 0.5, marginBottom: 18 }} />
                <p
                  style={{
                    fontSize: 'clamp(22px, 2.4vw, 32px)',
                    lineHeight: 1.35,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-1)',
                    fontWeight: 400,
                  }}
                >
                  {t('manifesto.body')}
                </p>
                <div
                  style={{
                    marginTop: 36,
                    color: 'var(--text-3)',
                    fontSize: 13,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {t('manifesto.footer')}
                </div>
              </div>
            </Glass>
          </Reveal>
        </div>
      </section>

      <CTABand />

      <style>{`
        @media (max-width: 1000px) {
          .story-grid { grid-template-columns: 1fr !important; }
          .cap-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .cap-grid { grid-template-columns: 1fr !important; }
          .story-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
