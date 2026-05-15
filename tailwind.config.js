/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c10',
        surface: '#1f2833',
        primary: {
          DEFAULT: '#66fcf1', // Neon cyan
          dark: '#45a29e'
        },
        accent: {
          DEFAULT: '#ff00ff', // Neon magenta
          dark: '#cc00cc'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
