/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#142542',
        },
        teal: {
          DEFAULT: '#0D9488',
          light: '#14B8A6',
        },
        base: '#F4F6F8',
        'base-dark': '#0A1628',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'aurora': 'aurora-drift 18s ease-in-out infinite',
        'signal-pulse': 'signal-pulse 2.4s ease-out infinite',
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
      },
    },
  },
  plugins: [],
}