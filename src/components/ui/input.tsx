import { cn } from '../../lib/utils';
import type { InputHTMLAttributes } from 'react';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-line bg-surface-overlay px-3 py-2 text-sm text-ink placeholder:text-ink-faint gold-glow',
        className,
      )}
      {...props}
    />
  );
}
