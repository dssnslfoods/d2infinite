'use client';

import { AlertCircle, ChevronRight, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { BarChart, Sparkline } from '@/components/ui';

interface Props {
  kind: 'infographic' | 'realtime' | 'platform' | 'ai' | 'support';
}

export default function SolutionMock({ kind }: Props) {
  if (kind === 'infographic') {
    return (
      <div style={{ padding: 18, height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Executive Brief · Q3
          </div>
          <span className="tag" style={{ fontSize: 10 }}>
            PDF
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Revenue</div>
            <div style={{ fontSize: 18, fontWeight: 600 }} className="mono">$84M</div>
            <div style={{ fontSize: 10, color: 'var(--emerald-400)' }}>↑ 16.8%</div>
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>EBITDA</div>
            <div style={{ fontSize: 18, fontWeight: 600 }} className="mono">28.4%</div>
            <div style={{ fontSize: 10, color: 'var(--emerald-400)' }}>↑ 2.1pp</div>
          </div>
        </div>
        <div style={{ height: 50, padding: 8, borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
          <Sparkline data={[10, 20, 15, 25, 22, 32, 28, 38, 34, 42, 40, 48]} color="#22d3ee" height={34} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 6,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 3,
                width: `${100 - i * 12}%`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'realtime') {
    return (
      <div style={{ padding: 18, height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Operations · Live</span>
          <span className="tag emerald" style={{ fontSize: 10 }}>● 99.4%</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[
            { l: 'Throughput', v: '4.2K/s', c: '#a78bfa' },
            { l: 'Errors', v: '0.02%', c: '#34d399' },
            { l: 'P95', v: '112ms', c: '#22d3ee' },
          ].map((k) => (
            <div
              key={k.l}
              style={{
                padding: 10,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.04)',
                borderTop: `1px solid ${k.c}55`,
              }}
            >
              <div style={{ fontSize: 9.5, color: 'var(--text-3)' }}>{k.l}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: k.c }} className="mono">
                {k.v}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: 10,
            borderRadius: 10,
            background: 'rgba(167, 139, 250, 0.06)',
            border: '1px solid rgba(167, 139, 250, 0.18)',
          }}
        >
          <BarChart data={[40, 60, 45, 75, 55, 80, 65, 85, 70, 90]} color="#a78bfa" height={60} accent={9} />
        </div>
      </div>
    );
  }

  if (kind === 'platform') {
    return (
      <div style={{ padding: 18, height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Data Pipeline</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>v2.4.0</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { n: 'Sources', v: 14, c: '#34d399' },
            { n: 'Transforms', v: 28, c: '#22d3ee' },
            { n: 'Models', v: 9, c: '#a78bfa' },
            { n: 'Endpoints', v: 22, c: '#fbbf24' },
          ].map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: s.c,
                  boxShadow: `0 0 8px ${s.c}`,
                }}
              />
              <div style={{ flex: 1, fontSize: 12, color: 'var(--text-2)' }}>{s.n}</div>
              <div style={{ flex: 2, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${30 + i * 15}%`,
                    background: s.c,
                    borderRadius: 3,
                  }}
                />
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--text-2)', minWidth: 26, textAlign: 'right' }}>
                {s.v}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Daily throughput</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--emerald-400)' }}>↑ 2.4M rows / sec</span>
        </div>
      </div>
    );
  }

  if (kind === 'ai') {
    const insights: { Icon: typeof TrendingUp; text: string; severity: string; color: string; conf: string }[] = [
      {
        Icon: TrendingDown,
        text: 'Cohort #B-12 churn risk ↑ 28% — root cause: pricing shift in EU-South',
        severity: 'HIGH',
        color: '#fb7185',
        conf: '0.94',
      },
      {
        Icon: AlertCircle,
        text: 'Inventory aging anomaly in SKU-2841 — 4σ above 12-week baseline',
        severity: 'MED',
        color: '#fbbf24',
        conf: '0.88',
      },
      {
        Icon: TrendingUp,
        text: 'Energy intensity ↓ 11% post-retrofit at Site-3 — replicate to Site-7?',
        severity: 'OPP',
        color: '#34d399',
        conf: '0.91',
      },
    ];
    return (
      <div style={{ padding: 18, height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={12} style={{ color: 'var(--rose-400)' }} />
            <span
              style={{
                fontSize: 11,
                color: 'var(--text-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Deep-Dive Engine · Q3 scan
            </span>
          </div>
          <span className="tag" style={{ fontSize: 10, background: 'rgba(251, 113, 133, 0.12)', color: 'var(--rose-400)', borderColor: 'rgba(251, 113, 133, 0.25)' }}>
            <Sparkles size={9} /> AI
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {insights.map((ins) => (
            <div
              key={ins.text}
              style={{
                display: 'flex',
                gap: 8,
                padding: '10px 11px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.03)',
                borderLeft: `2px solid ${ins.color}`,
                alignItems: 'flex-start',
              }}
            >
              <ins.Icon size={13} style={{ color: ins.color, flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, lineHeight: 1.4, color: 'var(--text-1)' }}>{ins.text}</div>
                <div className="mono" style={{ fontSize: 9.5, color: ins.color, marginTop: 3, letterSpacing: '0.06em' }}>
                  {ins.severity} · confidence {ins.conf}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span style={{ fontSize: 10.5, color: 'var(--text-3)' }}>1,284 metrics scanned</span>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--cyan-400)' }}>3 insights · 14s</span>
        </div>
      </div>
    );
  }

  // support
  return (
    <div style={{ padding: 18, height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>Strategic Briefings</span>
        <span className="tag amber" style={{ fontSize: 10 }}>Q3</span>
      </div>
      {[
        { d: 'Tue · 09:00', t: 'Board prep — ESG status', c: '#fbbf24' },
        { d: 'Thu · 14:00', t: 'Pricing strategy review', c: '#22d3ee' },
        { d: 'Fri · 11:30', t: 'Capex allocation model', c: '#a78bfa' },
      ].map((m) => (
        <div
          key={m.t}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <div style={{ width: 3, height: 28, borderRadius: 2, background: m.c }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{m.t}</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{m.d}</div>
          </div>
          <ChevronRight size={14} style={{ color: 'var(--text-3)' }} />
        </div>
      ))}
    </div>
  );
}
