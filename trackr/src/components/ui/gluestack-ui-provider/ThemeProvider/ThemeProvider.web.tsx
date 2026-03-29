// components/ui/ThemeProvider/ThemeProvider.web.tsx
"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { ModeType } from "..";

type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: ResolvedTheme;
  preference: ModeType;
  setNewTheme: (newTheme: ModeType) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): ResolvedTheme => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log("System theme:", isDark ? "dark" : "light");
  return isDark ? "dark" : "light";
};

const applyTheme = (resolved: ResolvedTheme) => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  document.documentElement.style.colorScheme = resolved;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [preference, setPreference] = useState<ModeType>("system");
  const [theme, setTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const saved = Cookies.get("theme") as ModeType | undefined;
    const initial = saved ?? "system";
    const resolved = initial === "system" ? getSystemTheme() : initial;

    setPreference(initial);
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  // Listen for OS theme changes when preference is "system"
  useEffect(() => {
    if (preference !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const resolved: ResolvedTheme = e.matches ? "dark" : "light";
      setTheme(resolved);
      applyTheme(resolved);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [preference]);

  const setNewTheme = (newPreference: ModeType) => {
    const resolved = newPreference === "system" ? getSystemTheme() : newPreference;

    setPreference(newPreference);
    setTheme(resolved);
    applyTheme(resolved);
    Cookies.set("theme", newPreference, { expires: 365 });
  };

  return (
    <ThemeContext.Provider value={{ theme, preference, setNewTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};