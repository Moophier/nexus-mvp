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
