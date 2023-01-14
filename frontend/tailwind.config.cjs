/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "card-container": "repeat(auto-fit, minmax(580px, auto))",
      },
      fontFamily: {
        Futurist: "Futurist",
        Roboto: "Roboto",
        Tesla: "Tesla",
      },
      fontSize: {
        xs: ["clamp(0.58rem, calc(0.75rem + 0.01vw), 0.40rem)"],
        sm: ["clamp(0.78rem, calc(0.77rem + 0.03vw), 0.80rem)"],
        base: ["clamp(0.94rem, calc(0.92rem + 0.11vw), 1.50rem)"],
        lg: ["clamp(1.13rem, calc(1.08rem + 0.22vw), 1.88rem)"],
        xl: ["clamp(1.13rem, calc(1.08rem + 0.22vw), 2.34rem)"],
      },
      animation: {
        color: "color 2s ease infinite",
      },
      keyframes: {
        color: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
