import React from "react";
import Theme, { darkTheme } from "./Theme";
import { ThemeProvider } from "styled-components";

export function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

type ThemeContextType = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

export const [useTheme, CtxProvider] = createCtx<ThemeContextType>();

type Props = {
  children: React.ReactNode;
};

export const MyThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = React.useState(darkTheme);

  React.useEffect(() => {
    // We'd get the theme from a web API / local storage in a real app
    // We've hardcoded the theme in our example
    const currentTheme = darkTheme;
    setTheme(currentTheme);
  }, []);

  return (
    <CtxProvider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CtxProvider>
  );
};
