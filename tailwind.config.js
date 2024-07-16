/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./src/components/**/*.{js,jsx,ts,tsx}","./src/pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': { max: '1540px' },
      xl: { max: '1280px' },
      lg: { max: '1092px' },
      md: { max: '767px' },
      sm: { max: '480px' }
    }
  },
  plugins: [],
}

