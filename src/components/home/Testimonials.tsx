import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { Eyebrow, Glass, Reveal } from '@/components/ui';

export default function Testimonials() {
  const t = useTranslations('home.testimonials');
  const keys = ['t1', 't2', 't3'] as const;

  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="h2" style={{ marginTop: 18 }}>
              {t('title')}
            </h2>
          </div>
        </Reveal>

        <div className="cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {keys.map((k, i) => {
            const item = t.raw(`items.${k}`) as { quote: string; role: string; context: string };
            return (
              <Reveal key={k} delay={i * 100}>
                <Glass className="card-pad">
                  <Quote size={28} style={{ color: 'var(--cyan-400)', opacity: 0.6 }} />
                  <p
                    className="body-text"
                    style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-1)', flex: 1 }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.role}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{item.context}</div>
                  </div>
                </Glass>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
