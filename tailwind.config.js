/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#05070B',
        surface: {
          DEFAULT: '#0B0F14',
          light: '#111827',
          elevated: '#0E1320',
        },
        primary: {
          DEFAULT: '#7C3AED',
          accent: '#A855F7',
          deep: '#5B21B6',
        },
        accent: {
          green: '#7DFF4D',
          secondary: '#32D583',
        },
        text: {
          primary: '#F5F7FA',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.14)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'brand-sm': '0 0 24px rgba(124,58,237,0.25)',
        'brand-md': '0 0 40px rgba(168,85,247,0.35)',
        'brand-lg': '0 10px 50px -10px rgba(124,58,237,0.45)',
        'inset-hairline': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-slower': 'spin 80s linear infinite',
        'spin-reverse': 'spin-reverse 50s linear infinite',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'aurora': 'aurora-drift 18s ease-in-out infinite',
        'ticker': 'ticker 50s linear infinite',
        'ticker-reverse': 'ticker-reverse 60s linear infinite',
        'signal-pulse': 'signal-pulse 2.4s ease-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'aurora-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) rotate(2deg)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'signal-pulse': {
          '0%': { transform: 'scale(0.6)', opacity: '0.9' },
          '80%': { transform: 'scale(2.4)', opacity: '0' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      letterSpacing: {
        'editorial': '-0.035em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
