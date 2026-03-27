import React from "react";
import { readJson, writeJson } from "@/lib/storage/json-storage";
import { darkTheme, lightTheme, ThemeMode } from "@/styles/theme";

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: typeof lightTheme;
  isReady: boolean;
  toggleTheme: () => Promise<void>;
};

const THEME_KEY = "summa:theme-mode";

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [mode, setMode] = React.useState<ThemeMode>("light");
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async function loadTheme() {
      const savedMode = await readJson<ThemeMode>(THEME_KEY, "light");
      setMode(savedMode === "dark" ? "dark" : "light");
      setIsReady(true);
    }

    void loadTheme();
  }, []);

  const setModePersisted = React.useCallback(async (nextMode: ThemeMode) => {
    setMode(nextMode);
    await writeJson(THEME_KEY, nextMode);
  }, []);

  const toggleTheme = React.useCallback(async () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    await setModePersisted(nextMode);
  }, [mode, setModePersisted]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === "dark",
      colors: mode === "dark" ? darkTheme : lightTheme,
      isReady,
      toggleTheme,
    }),
    [isReady, mode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return context;
}
