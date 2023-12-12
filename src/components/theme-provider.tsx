"use client";

import { useColorScheme } from "@mantine/hooks";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  scheme: "light" | "dark";
  setScheme: (value: "light" | "dark") => void;
};

const defaultThemeContextValue: ThemeContextValue = {
  scheme: "dark",
  setScheme: () => void null,
};

const ThemeContext = createContext<ThemeContextValue>(defaultThemeContextValue);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialScheme = useColorScheme(defaultThemeContextValue.scheme);
  const [scheme, setScheme] = useState(initialScheme);

  useEffect(() => {
    /**
     * If the user changes their system theme, we want to update the theme
     * context value to match.
     */
    setScheme(initialScheme);
  }, [initialScheme]);

  useEffect(() => {
    if (scheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [scheme]);

  return (
    <ThemeContext.Provider
      value={{
        scheme,
        setScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
