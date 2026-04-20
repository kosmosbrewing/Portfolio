import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial palette — warm off-white background, calm soft body text
        paper: '#FFFFFF',
        ink: {
          DEFAULT: '#111111',
          body: '#2A2A2A',
          muted: '#6B6B6B',
          hint: '#9A9A9A',
          line: '#E8E6E2',
          surface: '#F2F1ED',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Apple SD Gothic Neo"',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter2: '-0.022em',
        wide2: '0.16em',
      },
      lineHeight: {
        snugger: '1.15',
        relaxed7: '1.75',
      },
      fontSize: {
        // Fluid, conservative scale — editorial feel
        display: ['clamp(2.5rem, 6vw + 1rem, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '600' }],
        h2: ['clamp(1.625rem, 2.2vw + 0.8rem, 2.625rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        body: ['1rem', { lineHeight: '1.7' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        // webfolio-prismic 레퍼런스 .container lg+ 와 동일 (810px).
        // md 구간(750px)은 style.css .container-read에서 arbitrary 값으로 지정.
        read: '50.625rem', // 810px
        wide: '52rem',     // ~832px — for Ops/3-up grids on desktop
      },
      spacing: {
        section: 'clamp(3rem, 6vw, 5rem)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
