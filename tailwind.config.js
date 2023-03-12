/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0F4C81',
        'secondary': '#F9F9F9',
        'link': '#54B435',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'roboto': ['Roboto'],
    },
  },
  screens: {
    'xs': '350px',
    ...defaultTheme.screens,
  },
  },
  plugins: [],
}
