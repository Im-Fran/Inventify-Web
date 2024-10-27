/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        underlineGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
      },
      animation: {
        underlineGrow: 'underlineGrow 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}