import type { Config } from "tailwindcss";

const heights = {
  header: "64px",
  footer: "48px",
};
const widths = {
  boxed: "1200px",
};

export default {
  mode: "jit",
  content: ["./src/{app,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    dropShadow: {
      DEFAULT:
        "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3f69ad",
          light: "#6587bd",
          dark: "#32548a",
        },
        secondary: {
          DEFAULT: "#f7cb46",
          light: "#f8d56a",
          dark: "#c5a238",
        },
        success: "#16a34a",
        error: "#dc2626",
      },
      height: heights,
      width: widths,
      padding: {
        ...heights,
        ...widths,
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    // require("tailwindcss-image-rendering")(), // no options to configure
  ],
} satisfies Config;
