# Nexus Design System — Obsidian Luxe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark + gold ("Obsidian Luxe") Tailwind design system for the Nexus MVP and apply it to all 9 pages so the app builds, runs, and looks premium.

**Architecture:** Add the missing Tailwind/PostCSS pipeline + a root `layout.tsx` (currently absent, so the app cannot run), define design tokens in `tailwind.config.ts`, ship a small UI primitive library (`cn`, Button, Card, Badge, Input, Section) plus a `Reveal` scroll-animation client component, then invert the light-themed pages to the dark system. Pages are static mock data, so restyling is visual-only and low risk.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3.4, clsx + tailwind-merge, lucide-react, Vitest (for `cn` unit test).

---

## File Structure

**Create (foundation + tokens):**
- `tailwind.config.ts` — content globs, `darkMode:'class'`, theme tokens (gold/ink/surface/line, fonts, radii, shadows, keyframes).
- `postcss.config.mjs` — tailwindcss + autoprefixer.
- `src/app/globals.css` — `@tailwind` layers, CSS vars, dark base, Google Fonts usage, utilities (`.surface`, `.card-lift`, `.gold-glow`, `.reveal`), `prefers-reduced-motion` guard.
- `src/app/layout.tsx` — root layout (REQUIRED for Next to run): `<html class="dark">`, font `<link>`s, `globals.css` import.
- `src/lib/utils.ts` — `cn()` helper.
- `src/lib/utils.test.ts` — Vitest unit test for `cn`.
- `src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `section.tsx` — primitives.
- `src/components/reveal.tsx` — client `IntersectionObserver` scroll reveal.

**Modify (restyle only, light→dark):**
- `src/app/(public)/page.tsx`
- `src/app/(public)/modules/page.tsx`
- `src/app/(public)/modules/[slug]/page.tsx`
- `src/app/(public)/fragments/page.tsx`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/verify/page.tsx`
- `src/app/(member)/dashboard/page.tsx`
- `src/app/(member)/purchase/[id]/page.tsx`
- `src/app/(member)/review/[purchaseId]/page.tsx`

**Imports note:** No `@/` path alias is confirmed, so all internal imports use relative paths (e.g. `../../lib/utils` from `src/components/ui/`).

---

### Task 1: Install dependencies

**Files:** none created (workspace setup)

- [ ] **Step 1: Install project dependencies**

Run from `Nxeus/mvp`:
```bash
npm install
```
Expected: completes, creates `node_modules`. This resolves the LSP "Cannot find module 'react'/next" errors and is required before any build/lint/typecheck.

- [ ] **Step 2: Verify toolchain responds**

```bash
npm run typecheck
```
Expected: runs (may show pre-existing type errors unrelated to our tokens, but should no longer say "Cannot find module 'react'"). If `typecheck` errors block later, we address in each task.

- [ ] **Step 3: Commit**

```bash
git add package-lock.json
git commit -m "chore: install dependencies for Nexus MVP"
```

---

### Task 2: `cn` utility with TDD

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/utils.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/utils.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/lib/utils.test.ts
```
Expected: FAIL — `Cannot find module './utils'` (file not created yet).

- [ ] **Step 3: Write minimal implementation**

`src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/lib/utils.test.ts
```
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts src/lib/utils.test.ts
git commit -m "feat: add cn() class-merge helper with tests"
```

---

### Task 3: Tailwind + PostCSS configuration

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Create PostCSS config**

`postcss.config.mjs`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 2: Create Tailwind config with design tokens**

`tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0b0b0d',
        surface: {
          DEFAULT: '#16161a',
          overlay: '#1c1c20',
        },
        ink: {
          DEFAULT: '#e8e6e1',
          muted: '#9a958c',
          faint: '#6b665c',
        },
        gold: {
          50: '#fbf6ec',
          100: '#f3e7cf',
          200: '#e8d2a3',
          300: '#dbb877',
          400: '#d4a853',
          500: '#c2973f',
          600: '#a37e34',
          700: '#7e6128',
          800: '#5c4720',
          900: '#3f3016',
          950: '#241a0b',
          DEFAULT: '#d4a853',
        },
        line: {
          DEFAULT: '#26262b',
          gold: '#3a3326',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        display: ['"Syne"', '"Noto Serif SC"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.4)',
        gold: '0 0 0 1px rgba(212,168,83,0.4), 0 0 20px rgba(212,168,83,0.15)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 0 1px rgba(212,168,83,0.3)' },
          '50%': { boxShadow: '0 0 18px rgba(212,168,83,0.35)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        glow: 'glow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify config loads**

```bash
npx tailwindcss --help >/dev/null && echo "tailwind ok"
```
Expected: prints `tailwind ok`. (Full visual verification happens after `globals.css` + layout in later tasks.)

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts postcss.config.mjs
git commit -m "feat: add Tailwind + PostCSS config with Obsidian Luxe tokens"
```

---

### Task 4: Global stylesheet (tokens, fonts, utilities, reduced-motion)

**Files:**
- Create: `src/app/globals.css`

- [ ] **Step 1: Write globals.css**

`src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --canvas: #0b0b0d;
  --surface: #16161a;
  --surface-overlay: #1c1c20;
  --ink: #e8e6e1;
  --ink-muted: #9a958c;
  --gold: #d4a853;
  --line: #26262b;
}

@layer base {
  body {
    @apply bg-canvas text-ink font-serif antialiased;
  }
  ::selection {
    @apply bg-gold/30 text-ink;
  }
}

@layer utilities {
  .surface {
    @apply bg-surface border border-line;
  }
  .card-lift {
    @apply transition-transform duration-300 hover:-translate-y-1;
  }
  .gold-glow {
    @apply outline-none focus-visible:shadow-gold;
  }
  .reveal {
    opacity: 0;
    transform: translateY(12px);
  }
  .reveal.in {
    animation: fade-in-up 0.6s ease-out forwards;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add globals.css with dark base, fonts, utilities, reduced-motion"
```

---

### Task 5: Root layout (required for app to run)

**Files:**
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Write root layout**

`src/app/layout.tsx`:
```tsx
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Nexus · 知识资产循环',
  description: '由评价驱动的知识资产循环经济体',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Noto+Serif+SC:wght@400;600;700&family=Syne:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-canvas text-ink font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build picks up layout + Tailwind**

```bash
npm run build 2>&1 | tail -20
```
Expected: build proceeds (may warn about missing pages/route groups but should NOT say "Cannot find module" for tailwind/postcss, and should compile `globals.css`). If a route error appears about a missing page, it is out of scope — we only need the styling pipeline to compile here.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add root layout with dark theme + web fonts"
```

---

### Task 6: UI primitives

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/section.tsx`

- [ ] **Step 1: Button**

`src/components/ui/button.tsx`:
```tsx
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
```

- [ ] **Step 2: Card**

`src/components/ui/card.tsx`:
```tsx
import { cn } from '../../lib/utils';
import type { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('surface rounded-xl p-6 shadow-soft', className)}
      {...props}
    />
  );
}
```

- [ ] **Step 3: Badge**

`src/components/ui/badge.tsx`:
```tsx
import { cn } from '../../lib/utils';
import type { HTMLAttributes } from 'react';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line-gold bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold',
        className,
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Input**

`src/components/ui/input.tsx`:
```tsx
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
```

- [ ] **Step 5: Section**

`src/components/ui/section.tsx`:
```tsx
import { cn } from '../../lib/utils';
import type { HTMLAttributes } from 'react';

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('mx-auto w-full max-w-5xl px-4 py-12', className)} {...props} />
  );
}
```

- [ ] **Step 6: Typecheck primitives**

```bash
npm run typecheck 2>&1 | tail -15
```
Expected: no errors referencing the new `src/components/ui/*` files.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui
git commit -m "feat: add UI primitives (Button, Card, Badge, Input, Section)"
```

---

### Task 7: Reveal scroll-animation component

**Files:**
- Create: `src/components/reveal.tsx`

- [ ] **Step 1: Write Reveal**

`src/components/reveal.tsx`:
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

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
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck 2>&1 | tail -10
```
Expected: no errors for `reveal.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/reveal.tsx
git commit -m "feat: add Reveal scroll-animation component (reduced-motion safe)"
```

---

### Task 8: Restyle public landing page

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Replace file content with dark Obsidian Luxe version**

`src/app/(public)/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Reveal } from '../../components/reveal';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Nexus · 知识资产循环</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          知识库架构 <span className="text-gold">Knowledge Base</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
          探索由评价驱动的知识资产循环。购买模块，留下真诚评价，将你的领悟转化为可传播的知识碎片。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal>
          <Card className="card-lift h-full">
            <h2 className="mb-4 text-2xl font-bold text-ink">最新模块</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-surface-overlay p-4">
                <span className="text-ink">Next.js 14 核心指南</span>
                <Link href="/modules/nextjs-14-guide" className="font-medium text-gold hover:underline">
                  查看 →
                </Link>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface-overlay p-4">
                <span className="text-ink">Prisma + Neon Serverless 实践</span>
                <Link href="/modules/prisma-neon-mastery" className="font-medium text-gold hover:underline">
                  查看 →
                </Link>
              </div>
            </div>
            <Link href="/modules" className="mt-6 block text-center text-sm text-ink-faint hover:text-gold">
              浏览所有模块
            </Link>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="card-lift h-full">
            <h2 className="mb-4 text-2xl font-bold text-ink">精选碎片</h2>
            <div className="space-y-3">
              <div className="rounded-r-lg border-l-4 border-gold bg-surface-overlay p-4">
                <p className="italic text-ink">“特别是关于 Serverless 的部分，让我领悟到了很多关键点…”</p>
                <p className="mt-2 text-xs text-ink-faint">来自 《Next.js 14 核心指南》</p>
              </div>
              <div className="rounded-r-lg border-l-4 border-gold bg-surface-overlay p-4">
                <p className="italic text-ink">“原来数据库分支功能可以这么用，极大地提升了开发效率。”</p>
                <p className="mt-2 text-xs text-ink-faint">来自 《Prisma + Neon Serverless 实践》</p>
              </div>
            </div>
            <Link href="/fragments" className="mt-6 block text-center text-sm text-ink-faint hover:text-gold">
              进入碎片流
            </Link>
          </Card>
        </Reveal>
      </div>

      <div className="mt-12 flex justify-center">
        <Badge>知识资产四步循环 · 搬运 → 上架 → 评价 → 传播</Badge>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck 2>&1 | tail -10
```
Expected: no errors for this file.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(public)/page.tsx"
git commit -m "style: restyle public landing page to Obsidian Luxe"
```

---

### Task 9: Restyle modules list + module detail

**Files:**
- Modify: `src/app/(public)/modules/page.tsx`
- Modify: `src/app/(public)/modules/[slug]/page.tsx`

- [ ] **Step 1: Write modules list**

`src/app/(public)/modules/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Reveal } from '../../../components/reveal';

const modules = [
  { slug: 'nextjs-14-guide', title: 'Next.js 14 核心指南', price: '¥29.00' },
  { slug: 'prisma-neon-mastery', title: 'Prisma + Neon Serverless 实践', price: '¥39.00' },
];

export default function ModulesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Modules</p>
        <h1 className="font-display text-4xl font-bold text-ink">所有模块</h1>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {modules.map((m) => (
          <Reveal key={m.slug}>
            <Card className="card-lift h-full">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-ink">{m.title}</h2>
                <Badge>{m.price}</Badge>
              </div>
              <Link href={`/modules/${m.slug}`} className="mt-6 inline-block font-medium text-gold hover:underline">
                查看模块 →
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Write module detail**

`src/app/(public)/modules/[slug]/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Reveal } from '../../../../components/reveal';

export default function ModuleDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/modules" className="text-sm text-ink-faint hover:text-gold">← 返回模块列表</Link>
      <Reveal className="mt-6">
        <Card>
          <Badge>已上架</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink">模块详情</h1>
          <p className="mt-3 text-ink-muted">模块标识：<span className="text-gold">{params.slug}</span></p>
          <p className="mt-4 text-ink-muted">
            这是模块的详细描述区域。购买后可解锁完整内容与评价营销素材。
          </p>
          <div className="mt-8">
            <Button>购买模块 · ¥29.00</Button>
          </div>
        </Card>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck 2>&1 | tail -10
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(public)/modules/page.tsx" "src/app/(public)/modules/[slug]/page.tsx"
git commit -m "style: restyle modules list + detail to Obsidian Luxe"
```

---

### Task 10: Restyle fragments page

**Files:**
- Modify: `src/app/(public)/fragments/page.tsx`

- [ ] **Step 1: Write fragments page**

`src/app/(public)/fragments/page.tsx`:
```tsx
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Reveal } from '../../../components/reveal';

const fragments = [
  { quote: '特别是关于 Serverless 的部分，让我领悟到了很多关键点', module: 'Next.js 14 核心指南' },
  { quote: '原来数据库分支功能可以这么用，极大地提升了开发效率', module: 'Prisma + Neon Serverless 实践' },
];

export default function FragmentsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Fragments</p>
        <h1 className="font-display text-4xl font-bold text-ink">评价碎片流</h1>
        <p className="mt-3 text-ink-muted">由购买者真诚评价提炼的可传播知识碎片。</p>
      </header>
      <div className="space-y-5">
        {fragments.map((f, i) => (
          <Reveal key={i}>
            <Card className="card-lift">
              <Badge>碎片 #{i + 1}</Badge>
              <p className="mt-3 italic text-ink">“{f.quote}”</p>
              <p className="mt-2 text-sm text-ink-faint">来自 《{f.module}》</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck 2>&1 | tail -10
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(public)/fragments/page.tsx"
git commit -m "style: restyle fragments page to Obsidian Luxe"
```

---

### Task 11: Restyle auth pages (login + verify)

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/(auth)/verify/page.tsx`

- [ ] **Step 1: Write login page**

`src/app/(auth)/login/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Reveal } from '../../../components/reveal';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Reveal className="w-full max-w-md">
        <Card>
          <h1 className="font-display text-2xl font-bold text-ink">登录 Nexus</h1>
          <p className="mt-2 text-sm text-ink-muted">使用手机号或邮箱继续。</p>
          <form className="mt-6 space-y-4">
            <Input placeholder="手机号 / 邮箱" aria-label="账号" />
            <Input type="password" placeholder="密码" aria-label="密码" />
            <Button type="submit" className="w-full">登录</Button>
          </form>
          <p className="mt-4 text-center text-sm text-ink-faint">
            还没有账号？<Link href="/verify" className="text-gold hover:underline">注册</Link>
          </p>
        </Card>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 2: Write verify page**

`src/app/(auth)/verify/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Reveal } from '../../../components/reveal';

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Reveal className="w-full max-w-md">
        <Card>
          <h1 className="font-display text-2xl font-bold text-ink">注册 / 验证</h1>
          <p className="mt-2 text-sm text-ink-muted">输入验证码完成身份校验。</p>
          <form className="mt-6 space-y-4">
            <Input placeholder="手机号 / 邮箱" aria-label="账号" />
            <Input placeholder="验证码" aria-label="验证码" />
            <Button type="submit" className="w-full">验证并继续</Button>
          </form>
          <p className="mt-4 text-center text-sm text-ink-faint">
            已有账号？<Link href="/login" className="text-gold hover:underline">登录</Link>
          </p>
        </Card>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck 2>&1 | tail -10
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(auth)/login/page.tsx" "src/app/(auth)/verify/page.tsx"
git commit -m "style: restyle auth login + verify pages to Obsidian Luxe"
```

---

### Task 12: Restyle member pages (dashboard, purchase, review)

**Files:**
- Modify: `src/app/(member)/dashboard/page.tsx`
- Modify: `src/app/(member)/purchase/[id]/page.tsx`
- Modify: `src/app/(member)/review/[purchaseId]/page.tsx`

- [ ] **Step 1: Write dashboard**

`src/app/(member)/dashboard/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Reveal } from '../../../components/reveal';

const stats = [
  { label: '资产余额', value: '¥50.00', accent: 'text-gold' },
  { label: '已购模块', value: '2', accent: 'text-ink' },
  { label: '已写评价', value: '2', accent: 'text-ink' },
];

const purchases = [
  { title: 'Next.js 14 核心指南', date: '2024-01-15', status: '已完成', slug: 'nextjs-14-guide' },
  { title: 'Prisma + Neon Serverless 实践', date: '2024-01-10', status: '已评价', slug: 'prisma-neon-mastery' },
];

const fragments = [
  { quote: '特别是关于 Serverless 的部分，让我领悟到了很多关键点', module: 'Next.js 14 核心指南' },
  { quote: '原来数据库分支功能可以这么用，极大地提升了开发效率', module: 'Prisma + Neon Serverless 实践' },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-ink">我的仪表盘</h1>
        <p className="mt-2 text-ink-muted">管理你的知识资产与购买记录</p>
      </header>

      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <Reveal key={s.label}>
            <Card className="card-lift">
              <p className="text-sm text-ink-muted">{s.label}</p>
              <p className={`mt-2 text-3xl font-extrabold ${s.accent}`}>{s.value}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-ink">最近购买</h2>
        <div className="space-y-4">
          {purchases.map((item) => (
            <Reveal key={item.title}>
              <Card className="flex items-center justify-between">
                <div>
                  <Link href={`/modules/${item.slug}`} className="font-medium text-ink hover:text-gold">
                    {item.title}
                  </Link>
                  <p className="text-sm text-ink-faint">{item.date} · {item.status}</p>
                </div>
                {item.status === '已完成' && (
                  <Link href="/review/some-purchase-id" className="rounded bg-gold/15 px-3 py-1 text-sm font-medium text-gold hover:bg-gold/25">
                    去评价
                  </Link>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-ink">我的评价碎片</h2>
        <div className="space-y-4">
          {fragments.map((f, i) => (
            <Reveal key={i}>
              <Card className="rounded-r-lg border-l-4 border-gold">
                <p className="mb-2 italic text-ink">“{f.quote}”</p>
                <p className="text-sm text-ink-faint">来自 《{f.module}》</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Write purchase detail**

`src/app/(member)/purchase/[id]/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Reveal } from '../../../../components/reveal';

export default function PurchasePage({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/dashboard" className="text-sm text-ink-faint hover:text-gold">← 返回仪表盘</Link>
      <Reveal className="mt-6">
        <Card>
          <Badge>订单</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink">购买详情</h1>
          <p className="mt-3 text-ink-muted">订单标识：<span className="text-gold">{params.id}</span></p>
          <p className="mt-4 text-ink-muted">确认购买后，模块将解锁并计入你的知识资产。</p>
          <div className="mt-8 flex gap-3">
            <Button>确认购买 · ¥29.00</Button>
            <Button variant="ghost">取消</Button>
          </div>
        </Card>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 3: Write review page**

`src/app/(member)/review/[purchaseId]/page.tsx`:
```tsx
import Link from 'next/link';
import { Card } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Reveal } from '../../../../components/reveal';

export default function ReviewPage({ params }: { params: { purchaseId: string } }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/dashboard" className="text-sm text-ink-faint hover:text-gold">← 返回仪表盘</Link>
      <Reveal className="mt-6">
        <Card>
          <h1 className="font-display text-3xl font-bold text-ink">写评价</h1>
          <p className="mt-2 text-sm text-ink-muted">评价将提炼为知识碎片，并为你带来返现与创作权。</p>
          <form className="mt-6 space-y-4">
            <Input placeholder="一句话感悟" aria-label="评价标题" />
            <textarea
              aria-label="评价正文"
              rows={5}
              placeholder="分享你的真实领悟…"
              className="w-full rounded-lg border border-line bg-surface-overlay px-3 py-2 text-sm text-ink placeholder:text-ink-faint gold-glow"
            />
            <Button type="submit">提交评价</Button>
          </form>
        </Card>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 4: Typecheck**

```bash
npm run typecheck 2>&1 | tail -10
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(member)/dashboard/page.tsx" "src/app/(member)/purchase/[id]/page.tsx" "src/app/(member)/review/[purchaseId]/page.tsx"
git commit -m "style: restyle member dashboard, purchase, review pages to Obsidian Luxe"
```

---

### Task 13: Final verification + build

**Files:** none (verification only)

- [ ] **Step 1: Lint**

```bash
npm run lint 2>&1 | tail -20
```
Expected: no errors (warnings acceptable).

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck 2>&1 | tail -10
```
Expected: PASS.

- [ ] **Step 3: Production build**

```bash
npm run build 2>&1 | tail -25
```
Expected: build succeeds; all routes compile; Tailwind CSS emitted without "Cannot find module" errors.

- [ ] **Step 4: Dev smoke (manual)**

```bash
npm run dev
```
Expected: open `http://localhost:3000` — pages render dark canvas, gold accents, serif type, and reveal-on-scroll. (Stop the dev server after checking.)

- [ ] **Step 5: Commit (if any fixups were needed)**

Only if Tasks 1–12 required a follow-up fix:
```bash
git add -A
git commit -m "fix: address lint/build issues from design-system rollout"
```

---

## Self-Review

**1. Spec coverage:** Foundation (config, postcss, globals, layout, utils) → Tasks 1–5. Primitives → Task 6. Motion/Reveal → Task 7. All 9 pages restyled (public ×4, auth ×2, member ×3) → Tasks 8–12. Accessibility (contrast, focus `gold-glow`, `prefers-reduced-motion`) → globals.css + primitives. Verification → Task 13. All spec sections mapped.

**2. Placeholder scan:** No TBD/TODO/"similar to" found; every code step includes full content.

**3. Type consistency:** `cn` import path `../../lib/utils` used consistently; component prop signatures (`variant` on Button, `children/className` on others) stable across tasks; `Reveal` API identical in all usages; relative import depth correct per file location.
