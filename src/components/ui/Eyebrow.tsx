import type { CSSProperties, ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Eyebrow({ children, style }: EyebrowProps) {
  return (
    <div className="eyebrow" style={style}>
      <span className="dot" />
      {children}
    </div>
  );
}
