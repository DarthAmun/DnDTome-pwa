import React from "react";
import styled from "styled-components";

const SpellOverview = () => {
  return (
    <App>
      SpellOverview
      <button>Toggle Style</button>
    </App>
  );
};

export default SpellOverview;

const App = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.appBackgroundColor};
`;
