/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#061b31',
        gold: '#f6bd3b',
        paper: '#f4f0e7',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        float: '0 28px 70px rgba(2, 18, 34, .22)',
      },
    },
  },
  plugins: [],
}
