import React from "react";
import styled from "styled-components";
import { useTheme } from "./MyThemeProvider";
import { darkTheme, lightTheme } from "./Theme";

const Options = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    } else {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <App>
      Options
      <button onClick={() => toggleTheme()}>Toggle Style</button>
    </App>
  );
};

export default Options;

const App = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.main.backgroundColor};
`;
