/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "very-light-gray": "hsl(0, 0%, 98%)",
        "very-light-grayish-blue": "hsl(236, 33%, 92%)",
        "light-grayish-blue": "hsl(233, 11%, 84%)",
        "dark-grayish-blue": "hsl(236, 9%, 61%)",
        "very-dark-grayish-blue": "hsl(235, 19%, 35%)",
        "very-dark-blue": "hsl(235, 21%, 11%)",
        "very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "light-grayish-blue-hover": "hsl(234, 39%, 85%)",
        "dark-grayish-blue2": "hsl(234, 11%, 52%)",
        "very-dark-grayish-blue2": "hsl(233, 14%, 35%)",
        "very-dark-grayish-blue3": "hsl(237, 14%, 26%)",
        "bright-blue": "hsl(220, 98%, 61%)",
        "gradient-start": "hsl(192, 100%, 67%)",
        "gradient-end": "hsl(280, 87%, 65%)",
      },
      backgroundImage: {
        "mobile-dark": "url('/src/assets/images/bg-mobile-dark.jpg')",
        "mobile-light": "url('/src/assets/images/bg-mobile-light.jpg')",
        "desktop-dark": "url('/src/assets/images/bg-desktop-dark.jpg')",
        "desktop-light": "url('/src/assets/images/bg-desktop-light.jpg')",
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
