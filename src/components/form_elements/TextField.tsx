import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  value: string;
  label: string;
  height?: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: string) => void;
}

const TextField = ({ value, label, height, icon, transform, onChange }: $Props) => {
  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      <Input height={height} value={value} onChange={(e) => onChange(e.target.value)}></Input>
    </Field>
  );
};

export default TextField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  min-width: calc(100% - 20px);
  flex: 3 3 auto;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;

  display: flex;
  flex-wrap: wrap;
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
  flex: 1 1;
  min-width: 100%;
  height: 30px;
  line-height: 30px;
`;

type TextProps = {
  height?: string;
};

const Input = styled.textarea<TextProps>`
  flex: 1 1;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  height: ${({ height }) => (height !== undefined ? height : "auto")};
  min-height: ${({ height }) => (height !== undefined ? height : "22vh")};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
`;
