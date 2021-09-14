import { ReactNode } from "react";
import styled from "styled-components";

interface $ToggleProps {
  mode: boolean;
  setMode: (value: boolean) => void;
  left: ReactNode;
  right: ReactNode;
}

const ToggleButton = ({ mode, setMode, left, right }: $ToggleProps) => {
  return (
    <EditToggle mode={mode}>
      <ToggleLeft onClick={() => setMode(false)}>{left}</ToggleLeft>
      <ToggleRight onClick={() => setMode(true)}>{right}</ToggleRight>
    </EditToggle>
  );
};

export default ToggleButton;

export const ToggleLeft = styled.div`
  width: auto;
  padding: 10px;
  float: left;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px 0px 0px 5px;
  transition: color 0.2s, background-color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const ToggleRight = styled(ToggleLeft)`
  border-radius: 0px 5px 5px 0px;
`;

export const EditToggle = styled.div<{
  mode: boolean;
}>`
  width: auto;
  height: 30px;
  color: ${({ theme }) => theme.textColor};
  ${ToggleLeft} {
    background-color: ${(props) => {
      if (!props.mode) {
        return ({ theme }) => theme.highlight;
      } else {
        return ({ theme }) => theme.secondColor;
      }
    }};
  }
  ${ToggleRight} {
    background-color: ${(props) => {
      if (props.mode) {
        return ({ theme }) => theme.highlight;
      } else {
        return ({ theme }) => theme.secondColor;
      }
    }};
  }
`;
