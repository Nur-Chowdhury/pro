/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        primary: "#000fff",
        bgcol: "#1a365d",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: "40px",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}