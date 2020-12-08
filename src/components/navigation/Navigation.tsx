import React from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import NavMenu from "./NavMenu";

interface $Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Navigation = ({ open, setOpen }: $Props) => {
  return (
    <Nav>
      <NavButton open={open} setOpen={setOpen} />
      <NavMenu open={open} />
    </Nav>
  );
};

export default Navigation;

const Nav = styled.div`
  max-width: 100px;
  height: auto;
  background-color: ${({ theme }) => theme.main.backgroundColor}
  display: flex;
  flex-wrap: wrap;
`;
