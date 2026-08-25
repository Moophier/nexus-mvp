# Nexus Design System — Obsidian Luxe

**Date:** 2026-08-25
**Status:** Approved (design), pending spec review
**Scope:** Build a dark + gold ("Obsidian Luxe") design system for the Nexus MVP and apply it to all 9 pages.

---

## 1. Context

The Nexus MVP (`Nxeus/mvp`) is a Next.js 14 (App Router) project. Survey found it is a **non-running skeleton**:

- No `tailwind.config` / `postcss.config`
- No `globals.css` and no `src/app/layout.tsx` (root layout is required for Next.js to run)
- No `cn` utility
- Pages use Tailwind utility classes including an undefined `gold` color and assume a **light** theme (`bg-white`, `bg-gray-50`, `text-blue-600`, `bg-blue-50`), which conflicts with the README's stated dark + gold (`#d4a853`) brand.

Decisions already made with the user:
- **Direction:** A · Obsidian Luxe — near-black canvas, gold `#d4a853` accent, serif display.
- **Typography:** Serif everywhere (Noto Serif SC for Chinese + Georgia/Syne for Latin).
- **Motion:** B · Refined — gentle scroll fade-in, card hover lift, gold focus glow; respects `prefers-reduced-motion`.

## 2. Goals

1. Establish a working Tailwind pipeline + dark design tokens so the app builds and runs.
2. Create a small, reusable UI primitive library reflecting the brand.
3. Restyle all 9 pages to the Obsidian Luxe system (invert light→dark, apply tokens/primitives).
4. Stay accessible (contrast, focus states, reduced-motion) per Vercel Web Interface Guidelines (the `web-design-guidelines` skill installed earlier can audit afterward).

## 3. Non-goals (YAGNI)

- No new page features, routing, or business logic changes.
- No backend / data changes.
- No full layout redesign (Approach B) — only visual restyle.

## 4. Design Tokens

Defined in `tailwind.config.ts` `theme.extend`:

| Token group | Values |
|---|---|
| `gold` | `DEFAULT #d4a853`, scale 50–950 (tints for accents/borders) |
| `ink` (text) | `primary #e8e6e1`, `muted #9a958c`, `faint #6b665c` |
| `surface` | `base #0b0b0d` (page), `raised #16161a`, `overlay #1c1c20` |
| `border` | `subtle #26262b`, `gold #3a3326` (gold-tinted borders) |
| Fonts | `serif`: `'Noto Serif SC', Georgia, serif`; `display`: `'Syne', 'Noto Serif SC', serif`; `mono`: `'DM Mono', monospace` |
| Radii | `lg 16px`, `xl 20px`, `2xl 24px` |
| Shadow | `soft` (low-alpha black), `gold` (gold glow) |
| Keyframes | `fade-in-up`, `glow` |

CSS variables in `globals.css` mirror these for raw CSS usage.

## 5. Files to Create

- `tailwind.config.ts` — content globs (`src/**/*.{ts,tsx}`), `darkMode: 'class'`, theme extension above.
- `postcss.config.mjs` — `tailwindcss` + `autoprefixer`.
- `src/app/globals.css` — `@tailwind` layers; CSS vars; base dark `body` (bg `ink/base`, text `ink/primary`, font `serif`); Google Fonts wiring via `<link>` in layout (preconnect + Syne / Noto Serif SC / DM Mono); utility classes `.surface`, `.card-lift`, `.gold-glow`; `prefers-reduced-motion` guard that disables animations.
- `src/app/layout.tsx` (new, **required**) — `<html lang="zh" class="dark">`, `<body>`, font `<link>` tags in `<head>`, imports `globals.css`, renders children.
- `src/lib/utils.ts` — `cn(...)` using `clsx` + `tailwind-merge` (both already dependencies).
- `src/components/ui/button.tsx` — variants: `solid` (gold bg), `outline` (gold border), `ghost`; sizes sm/md; focus `gold-glow`.
- `src/components/ui/card.tsx` — `surface` bg, `border-subtle`, `rounded-xl`, `card-lift` hover.
- `src/components/ui/badge.tsx` — small gold-tinted label.
- `src/components/ui/input.tsx` — dark field with gold focus ring.
- `src/components/ui/section.tsx` — consistent page section spacing/container.
- `src/components/reveal.tsx` — client component using `IntersectionObserver` to add `fade-in-up` on enter; no-op under reduced motion.

## 6. Files to Modify (restyle only)

All 9 pages: replace light-theme classes (`bg-white`, `bg-gray-50`, `text-gray-900/500/600`, `text-blue-600`, `bg-blue-50`, etc.) with the new tokens/primitives. Invert to dark surfaces, gold accents. Wrap key blocks in `Reveal` for scroll animation. Pages:

- `src/app/(public)/page.tsx`
- `src/app/(public)/modules/page.tsx`
- `src/app/(public)/modules/[slug]/page.tsx`
- `src/app/(public)/fragments/page.tsx`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/verify/page.tsx`
- `src/app/(member)/dashboard/page.tsx`
- `src/app/(member)/purchase/[id]/page.tsx`
- `src/app/(member)/review/[purchaseId]/page.tsx`

Stat cards on the dashboard currently use blue/green tints → remap to gold/varied accent surfaces within the dark palette.

## 7. Accessibility

- Gold `#d4a853` on `#0b0b0d` meets WCAG AA contrast for text/large UI.
- All interactive elements get visible gold focus rings (`gold-glow`).
- `prefers-reduced-motion` disables `fade-in-up`, `card-lift`, `glow`.
- Semantic headings (`h1`–`h3`), `label` associated with `Input`.

## 8. Verification

1. `npm install` (dependencies currently absent — source of LSP errors).
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build` (confirms Tailwind pipeline + layout resolve).
5. `npm run dev` → manual visual check of all routes at `localhost:3000`.
6. (Optional, later) run `web-design-guidelines` skill audit on the pages.

## 9. Rollout Order

1. Foundation (config, postcss, globals, layout, utils).
2. Primitives + `Reveal`.
3. Public pages → Auth pages → Member pages.
4. Verify build + visual pass.
