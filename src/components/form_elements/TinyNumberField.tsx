import React from "react";
import styled from "styled-components";

interface $Props {
  value: number;
  max?: number;
  showMax?: boolean;
  onChange: (value: number) => void;
}

const TinyNumberField = ({
  value,
  max,
  showMax,
  onChange,
}: $Props) => {
  return (
    <Field>
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

export default TinyNumberField;

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

const Input = styled.input`
  flex: 1 1 auto;
  max-width: 4em;
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
