/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customBlue: '#1366D9',
        heading: '#292929',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

