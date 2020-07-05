import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  value: string;
  label: string;
  icon?: IconDefinition;
}

const TextField = ({ value, label, icon }: $Props) => {
  const [text, setText] = useState<string>(value);
  return (
    <Field>
      {icon ? <Icon icon={icon} /> : ""} {label}
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
  flex: 1 1;
  padding: 5px;
  margin: 5px;
  display: flex;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

const Input = styled.input`
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color:${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;
`;
