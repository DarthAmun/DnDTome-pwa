import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  value: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: IconDefinition;
  style?: any;
  transform?: string | Transform;
  onChange: (value: string) => void;
}

const StringField = ({
  value,
  label,
  disabled,
  placeholder,
  icon,
  transform,
  style,
  onChange,
}: $Props) => (
  <Field style={style}>
    <LabelText>
      {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
    </LabelText>
    <Input
      type="text"
      value={value}
      disabled={disabled || false}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    ></Input>
  </Field>
);

export default StringField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  height: 38px;
  line-height: 30px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
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
  flex: 1 1 auto;
`;

const Input = styled.input`
  flex: 3 1 auto;
  height: 38px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;
  border-radius: 5px;
  width: 0;
  min-width: 100px;
`;
