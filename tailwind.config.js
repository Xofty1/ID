/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        neon: {
          pink: '#FF2D78',
          green: '#C0FF33',
          purple: '#A855F7',
          cyan: '#22D3EE',
        },
        bg: '#0B0B0C',
      },
      keyframes: {
        fadeSlideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeSlideRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #FF2D78, 0 0 40px #FF2D78' },
          '50%': { boxShadow: '0 0 30px #C0FF33, 0 0 60px #C0FF33' },
        },
      },
      animation: {
        fadeSlideLeft: 'fadeSlideLeft 0.7s ease forwards',
        fadeSlideRight: 'fadeSlideRight 0.7s ease forwards',
        bounce: 'bounce 1.5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
