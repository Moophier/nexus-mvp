import { cn } from '../../lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'solid' | 'outline' | 'ghost';

const variants: Record<Variant, string> = {
  solid: 'bg-gold text-canvas font-semibold hover:bg-gold-400',
  outline: 'border border-gold text-gold hover:bg-gold/10',
  ghost: 'text-ink-muted hover:text-ink',
};

export function Button({
  className,
  variant = 'solid',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm transition-colors gold-glow',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
