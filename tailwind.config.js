/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "principal": ["'Press Start 2P'",'sans-serif']
      },
      backgroundImage: {
        "close-menu": "url('../img/close.png')",
        "open-menu": "url('../img/open.png')"
      }
    },
  },
  plugins: [],
}