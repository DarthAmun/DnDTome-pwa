import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import NavMenu from "./NavMenu";

interface $Props {
  navMode: number;
}

const Navigation = ({ navMode }: $Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (navMode === 1) {
      setOpen(true);
    } else if (navMode === 2) {
      setOpen(false);
    }
  }, [navMode]);

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
