import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  values: number[];
  max?: number[];
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (index: number, value: number) => void;
}

const SmallNumberArrayField = ({ values, label, icon, transform, max, onChange }: $Props) => {
  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      {values.map((value: number, index: number) => {
        if (max !== undefined) {
          return (
            <Input
              type="number"
              key={index}
              max={max[index]}
              value={value}
              onChange={(e) => onChange(index, +e.target.value)}
            ></Input>
          );
        } else {
          return (
            <Input
              type="number"
              key={index}
              value={value}
              onChange={(e) => onChange(index, +e.target.value)}
            ></Input>
          );
        }
      })}
    </Field>
  );
};

export default SmallNumberArrayField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  min-height: 38px;
  line-height: 30px;
  flex: 1 1 auto;
  max-width: max-content;
  padding: 2px 5px 2px 5px;
  margin: 2px;
  border-radius: 5px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  margin-right: 5px;
`;

const Input = styled.input`
  flex: 1 1 1rem;
  max-width: 2em;
  height: 34px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border-radius: 5px;
  margin: 2px;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
