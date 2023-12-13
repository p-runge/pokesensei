"use client";

import { useLocalStorage } from "@mantine/hooks";
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
  const [scheme, setScheme] = useLocalStorage<Scheme>({
    key: "scheme",
    defaultValue: "dark",
  });

  useEffect(() => {
    // Update the body class whenever the scheme changes
    document.documentElement.classList.toggle("dark", scheme === "dark");

    // Watch for changes to the OS scheme
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
      {/* This is needed to prevent a flash of unstyled content on the client */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const scheme = localStorage.getItem("scheme") || (window.matchMedia("(prefers-color-scheme: dark)").matches && "dark");
              scheme.toString().replaceAll("\\"", "") === "dark" && document.documentElement.classList.add("dark");
            })();
          `,
        }}
      />

      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
