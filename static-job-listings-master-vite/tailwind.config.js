/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "desaturated-dark-cyan": "hsl(180, 29%, 50%)",
        "light-grayish-cyan-background": "hsl(180, 52%, 96%)",
        "light-grayish-cyan-filter-tablets": "hsl(180, 31%, 95%)",
        "dark-grayish-cyan": "hsl(180, 8%, 52%)",
        "very-dark-grayish-cyan": "hsl(180, 14%, 20%)",
      },
      fontFamily: {
        leagueSpartan: ['"League Spartan"', "sans-serif"],
      },
      keyframes: {
        "slide-out": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
            position: "relative",
          },
          "90%": {
            transform: "translateX(-100%)",
            opacity: "0",
            position: "relative",
          },
          "100%": {
            transform: "translateX(-100%)",
            opacity: "0",
            position: "absolute",
          },
        },
      },
      animation: {
        "slide-out": "slide-out 0.6s forwards",
      },
    },
  },
  plugins: [],
};
