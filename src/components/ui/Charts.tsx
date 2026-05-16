'use client';

import { useEffect, useId, useState } from 'react';

/* ---------- live data hook ---------- */

export function useLiveData(init: number[], range: [number, number] = [-2, 3], ms = 1500) {
  const [data, setData] = useState(init);
  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => {
        const last = d[d.length - 1];
        const next = Math.max(20, Math.min(95, last + (Math.random() * (range[1] - range[0]) + range[0])));
        return [...d.slice(1), next];
      });
    }, ms);
    return () => clearInterval(id);
  }, [ms, range]);
  return data;
}

/* ---------- Sparkline ---------- */

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  fill?: boolean;
  stroke?: number;
}

export function Sparkline({ data, color = '#22d3ee', height = 36, fill = true, stroke = 1.6 }: SparklineProps) {
  const w = 100;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const id = useId().replace(/:/g, '');
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
  const dFill = `${d} L ${w} ${height} L 0 ${height} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" style={{ display: 'block', width: '100%', height }}>
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={dFill} fill={`url(#sg-${id})`} />}
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- BarChart ---------- */

interface BarChartProps {
  data: number[];
  color?: string;
  height?: number;
  accent?: number;
}

export function BarChart({ data, color = '#22d3ee', height = 80, accent }: BarChartProps) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height, width: '100%' }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${(v / max) * 100}%`,
            borderRadius: '4px 4px 2px 2px',
            background: accent === i ? `linear-gradient(180deg, ${color}, ${color}88)` : `${color}55`,
            boxShadow: accent === i ? `0 0 16px ${color}88` : 'none',
            transition: 'height 480ms ease',
          }}
        />
      ))}
    </div>
  );
}

/* ---------- DonutChart ---------- */

interface DonutChartProps {
  value?: number;
  size?: number;
  color?: string;
}

export function DonutChart({ value = 0.78, size = 80, color = '#22d3ee' }: DonutChartProps) {
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={`${c * value} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 600ms ease' }}
      />
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, fill: '#fff' }}
      >
        {Math.round(value * 100)}%
      </text>
    </svg>
  );
}
