import React from "react";
import styled from "styled-components";
import { useTheme } from "../MyThemeProvider";
import { darkTheme, lightTheme } from "../Theme";

const SpellOverview = () => {
  const { theme, setTheme } = useTheme();

  return (
    <App>
      SpellOverview
      <button onClick={() => setTheme(theme === darkTheme ? lightTheme : darkTheme)}>
        Toggle Style
      </button>
    </App>
  );
};

export default SpellOverview;

const App = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.main.backgroundColor};
`;
