/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec4ff',
          400: '#59a3ff',
          500: '#337fff',
          600: '#1c5ff5',
          700: '#154ae1',
          800: '#183eb6',
          900: '#1a398f',
        },
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgb(15 23 42 / 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
