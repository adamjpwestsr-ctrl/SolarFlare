/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        indigo: require("tailwindcss/colors").indigo,
        purple: require("tailwindcss/colors").purple,
        blue: require("tailwindcss/colors").blue,
        emerald: require("tailwindcss/colors").emerald,
        rose: require("tailwindcss/colors").rose,
        amber: require("tailwindcss/colors").amber,
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      boxShadow: {
        cosmic: "0 0 40px rgba(99, 102, 241, 0.4)",
      },

      screens: {
        ipad: { min: "768px", max: "1180px" },
        landscape: { raw: "(orientation: landscape)" },
      },

      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        pop: "pop 0.4s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },

  safelist: [
    // Dynamic theme backgrounds
    "bg-indigo-600",
    "bg-purple-600",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-amber-600",

    // Dynamic theme text colors
    "text-indigo-400",
    "text-purple-400",
    "text-blue-400",
    "text-emerald-400",
    "text-rose-400",
    "text-amber-400",
  ],

  plugins: [],
};
