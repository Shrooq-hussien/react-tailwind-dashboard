/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8' } }
    },
  },
  plugins: [],
}
