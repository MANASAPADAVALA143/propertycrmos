/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0D1B2A',
          800: '#112236',
          700: '#0F2235',
          600: '#1A2F45',
          500: '#243B53',
        },
        gold: {
          500: '#C9922A',
          400: '#D4A23A',
          600: '#B07F22',
        },
        teal: {
          500: '#1D9E75',
        },
        status: {
          success: '#1D9E75',
          error: '#E24B4A',
          warning: '#EF9F27',
        },
        textgray: '#B0BEC5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
