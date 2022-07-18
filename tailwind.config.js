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
        "primary-light": "#6587bd",
        "primary-dark": "#32548a",
        secondary: "#f7cb46",
        "secondary-light": "#f8d56a",
        "secondary-dark": "#c5a238",
      },
      height: sizes,
      padding: sizes,
    },
  },
  plugins: [
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require, @typescript-eslint/no-var-requires
    require("tailwindcss-image-rendering")(), // no options to configure
  ],
};
