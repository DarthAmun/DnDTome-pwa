import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  text: string;
  disabled?: boolean;
  icon?: IconDefinition;
  transform?: string | Transform;
  style?: any;
  onClick: () => void;
}

const TextButton = ({ text, icon, transform, disabled, style, onClick }: $Props) => {
  return (
    <SimpleButton onClick={onClick} disabled={disabled} style={style}>
      {icon ? <Icon icon={icon} transform={transform} /> : ""} {text}
    </SimpleButton>
  );
};

export default TextButton;

const SimpleButton = styled.button`
  color: ${({ theme }) => theme.buttons.color};
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};
  float: right;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  border: none;

  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.buttons.hoverColor};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.buttons.disabled};
  }

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  flex: 1 1 auto;
  margin-right: 5px;
`;
