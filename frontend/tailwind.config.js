/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'nav': '0.25rem',
        'header': '2.75rem',
        'body': '1.25rem'
      },
      colors: {
        main: '#FFC98B',
        background: '#F7F3EF',
        secondary: '#8CB369',
        black: '#0F0F0F',
        border: '#9F662D'
      },
      fontFamily: {
        main: "'Alef', 'serif'"
      },
      boxShadow: {
        'custom-box': '2px 2px 3px 1px rgb(0 0 0 / 25%)'
      },
    },
  },
  plugins: [],
}

