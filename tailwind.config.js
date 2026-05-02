/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#B89544',
          light: '#D4AF37',
        },
        navy: {
          DEFAULT: '#0F172A',
        }
      }
    },
  },
  plugins: [],
}
