"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
};

const STORAGE_KEY = "nexhibit-theme";
const THEMES = new Set<ThemePreference>(["light", "dark", "system"]);

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function coerceTheme(value: string | null): ThemePreference {
  return value && THEMES.has(value as ThemePreference) ? (value as ThemePreference) : "system";
}

function applyTheme(preference: ThemePreference): ResolvedTheme {
  const resolvedTheme = preference === "system" ? getSystemTheme() : preference;

  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = preference;
    root.style.colorScheme = resolvedTheme;
  }

  return resolvedTheme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    const safeTheme = coerceTheme(nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, safeTheme);
    } catch {
      // Storage can be unavailable in strict privacy contexts; the DOM theme still updates.
    }

    setThemeState(safeTheme);
    setResolvedTheme(applyTheme(safeTheme));
  }, []);

  useEffect(() => {
    let storedTheme: ThemePreference = "system";

    try {
      storedTheme = coerceTheme(window.localStorage.getItem(STORAGE_KEY));
      window.localStorage.setItem(STORAGE_KEY, storedTheme);
    } catch {
      storedTheme = "system";
    }

    setThemeState(storedTheme);
    setResolvedTheme(applyTheme(storedTheme));

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemThemeChange = () => {
      setResolvedTheme(applyTheme(coerceTheme(window.localStorage.getItem(STORAGE_KEY))));
    };

    mediaQuery.addEventListener("change", onSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", onSystemThemeChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, setTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return value;
}

export const themeStorageKey = STORAGE_KEY;
