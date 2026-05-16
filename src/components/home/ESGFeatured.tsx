'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Glass, Reveal, Sparkline, useLiveData } from '@/components/ui';
import { Link } from '@/i18n/routing';

function ESGMock() {
  const t = useTranslations('home.esg');
  const tCommon = useTranslations('common');
  const eData = useLiveData([45, 52, 58, 62, 68, 72, 78, 82, 85, 88], [-2, 4], 2000);
  const sData = useLiveData([62, 65, 70, 72, 75, 78, 80, 82, 85, 87], [-2, 3], 2200);

  const cards = [
    { label: t('envLabel'), val: '88', color: '#34d399' },
    { label: t('socLabel'), val: '82', color: '#22d3ee' },
    { label: t('govLabel'), val: '94', color: '#a78bfa' },
  ];

  return (
    <div style={{ position: 'relative', height: 540, marginBottom: -1 }}>
      <Glass
        strong
        style={{
          position: 'absolute',
          inset: '30px 0 30px 0',
          padding: 20,
          borderRadius: '22px 22px 0 0',
        }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{t('mockTitle')}</span>
            <span className="tag emerald" style={{ fontSize: 10 }}>
              {tCommon('live')}
            </span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{t('quarter')}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
          {cards.map((k) => (
            <div key={k.label} className="kpi" style={{ textAlign: 'center' }}>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value mono" style={{ color: k.color, marginTop: 6 }}>
                {k.val}
              </div>
              <div
                style={{
                  height: 4,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 2,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${k.val}%`,
                    background: k.color,
                    borderRadius: 2,
                    boxShadow: `0 0 8px ${k.color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: 14,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {t('carbonLabel')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }} className="mono">
                42.3 <span style={{ fontSize: 11, color: 'var(--emerald-400)' }}>{t('carbonDelta')}</span>
              </div>
            </div>
          </div>
          <div style={{ height: 80 }}>
            <Sparkline data={eData} color="#34d399" height={80} />
          </div>
        </div>
        <div
          style={{
            padding: 14,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {t('socialLabel')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }} className="mono">
                82.4 <span style={{ fontSize: 11, color: 'var(--cyan-400)' }}>{t('socialDelta')}</span>
              </div>
            </div>
          </div>
          <div style={{ height: 60 }}>
            <Sparkline data={sData} color="#22d3ee" height={60} />
          </div>
        </div>
      </Glass>
    </div>
  );
}

export default function ESGFeatured() {
  const t = useTranslations('home.esg');
  const tCommon = useTranslations('common');

  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <Glass
            strong
            style={{ padding: '56px 56px 0', borderRadius: 32, position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(52, 211, 153, 0.18), transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div
              className="esg-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.15fr',
                gap: 56,
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div style={{ paddingBottom: 56 }}>
                <span className="tag emerald" style={{ marginBottom: 18 }}>
                  <Sparkles size={11} /> {t('badge')}
                </span>
                <h2 className="h2" style={{ marginTop: 18 }}>{t('title')}</h2>
                <p className="lead" style={{ marginTop: 18 }}>{t('desc')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
                  {(['f1', 'f2', 'f3', 'f4'] as const).map((k) => (
                    <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--emerald-400)', flexShrink: 0 }} />
                      <span style={{ fontSize: 14.5, color: 'var(--text-2)' }}>{t(`features.${k}`)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 32 }}>
                  <Link href="/case-studies" className="btn btn-emerald">
                    {tCommon('viewCase')} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <ESGMock />
            </div>
          </Glass>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .esg-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
