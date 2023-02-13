/** @type {import('tailwindcss').Config} */
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
        'link': '#FFC93C',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
    },
  },
  },
  plugins: [],
}
