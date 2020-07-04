import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import Navigation from "./Navigation/Navigation";

interface $Props {
  children: ReactNode;
}

const AppWrapper = ({ children }: $Props) => {
  return (
    <App>
      <Header />
      <Navigation />
      {children}
    </App>
  );
};

export default AppWrapper;

const App = styled.div`
  padding-top: 4rem;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.main.backgroundColor};
  display: flex;
  flex-wrap: wrap;
`;
