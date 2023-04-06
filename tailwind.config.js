/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      width: {
        '4.5': '0.875rem',
        '18': '4.5rem',
        '128': '32rem',
        '138': '40rem'
      },
      height:{
        '18': '4.5rem',
        '128': '32rem',
        '138': '40rem'
      },
      backgroundImage: {
        'backgroundRoommeet': "url('../image/bg.jpg)",
        'backgroundFire': "url('../image/fireOpen.png')",
        'backgroundHome': "url('../image/bgH.jpg')"
      },
      rotate:{
        '72': '72deg'
      }
    },
  },
  plugins: [],
}
