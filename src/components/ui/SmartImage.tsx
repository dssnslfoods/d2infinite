'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

interface SmartImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function SmartImage({
  src,
  fallbackSrc = '/images/tech-abstract.jpg',
  alt,
  ...props
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (!hasError && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          setHasError(true);
        }
      }}
    />
  );
}
