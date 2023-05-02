/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ibmplex': ['IBM Plex Serif', 'serif'],
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'custom-white':'#F6F6F6',
        'custom-dark':'#212121',
        'custom-dark-second':'#2B2B2B',
        'custom-green':'#C1DCDC',
        'custom-light-green':'#D8DCDC',
        'custom-dark-green':'#b0c2c2',
      }
    },
    
  },
  plugins: [],
}

