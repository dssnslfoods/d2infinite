import { useTranslations } from 'next-intl';
import { Bolt, Cpu, Target, TrendingUp } from 'lucide-react';
import { Eyebrow, Glass, Reveal } from '@/components/ui';

const ICONS = [Target, Cpu, Bolt, TrendingUp];

export default function HowItWorks() {
  const t = useTranslations('home.howItWorks');
  const phases = ['p1', 'p2', 'p3', 'p4'] as const;

  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="h2" style={{ marginTop: 18 }}>
              {t('titlePre')} <span className="gradient-text">{t('titleEm')}</span> {t('titlePost')}
            </h2>
          </div>
        </Reveal>

        <div
          className="phase-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}
        >
          {phases.map((key, i) => {
            const p = t.raw(`phases.${key}`) as { n: string; title: string; desc: string };
            const Ico = ICONS[i];
            return (
              <Reveal key={key} delay={i * 100}>
                <Glass className="card-pad" style={{ minHeight: 240 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      className="mono"
                      style={{ fontSize: 13, color: 'var(--cyan-400)', letterSpacing: '0.05em' }}
                    >
                      {p.n}
                    </span>
                    <Ico size={20} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 500, marginTop: 18 }}>{p.title}</h3>
                  <p className="body-text" style={{ fontSize: 14 }}>{p.desc}</p>
                </Glass>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .phase-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .phase-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
