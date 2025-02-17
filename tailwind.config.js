/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        '12': '3rem',
        '16': '4rem', 
        '20': '5rem',  
      }
    },
  },
  plugins: [],
}