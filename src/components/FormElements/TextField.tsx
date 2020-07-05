import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  value: string;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
}

const TextField = ({ value, label, icon, transform }: $Props) => {
  const [text, setText] = useState<string>(value);
  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform}/> : ""} {label}
      </LabelText>
      <Input value={text} onChange={(e) => setText(e.target.value)}></Input>
    </Field>
  );
};

export default TextField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  flex: 2 1;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

const LabelText = styled.div`
  flex: 1 1;
`;

const Input = styled.input`
  flex: 3 2;
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;
  border-radius: 5px;
`;
