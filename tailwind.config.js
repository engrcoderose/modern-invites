/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f0f7f4',
          100: '#dceee4',
          200: '#bcdcc9',
          300: '#8fc2a5',
          400: '#5fa37c',
          500: '#3d8560',
          600: '#2d6b4e',
          700: '#255640',
          800: '#204536',
          900: '#1c3a2e',
          950: '#0e2018',
        },
        gold: {
          50: '#fef9f0',
          100: '#fef3e0',
          200: '#fde4b8',
          300: '#fbce85',
          400: '#f8b048',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        elegant: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

