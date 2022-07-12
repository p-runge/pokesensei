/** @type {import('tailwindcss').Config} */

const sizes = {
  header: "64px",
  footer: "48px",
};

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#3f69ad",
        secondary: "#f7cb46",
      },
      height: sizes,
      padding: sizes,
    },
  },
};