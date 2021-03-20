import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../form_elements/TextButton";
import NumberField from "../form_elements/NumberField";

interface $Props {
  message: string;
  icon?: IconDefinition;
  confirmeText: string;
  confirmeClick: () => void;
  abortText: string;
  abortClick: () => void;
}

export const Dialog = ({
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

interface $DamageProps {
  name: string;
  damageText: string;
  damageClick: (value: number) => void;
  healText: string;
  healClick: (value: number) => void;
  abortText: string;
  abortClick: () => void;
}

export const DamageDialog = ({
  name,
  damageText,
  damageClick,
  healText,
  healClick,
  abortText,
  abortClick,
}: $DamageProps) => {
  const [dmg, setDmg] = useState<number>(0);
  return (
    <DialogWrapper>
      <NumberField value={dmg} label={name} onChange={setDmg} />
      <ButtonBar>
        <TextButton text={abortText} onClick={abortClick} />
        <TextButton text={damageText} onClick={() => damageClick(dmg)} style={{ float: "left" }} />
        <TextButton
          text={healText}
          onClick={() => healClick(dmg)}
          style={{ backgroundColor: "lightgreen", float: "left" }}
        />
      </ButtonBar>
    </DialogWrapper>
  );
};

const DialogWrapper = styled.div`
  width: 280px;
  position: fixed;
  z-index: 1010;
  top: 100px;
  left: calc(50% - 150px);
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
