// components/ui/ThemeProvider/ThemeProvider.tsx
"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import Storage from "expo-native-storage";
import { useColorScheme } from "react-native";
import { ModeType } from "..";

type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: ResolvedTheme;
  preference: ModeType;
  setNewTheme: (newTheme: ModeType) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [preference, setPreference] = useState<ModeType>("system");

  const theme: ResolvedTheme =
    preference === "system"
      ? (systemColorScheme ?? "light")
      : preference;

  useEffect(() => {
    (async () => {
      const saved = (await Storage.getItem("theme")) as ModeType | null;
      if (saved) setPreference(saved);
    })();
  }, []);

  const setNewTheme = (newPreference: ModeType) => {
    setPreference(newPreference);
    Storage.setItem("theme", newPreference);
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