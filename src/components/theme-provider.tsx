"use client";

import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { createContext, useContext, useEffect } from "react";

type Scheme = "light" | "dark";

type ThemeContextValue = {
  scheme: Scheme;
  setScheme: (value: Scheme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  scheme: "dark",
  setScheme: () => void null,
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const preferredScheme = useColorScheme("dark");
  const [scheme, setScheme] = useLocalStorage<Scheme>({
    key: "theme",
    defaultValue: preferredScheme,
  });

  useEffect(() => {
    // Update the body class whenever the scheme changes
    document.documentElement.classList.toggle("dark", scheme === "dark");

    // Watch for changes to the OS theme
    const handleSchemeChange = () => {
      const newPreferredScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
        ? "dark"
        : "light";

      if (newPreferredScheme !== scheme) {
        setScheme(newPreferredScheme);
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleSchemeChange);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSchemeChange);
  }, [scheme]);

  return (
    <ThemeContext.Provider value={{ scheme, setScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
