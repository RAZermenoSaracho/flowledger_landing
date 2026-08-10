import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

/** Resolved theme — this landing page only ever renders one of these two, never a "system" state. */
export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const storageKey = "flowledger.theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Reads this session's manually-toggled theme, if the visitor has set one. */
function readStoredTheme(): Theme | null {
  const stored = window.sessionStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" ? stored : null;
}

/** Reads the OS color-scheme preference, or `null` if unsupported or not actually expressed. */
function readSystemTheme(): Theme | null {
  if (typeof window.matchMedia !== "function") return null;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return null;
}

/** Falls back to the visitor's local device clock: light 06:00–18:00, dark otherwise. */
function readTimeOfDayTheme(): Theme {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

/** Resolves the theme to render: session choice, then OS preference, then local time of day. */
function resolveTheme(): Theme {
  return readStoredTheme() ?? readSystemTheme() ?? readTimeOfDayTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

/** React context provider resolving and applying the landing page's light/dark theme. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(resolveTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    // Once the visitor has manually toggled, their choice always wins (see
    // resolveTheme), so there's no need to keep tracking the OS preference.
    if (readStoredTheme()) return;
    if (typeof window.matchMedia !== "function") return;

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const lightQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => setTheme(resolveTheme());

    darkQuery.addEventListener("change", handleChange);
    lightQuery.addEventListener("change", handleChange);
    return () => {
      darkQuery.removeEventListener("change", handleChange);
      lightQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme: Theme = theme === "dark" ? "light" : "dark";
        window.sessionStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
      }
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Reads the current `ThemeProvider` context; throws if used outside it. */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
