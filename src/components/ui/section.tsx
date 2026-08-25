import { cn } from '../../lib/utils';
import type { HTMLAttributes } from 'react';

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('mx-auto w-full max-w-5xl px-4 py-12', className)} {...props} />
  );
}
