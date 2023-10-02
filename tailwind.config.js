/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "principal": ["'Press Start 2P'",'sans-serif']
      },
      backgroundImage: {
        "close-menu": "url('../img/close.svg')",
        "open-menu": "url('../img/open.svg')"
      }
    },
  },
  plugins: [],
}
