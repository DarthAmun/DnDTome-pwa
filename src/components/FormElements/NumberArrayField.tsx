import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  values: number[];
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: number[]) => void;
}

const NumberArrayField = ({
  values,
  label,
  icon,
  transform,
  onChange,
}: $Props) => {
  const [array, setArray] = useState<number[]>(values);

  const handleValueChange = (index: number, value: number) => {
    let values = array;
    values[index] = value;
    setArray(values);
    onChange(values);
  };

  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      {values.map((value: number, index: number) => {
        return (
          <Input
            type="text"
            key={index}
            value={value}
            onChange={(e) => handleValueChange(index, +e.target.value)}
          ></Input>
        );
      })}
    </Field>
  );
};

export default NumberArrayField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  line-height: 38px;
  flex: 1 1 auto;
  padding: 5px 5px 0px 5px;
  margin: 5px;
  border-radius: 5px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  flex: 1 1 1rem;
  max-width: 2em;
  height: 38px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
`;
