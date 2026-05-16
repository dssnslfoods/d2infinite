import { useTranslations } from 'next-intl';
import { Activity, Check, FileText, Layers } from 'lucide-react';
import { Eyebrow, Glass, Reveal } from '@/components/ui';
import type { ComponentType } from 'react';

interface Cap {
  key: 'infographic' | 'realtime' | 'platform';
  Icon: ComponentType<{ size?: number }>;
  tint: '' | 'violet' | 'emerald';
}

const ITEMS: Cap[] = [
  { key: 'infographic', Icon: FileText, tint: '' },
  { key: 'realtime', Icon: Activity, tint: 'violet' },
  { key: 'platform', Icon: Layers, tint: 'emerald' },
];

export default function Capabilities() {
  const t = useTranslations('home.capabilities');

  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <div className="container-x">
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="h2" style={{ marginTop: 18 }}>
              {t('titlePre')} <span className="gradient-text">{t('titleEm')}</span>
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              {t('subtitle')}
            </p>
          </div>
        </Reveal>

        <div
          className="cap-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}
        >
          {ITEMS.map((c) => {
            const item = t.raw(`items.${c.key}`) as { title: string; desc: string; stat1: string; stat2: string };
            return (
              <Reveal key={c.key}>
                <Glass className="card-pad">
                  <div className={`card-icon ${c.tint}`}>
                    <c.Icon size={20} />
                  </div>
                  <h3 className="h3" style={{ marginTop: 6 }}>
                    {item.title}
                  </h3>
                  <p className="body-text" style={{ fontSize: 14.5 }}>
                    {item.desc}
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '8px 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    {[item.stat1, item.stat2].map((s) => (
                      <li
                        key={s}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 13,
                          color: 'var(--text-2)',
                        }}
                      >
                        <Check size={14} style={{ color: 'var(--cyan-400)' }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Glass>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cap-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
