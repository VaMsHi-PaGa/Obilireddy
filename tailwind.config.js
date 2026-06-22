/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fluent / Windows 11 accent
        accent: {
          DEFAULT: '#0067C0',
          50: '#e6f1fb',
          100: '#cce3f6',
          400: '#3a8fd6',
          500: '#0067C0',
          600: '#005ba1',
          700: '#004c87',
        },
        // Neutral surfaces
        mica: {
          light: '#f3f3f3',
          dark: '#202020',
        },
      },
      fontFamily: {
        sans: [
          '"Segoe UI Variable"',
          '"Segoe UI"',
          'system-ui',
          '-apple-system',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"Cascadia Code"',
          '"JetBrains Mono"',
          '"SFMono-Regular"',
          'Consolas',
          '"Liberation Mono"',
          'Menlo',
          'monospace',
        ],
      },
      borderRadius: {
        win: '8px',
        winlg: '12px',
      },
      boxShadow: {
        win: '0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.12)',
        winfocus: '0 16px 40px rgba(0,0,0,0.28), 0 4px 10px rgba(0,0,0,0.18)',
        tray: '0 -2px 16px rgba(0,0,0,0.12)',
      },
      backdropBlur: {
        acrylic: '30px',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-12px,0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        floaty: 'floaty 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
