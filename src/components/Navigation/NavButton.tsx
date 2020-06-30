import React from "react";
import styled from "styled-components";

interface $Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NavButton = ({ open, setOpen }: $Props) => {
  return (
    <Button open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </Button>
  );
};

export default NavButton;

type ButtonType = {
  open?: boolean;
};

const Button = styled.button<ButtonType>`
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.buttons.color};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;
