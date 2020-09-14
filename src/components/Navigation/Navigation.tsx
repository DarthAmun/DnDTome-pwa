import React, { useState, useRef } from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import NavMenu from "./NavMenu";
import { useOnClickOutside } from "../../Hooks/MenuCloseHook";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setOpen(false));

  return (
    <Nav ref={node}>
      <NavButton open={open} setOpen={setOpen} />
      <NavMenu open={open} />
    </Nav>
  );
};

export default Navigation;

const Nav = styled.div`
  width: ${({ theme }) => theme.nav.width};
  height: auto;
  background-color: ${({ theme }) => theme.main.backgroundColor}
  display: flex;
  flex-wrap: wrap;
`;
