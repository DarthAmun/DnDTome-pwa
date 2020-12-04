import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./navigation/Header";
import Navigation from "./navigation/Navigation";

interface $Props {
  children: ReactNode;
}

const AppWrapper = ({ children }: $Props) => {
  return (
    <App>
      <Header />
      <Navigation />
      <Content>{children}</Content>
    </App>
  );
};

export default AppWrapper;

const App = styled.div`
  padding-top: 4rem;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 4rem);
  background-color: ${({ theme }) => theme.main.backgroundColor};
  display: flex;
  flex-wrap: no-wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const Content = styled.div`
  margin-left: 55px;
  width: 100%;

  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;
