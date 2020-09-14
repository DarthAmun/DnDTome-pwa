import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  value: number;
  max?: number;
  showMax?: boolean;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: number) => void;
}

const SmallNumberField = ({
  value,
  max,
  showMax,
  label,
  icon,
  transform,
  onChange,
}: $Props) => {
  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      {max !== undefined && (
        <>
          <Input
            type="number"
            max={max}
            value={value}
            onChange={(e) => onChange(+e.target.value)}
          />
          {showMax && (
            <Max>
              {"/ "}
              {max}
            </Max>
          )}
        </>
      )}
      {max === undefined && (
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(+e.target.value)}
        />
      )}
    </Field>
  );
};

export default SmallNumberField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 2px;
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
  flex: 1 1;
`;

const Input = styled.input`
  flex: 1 1 auto;
  max-width: 6em;
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;
  border-radius: 5px;
`;

const Max = styled.span`
  margin-left: 5px;
`;
