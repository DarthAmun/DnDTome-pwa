import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface $Props {
  value: boolean;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: boolean) => void;
}

const CheckField = ({ value, label, icon, transform, onChange }: $Props) => {
  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      <Input
        type="checkbox"
        defaultChecked={value}
        onChange={(e) => onChange(e.target.checked)}
      ></Input>
      <Checkmark></Checkmark>
    </Field>
  );
};

export default CheckField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  height: 38px;
  line-height: 38px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  user-select: none;
  position: relative;

  display: flex;
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
`;

const Checkmark = styled.div`
  flex: 1 1;
  height: 30px;
  min-width: 30px;
  max-width: 30px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;
  border-radius: 5px;

  &:after {
    content: "";
    display: none;
  }

  &:after {
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-left: 6px;
    margin-top: 2px;
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  left: 0;
  bottom 0;

  &:checked ~ ${Checkmark} {
    background-color: ${({ theme }) => theme.main.highlight};
    color: ${({ theme }) => theme.buttons.color};
  }

  &:checked ~ ${Checkmark}:after {
    display: block;
  }
`;
