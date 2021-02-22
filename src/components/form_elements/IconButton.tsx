import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  icon: IconDefinition;
  floatLeft?: boolean;
  disabled?: boolean;
  transform?: string | Transform;
  style?: any;
  onClick?: (() => void) | ((e: any) => void);
}

const IconButton = ({ icon, floatLeft, disabled, transform, style, onClick }: $Props) => {
  return (
    <>
      {!disabled && (
        <SimpleButton left={floatLeft} onClick={onClick} style={style}>
          <Icon icon={icon} transform={transform} />
        </SimpleButton>
      )}
      {disabled && (
        <DisabledSimpleButton style={style}>
          <Icon icon={icon} transform={transform} />
        </DisabledSimpleButton>
      )}
    </>
  );
};

export default IconButton;

type FloatMpde = {
  left?: boolean;
};

const SimpleButton = styled.div<FloatMpde>`
  color: ${({ theme }) => theme.buttons.color};
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  cursor: pointer;

  font-size: 16px;
  overflow: hidden;
  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};
  float: ${({ left }) => (left ? "left" : "right")};
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);

  transition: color 0.2s;

  &:hover {
    color: white;
  }

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const DisabledSimpleButton = styled(SimpleButton)`
  color: ${({ theme }) => theme.buttons.backgroundColor};
  background-color: ${({ theme }) => theme.buttons.color};
  cursor: not-allowed;
`;

const Icon = styled(FontAwesomeIcon)`
  flex: 1 1 auto;
`;
