import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  icon: IconDefinition;
  transform?: string | Transform;
  onClick: () => void;
}

const IconButton = ({ icon, transform, onClick }: $Props) => {
  return (
    <SimpleButton onClick={onClick}>
      <Icon icon={icon} transform={transform} />
    </SimpleButton>
  );
};

export default IconButton;

const SimpleButton = styled.div`
  color: ${({ theme }) => theme.buttons.color};
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};
  float: right;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
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

const Icon = styled(FontAwesomeIcon)`
  flex: 1 1 auto;
`;
