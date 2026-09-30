/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          950: 'rgb(var(--color-command-950) / <alpha-value>)',
          900: 'rgb(var(--color-command-900) / <alpha-value>)',
          850: 'rgb(var(--color-command-850) / <alpha-value>)',
          800: 'rgb(var(--color-command-800) / <alpha-value>)',
          750: 'rgb(var(--color-command-750) / <alpha-value>)',
          700: 'rgb(var(--color-command-700) / <alpha-value>)',
          600: 'rgb(var(--color-command-600) / <alpha-value>)',
          500: 'rgb(var(--color-command-500) / <alpha-value>)',
          border: 'rgb(var(--color-command-border) / <alpha-value>)',
          'border-light': 'rgb(var(--color-command-border-light) / <alpha-value>)',
        },
        met: {
          cyan: '#00F0FF',
          blue: '#0284C7',
          sky: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
          critical: '#FF2E56',
          purple: '#A855F7',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'radar-sweep': 'sweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'badge-pulse': 'badgePulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        badgePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.15)' },
        }
      }
    },
  },
  plugins: [],
}
