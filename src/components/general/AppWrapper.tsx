import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";

interface $Props {
  children: ReactNode;
}

const AppWrapper = ({ children }: $Props) => {
  return (
    <App>
      <Header />
      <Content>{children}</Content>
    </App>
  );
};

export default AppWrapper;

const App = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mainColor};
`;

const Content = styled.div`
  width: calc(100% - 20px);
  padding: 10px;
`;
