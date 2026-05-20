'use client';

import { useEffect, useState } from 'react';

/**
 * A thin gradient bar pinned to the top of the viewport that reflects how far
 * the page has been scrolled. Purely decorative — hidden from assistive tech.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 90,
        transformOrigin: '0 50%',
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(90deg, var(--cyan-500), var(--cyan-400), var(--violet-400))',
        boxShadow: '0 0 12px -2px rgba(34, 211, 238, 0.6)',
        transition: 'transform 80ms linear',
        pointerEvents: 'none',
      }}
    />
  );
}
