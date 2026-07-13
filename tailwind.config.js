/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors — stable across light/dark
        navy: {
          DEFAULT: '#0A1628',
          light: '#142542',
        },
        teal: {
          DEFAULT: '#0D9488',
          light: '#14B8A6',
        },
        mint: {
          DEFAULT: '#B8F0DC',
          soft: '#DCF7EC',
        },
        cream: {
          DEFAULT: '#F5F3EC',
          soft: '#FAF9F5',
        },
        // Semantic, theme-aware tokens (RGB channels via CSS vars so /opacity works)
        page: 'rgb(var(--c-page) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-surface-2) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        base: '#F5F3EC',
        'base-dark': '#0A1628',
      },
      fontFamily: {
        heading: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'aurora': 'aurora-drift 18s ease-in-out infinite',
        'signal-pulse': 'signal-pulse 2.4s ease-out infinite',
        'blob-drift': 'blob-drift 22s ease-in-out infinite',
      },
      keyframes: {
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'aurora-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) rotate(2deg)' },
        },
        'signal-pulse': {
          '0%': { transform: 'scale(0.6)', opacity: '0.9' },
          '80%': { transform: 'scale(2.4)', opacity: '0' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'blob-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-3%, 2%, 0) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
