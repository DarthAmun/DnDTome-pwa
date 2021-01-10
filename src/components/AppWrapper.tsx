import React, { ReactNode, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import Header from "./navigation/Header";
import Navigation from "./navigation/Navigation";

interface $Props {
  children: ReactNode;
}

const AppWrapper = ({ children }: $Props) => {
  const [open, setOpen] = useState(false);

  const moveNav = (mode: string) => {
    if (mode === "open") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: () => moveNav("open"),
    onSwipedLeft: () => moveNav("close"),
  });

  return (
    <App {...handlers}>
      <Header />
      <Navigation open={open} setOpen={setOpen} />
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
  overflow-x: hidden;
`;

const Content = styled.div`
  margin-left: 105px;
  width: 100%;

  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;
