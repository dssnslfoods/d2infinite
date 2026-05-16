import { useTranslations } from 'next-intl';
import { Glass, Reveal } from '@/components/ui';

const CLIENTS = ['NSL Foods', 'SET100 Group', 'ASEAN Logistics', 'RetailMax', 'HealthHub', 'FinanceOne'];

export default function TrustedBy() {
  const t = useTranslations('home');
  return (
    <section style={{ padding: '16px 0 64px' }}>
      <div className="container-x">
        <Reveal>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-3)',
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            {t('trustedBy')}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Glass style={{ padding: '22px 36px', borderRadius: 999 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 24,
                color: 'var(--text-2)',
              }}
            >
              {CLIENTS.map((n) => (
                <span
                  key={n}
                  style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', opacity: 0.85 }}
                >
                  {n}
                </span>
              ))}
            </div>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
