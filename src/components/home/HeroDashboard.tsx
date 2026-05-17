'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { Glass, Sparkline, BarChart, DonutChart, useLiveData } from '@/components/ui';

export default function HeroDashboard() {
  const t = useTranslations('home.dashboard');
  const tCommon = useTranslations('common');
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const dx = (e.clientX - r.left - r.width / 2) / r.width;
    const dy = (e.clientY - r.top - r.height / 2) / r.height;
    setTilt({ x: dy * -6, y: dx * 8 });
  };

  const revenueData = useLiveData([34, 38, 42, 40, 48, 55, 58, 61, 65, 72, 78, 84], [-3, 5], 1800);
  const flowData = useLiveData([60, 55, 70, 65, 78, 72, 85, 80, 88, 92], [-4, 6], 2000);
  const barData = useLiveData([60, 80, 45, 90, 70, 85, 55, 95], [-8, 12], 1600);

  const kpis = [
    { label: t('kpi1'), val: '$84.2M', delta: '+16.8%' },
    { label: t('kpi2'), val: '27', delta: '+3' },
    { label: t('kpi3'), val: '6.1×', delta: '+0.4×' },
  ];

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="hero-dash-wrap"
    >
      {/* Main panel */}
      <Glass
        strong
        className="hero-dash-main"
        style={{
          transform: `rotateX(${tilt.x * 0.6}deg) rotateY(${tilt.y * 0.6}deg)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 8 }}>{t('label')}</span>
          </div>
          <span className="tag emerald" style={{ fontSize: 10.5 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--emerald-400)',
                boxShadow: '0 0 8px var(--emerald-400)',
              }}
            />
            {tCommon('live')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
          {kpis.map((k) => (
            <div key={k.label} className="kpi">
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value mono">{k.val}</div>
              <div className="kpi-delta up">↑ {k.delta}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: 14,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {t('trajectory')}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, marginTop: 2, letterSpacing: '-0.02em' }} className="mono">
                $84.2M
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['7D', '30D', 'QTD', 'YTD'].map((p, i) => (
                <span
                  key={p}
                  style={{
                    fontSize: 10.5,
                    padding: '4px 8px',
                    borderRadius: 6,
                    background: i === 3 ? 'rgba(34,211,238,0.15)' : 'transparent',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: i === 3 ? 'var(--cyan-400)' : 'var(--text-3)',
                    fontWeight: 500,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div style={{ height: 120 }}>
            <Sparkline data={revenueData} color="#22d3ee" height={120} stroke={2} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, marginTop: 10 }}>
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: 8,
              }}
            >
              {t('channelMix')}
            </div>
            <BarChart data={barData} color="#a78bfa" height={68} accent={5} />
          </div>
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {t('sla')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }} className="mono">
                99.4%
              </div>
              <div style={{ fontSize: 11, color: 'var(--emerald-400)', marginTop: 2 }}>{t('slaNote')}</div>
            </div>
            <DonutChart value={0.94} size={62} />
          </div>
        </div>
      </Glass>

      {/* Floating Q3 card */}
      <Glass
        className="hero-float"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 264,
          padding: 16,
          borderRadius: 18,
          transform: `translate3d(0, ${-tilt.x * 1.4}px, 40px) rotateY(${tilt.y * 1.2}deg)`,
          transition: 'transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div className="card-icon emerald" style={{ width: 36, height: 36 }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{t('q3Title')}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{t('q3Updated')}</div>
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }} className="mono">
          +16.8%
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4 }}>{t('q3Note')}</div>
        <div style={{ marginTop: 10, height: 28 }}>
          <Sparkline data={flowData} color="#34d399" height={28} fill={false} stroke={1.8} />
        </div>
      </Glass>

      {/* Floating sources card */}
      <Glass
        className="hero-float"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 240,
          padding: 16,
          borderRadius: 18,
          transform: `translate3d(0, ${-tilt.x * 0.9}px, 24px) rotateY(${tilt.y * 0.9}deg)`,
          transition: 'transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 10,
          }}
        >
          {t('sourcesTitle')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { name: 'SAP S/4HANA', c: '#22d3ee' },
            { name: 'Salesforce', c: '#a78bfa' },
            { name: 'Snowflake', c: '#34d399' },
            { name: 'BigQuery', c: '#fbbf24' },
          ].map((s, i) => (
            <div
              key={s.name}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: s.c,
                    boxShadow: `0 0 8px ${s.c}`,
                  }}
                />
                {s.name}
              </span>
              <span className="mono" style={{ color: 'var(--text-3)', fontSize: 11 }}>
                {(2.4 + i * 0.7).toFixed(1)}M rows
              </span>
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
}
