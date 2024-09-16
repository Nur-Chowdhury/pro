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
        primaryLight: '#3490dc',
        primaryDark: "#2779bd",
        secondary: '#f6ad55',
        secondaryLight: '#ed8936',
        secondaryDark: '#dd6b20',
        PrimaryColor: 'hsla(214, 93%, 61%, 0.859)',
        SecondaryColor: 'hsla(215, 57%, 92%, 0.859)',
        colorOne: 'hsl(260, 88%, 47%)',
        colorTwo: 'hsla(28, 87%, 46%, 0.933)',
        HoverColor: 'hsl(255, 70%, 15%)',
        whiteColor: 'hsl(0, 0%, 100%)',
        blackColor: 'hsl(0, 0%, 12%)',
        textColor: 'hsl(240, 1%, 48%)',
        borderColor: 'hsl(0, 0%, 83%)',
        whiteColorDeam: 'hsl(0, 0%, 93%)',
        greyBg: 'hsl(0, 0%, 96%)',
        greyText: 'rgb(99, 99, 99)',
        inputColor: 'hsl(330, 12%, 97%)'
      },
      fontFamily: {
        spartan: ['Spartan', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
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