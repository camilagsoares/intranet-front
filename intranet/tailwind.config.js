/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0F589C",
        'light-white': 'rgba(255,255,255,0.18)'
      }
    },
  },
  plugins: [],
}

