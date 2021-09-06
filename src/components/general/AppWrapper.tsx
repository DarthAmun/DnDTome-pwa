import React, { ReactNode, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import Header from "./Header";

interface $Props {
  children: ReactNode;
}

const AppWrapper = ({ children }: $Props) => {
  const [active, setActive] = useState<string>("home");

  return (
    <App>
      <Header />
      {/* <Content>{children}</Content> */}
    </App>
  );
};

export default AppWrapper;

const App = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Content = styled.div`
  margin-left: 105px;
  width: 100%;

  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;
