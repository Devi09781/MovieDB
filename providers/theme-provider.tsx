"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light" | "auto";
interface ThemeContextValue { theme: Theme; resolved: "dark" | "light"; setTheme: (t: Theme) => void; }
const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "cinedb-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  const apply = useCallback((t: Theme) => {
    const isDark = t === "dark" || (t === "auto" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    setResolved(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme) || "dark";
    setThemeState(stored); apply(stored);
  }, [apply]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t); localStorage.setItem(STORAGE_KEY, t);
    document.cookie = `${STORAGE_KEY}=${t};path=/;max-age=31536000`; apply(t);
  }, [apply]);

  return <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
