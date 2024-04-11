import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";
import animate from "tailwindcss-animate";

import base from "./base";

// TODO: remove the cast when fix request is implemented: https://github.com/tailwindlabs/tailwindcss/discussions/12552
const responsiveScreenHeight = ["100vh", "100dvh"] as unknown as string;

const heights = {
  header: "64px",
  screen: responsiveScreenHeight,
};
const widths = {
  boxed: "1200px",
};

const customImageRenderingPlugin: PluginCreator = ({ addUtilities, theme }) => {
  const imageRenderings: Record<string, { imageRendering: string }> = theme(
    "imageRendering",
    {},
  );
  const newUtilities: Record<string, { imageRendering: string }> = {};

  Object.keys(imageRenderings).forEach((key) => {
    newUtilities[`.rendering-${key}`] = {
      imageRendering: imageRenderings[key]!.imageRendering,
    };
  });

  addUtilities(newUtilities);
};

export default {
  content: base.content,
  presets: [base],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6ebf5",
          100: "#cdd7eb",
          200: "#9bb2db",
          300: "#699dcb",
          400: "#4d8ac0",
          500: "#3f69ad", // DEFAULT
          600: "#33528a",
          700: "#283c67",
          800: "#1d2944",
          900: "#141c2e",
        },
        secondary: {
          50: "#fef9e6",
          100: "#fdf3cd",
          200: "#fbe89b",
          300: "#f9dd69",
          400: "#f7d237",
          500: "#f7cb46", // DEFAULT
          600: "#d5a92e",
          700: "#b38823",
          800: "#916818",
          900: "#7a5510",
        },
        success: "#16a34a",
        error: "#dc2626",
      },

      width: widths,
      height: heights,
      minHeight: {
        screen: responsiveScreenHeight,
      },
      maxHeight: {
        screen: responsiveScreenHeight,
      },

      padding: {
        ...heights,
        ...widths,
      },

      // Extend with custom utilities for image rendering
      imageRendering: {
        pixelated: { imageRendering: "pixelated" },
        auto: { imageRendering: "auto" },
        "crisp-edges": { imageRendering: "crisp-edges" },
        smooth: { imageRendering: "smooth" }, // custom utility for smooth rendering
      },

      keyframes: {
        shoot: {
          "0%": { transform: "translateX(0)", opacity: "0" },
          "25%": { opacity: "1" },
          "100%": { transform: "translateX(50px)", opacity: "0" },
        },
        ["fade-in"]: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        shoot: "shoot 1s ease-out forwards",
        ["fade-in"]: "fade-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [animate, customImageRenderingPlugin],
} satisfies Config;
