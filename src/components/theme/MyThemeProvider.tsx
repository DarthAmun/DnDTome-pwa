import React, { useEffect, createContext, useContext, useState } from "react";
import Theme, { darkTheme, lightTheme } from "./Theme";
import { ThemeProvider } from "styled-components";

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
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
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme !== undefined) {
      if (localTheme === "light") {
        setTheme(lightTheme);
        localStorage.setItem("theme", "light");
      } else {
        setTheme(darkTheme);
        localStorage.setItem("theme", "dark");
      }
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <CtxProvider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CtxProvider>
  );
};
