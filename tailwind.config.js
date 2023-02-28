/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      width: {
        '128': '32rem',
        '138': '40rem'
      },
      height:{
        '128': '32rem',
        '138': '40rem'
      },
      backgroundImage: {
        'backgroundRoommeet': "url('../image/bg.jpg')"
      }
    },
  },
  plugins: [],
}
