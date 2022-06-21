import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f69ad",
      900: "#334c8d",
      800: "#3f69ad",
      700: "#467abf",
      600: "#4f8cd2",
      500: "#5699df",
      400: "#66a8e4",
      300: "#7cb7e9",
      200: "#9dcbf0",
      100: "#c1dff6",
      50: "#e6f2fb",
    },
    secondary: {
      main: "#f7cb46",
      900: "#f36200",
      800: "#f38200",
      700: "#f49400",
      600: "#f4a600",
      500: "#f4b400",
      400: "#f5be19",
      300: "#f7cb46",
      200: "#f9d87c",
      100: "#fce8af",
      50: "#fef6df",
    },
  },
});

export default theme;
