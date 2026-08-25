import { test, expect } from 'vitest';
import { cn } from './utils';

test('joins class names', () => {
  expect(cn('a', 'b')).toBe('a b');
});

test('resolves conflicting tailwind classes (last wins)', () => {
  expect(cn('px-2', 'px-4')).toBe('px-4');
});

test('ignores falsy values', () => {
  expect(cn('a', false, undefined, 'b')).toBe('a b');
});
