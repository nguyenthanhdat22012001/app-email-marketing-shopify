/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'red':'#FF3B3B',
      'black':'#000',
      'dark':'#28293D',
      'muted':'#555770',
      'primary':'#3E7BFA',
      'white':'#ffffff',
      'gray-dark':'#4F4F4F',
      'gray-light':'#8F90A6',
      'success':'#05A660',
      'black-light':'#1C1C28',
      'sapphire':'#003084',

    },
    backgroundColor:{
      'primary':'#003084',
      'secondary': "#ffffff",
      'sapphire-gradient': "linear-gradient(45deg,#003084,#0294D7)",
    },
    extend: {},
  },
  plugins: [],
}
