'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn('reveal', inView && 'in', className)}>
      {children}
    </div>
  );
}
