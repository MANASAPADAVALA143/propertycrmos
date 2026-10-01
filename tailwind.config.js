/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark sidebar — kept for Sidebar.tsx only
        navy: {
          900: '#0A3330',
          800: '#0D3D3A',
          700: '#0F4440',
          600: '#134E4A',
          500: '#166360',
        },
        // Primary teal accent
        primary: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
          dark: '#115E59',
          light: '#CCFBF1',
          text: '#0F766E',
        },
        // Page surfaces
        surface: {
          DEFAULT: '#F8FAFB',
          card: '#FFFFFF',
        },
        // Border / divider
        border: {
          DEFAULT: '#E2E8F0',
          input: '#CBD5E1',
        },
        // Text hierarchy
        heading: '#0F1923',
        body: '#334155',
        muted: '#64748B',
        subtle: '#94A3B8',
        // Status
        status: {
          success: '#0F766E',
          successBg: '#CCFBF1',
          error: '#DC2626',
          errorBg: '#FEE2E2',
          warning: '#B45309',
          warningBg: '#FEF3C7',
          info: '#0369A1',
          infoBg: '#E0F2FE',
        },
        // Legacy aliases so old pages don't break during migration
        gold: {
          500: '#0D9488',
          400: '#0F766E',
          600: '#115E59',
        },
        teal: {
          500: '#5EEAD4',
          600: '#14B8A6',
          700: '#0D9488',
        },
        textgray: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.10)',
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
