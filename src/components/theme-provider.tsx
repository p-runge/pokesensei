"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
  // Initialize scheme from localStorage
  const valueFromLocalStorage = localStorage?.getItem("scheme");
  const schemeFromLocalStorage: Scheme =
    valueFromLocalStorage === "light" || valueFromLocalStorage === "dark"
      ? valueFromLocalStorage
      : "dark";
  const [scheme, setScheme] = useState(schemeFromLocalStorage);

  // Keep localStorage in sync with the current scheme
  useEffect(() => {
    localStorage.setItem("scheme", scheme);
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
