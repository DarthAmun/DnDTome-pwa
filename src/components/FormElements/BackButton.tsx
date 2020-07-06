import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";
import { useHistory } from "react-router";

interface $Props {
  icon: IconDefinition;
  transform?: string | Transform;
}

const BackButton = ({ icon, transform }: $Props) => {
  let history = useHistory();
  return (
    <Back onClick={() => history.goBack()}>
      <Icon icon={icon} transform={transform} />
    </Back>
  );
};

export default BackButton;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
  &:hover {
    color: ${({ theme }) => theme.buttons.color};
  }
`;

const Back = styled.div`
  float: left;
  font-size: calc(${({ theme }) => theme.buttons.height} + 10px);
  margin: 10px 0px 0px 10px;
  cursor: pointer;
`;
