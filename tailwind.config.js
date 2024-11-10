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
      screens:{
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px'
      },
    },
  },
  plugins: [],
}

