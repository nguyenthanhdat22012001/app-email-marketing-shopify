/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'red': '#FF3B3B',
      'black': '#000',
      'dark': '#28293D',
      'dark-gray': '#252627',
      'muted': '#555770',
      'primary': '#3E7BFA',
      'white': '#ffffff',
      'gray-dark': '#4F4F4F',
      'gray-light': '#8F90A6',
      'success': '#05A660',
      'black-light': '#1C1C28',
      'sapphire': '#003084',
      'bg-primary': '#003085',
      "bg-primary-light": '#0294D7',
      "light": '#EBEBF0',
      "transparent":"transparent"

    },
    backgroundColor: {
      'primary': '#003084',
      'blues': '#3E7BFA',
      'secondary': "#ffffff",
      'sapphire-gradient': "linear-gradient(45deg,#003084,#0294D7)",
      'gray-light': "#F2F2F5",
      'white': '#ffffff',
      'muted': '#555770',
    },
    boxShadow: {
      'sm': '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
      'sm-light': '0px -3px 8px rgba(40, 41, 61, 0.04), -5px 16px 24px rgba(96, 97, 112, 0.16);'
    },
    translate: {
      'full-reverse': '-100%',
      'half-reverse': '-50%',
    },
    boxShadow: {
      'sm': '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
      'content': '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
      'notify': '0px 2px 16px rgba(0, 0, 0, 0.25)'
    },
    extend: {},
  },
  plugins: [],
}
