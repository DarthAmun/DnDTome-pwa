import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../FormElements/TextButton";

interface $Props {
  message: string;
  icon?: IconDefinition;
  confirmeText: string;
  confirmeClick: () => void;
  abortText: string;
  abortClick: () => void;
}

const Dialog = ({
  message,
  icon,
  confirmeText,
  confirmeClick,
  abortText,
  abortClick,
}: $Props) => {
  return (
    <DialogWrapper>
      <Message>
        {icon ? <Icon icon={icon} /> : ""} {message}
      </Message>
      <ButtonBar>
        <TextButton text={abortText} onClick={abortClick} />
        <TextButton text={confirmeText} onClick={confirmeClick} />
      </ButtonBar>
    </DialogWrapper>
  );
};

export default Dialog;

const DialogWrapper = styled.div`
  width: 180px;
  position: absolute;
  z-index: 1010;
  top: 10px;
  left: calc(50% - 100px);
  padding: 10px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  color: ${({ theme }) => theme.tile.color};
`;

const Message = styled.div`
  width: 100%;
  text-align: center;
`;

const ButtonBar = styled.div`
  width: 100%;
`;

const Icon = styled(FontAwesomeIcon)`
  flex: 1 1 auto;
  margin-right: 5px;
`;
