/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0e14',
          deep: '#070a0f',
        },
        surface: {
          DEFAULT: '#141b27',
          raised: '#1a2331',
          input: '#0f1620',
        },
        edge: {
          DEFAULT: '#252e3d',
          strong: '#36425a',
        },
        ink: {
          DEFAULT: '#e6edf3',
          dim: '#9aa7bd',
          muted: '#5d6878',
        },
        accent: {
          DEFAULT: '#10b981',
          hover: '#34d399',
          glow: '#4ade80',
        },
        gold: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 280ms ease-out',
        'pulse-once': 'pulseOnce 600ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseOnce: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '40%': { transform: 'scale(1.02)', filter: 'brightness(1.15)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
      },
    },
  },
  plugins: [],
};
