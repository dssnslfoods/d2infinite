'use client';

import { useEffect, useRef, useState } from 'react';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  duration?: number;
}

export default function Stat({ value, suffix = '', label, decimals = 0, duration = 1200 }: StatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion / no observer: show the final number, skip the count-up.
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setV(value);
      return;
    }

    let raf = 0;
    const animate = () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / duration);
        const e = 1 - Math.pow(1 - k, 3);
        setV(value * e);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <div ref={ref}>
      <div
        style={{
          fontSize: 'clamp(40px, 4.4vw, 64px)',
          fontWeight: 500,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        <span className="gradient-text">
          {v.toFixed(decimals)}
          {suffix}
        </span>
      </div>
      <div
        style={{
          marginTop: 8,
          color: 'var(--text-3)',
          fontSize: 13.5,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}
