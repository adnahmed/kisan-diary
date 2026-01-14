/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981", // Emerald 500
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        secondary: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#a18072", // Earthy Brown
          600: "#977669",
          700: "#846358",
          800: "#43302b",
          900: "#1c1412",
        },
        accent: {
          500: "#f59e0b", // Gold/Amber
        },
        surface: {
          50: "#ffffff",
          100: "#fafafa",
          200: "#f4f4f5",
          300: "#e4e4e7",
          900: "#18181b",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        "glass-hover": "0 10px 40px rgba(0, 0, 0, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
