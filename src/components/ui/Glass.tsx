'use client';

import { useRef, type CSSProperties, type ElementType, type MouseEvent, type ReactNode } from 'react';

interface GlassProps {
  children?: ReactNode;
  className?: string;
  strong?: boolean;
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
}

export default function Glass({
  children,
  className = '',
  strong = false,
  as: Tag = 'div',
  style,
  id,
}: GlassProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height).toFixed(3));
  };

  return (
    <Tag
      ref={ref}
      id={id}
      onMouseMove={handleMove}
      className={`glass ${strong ? 'glass-strong' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
