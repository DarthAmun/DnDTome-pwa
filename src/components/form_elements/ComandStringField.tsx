import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";
import { useHotkeys } from "react-hotkeys-hook";

interface $Props {
  options?: string[];
  defaultComands?: string[];
  value: string;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: string[]) => void;
}

const ComandStringField = ({
  options,
  defaultComands,
  value,
  label,
  icon,
  transform,
  onChange,
}: $Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState<string>(value);
  const [allOptions] = useState<string[]>(options !== undefined ? options : []);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  useHotkeys("ctrl+p", (e) => {
    e.preventDefault();
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  });

  useHotkeys("cmd+p", (e) => {
    e.preventDefault();
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  });

  const onSearch = useCallback(
    (searchTerm: string) => {
      setTerm(searchTerm);
      let newOptions = allOptions
        .filter((option) => {
          return option.toLowerCase().startsWith(searchTerm.toLowerCase());
        })
        .slice(0, 5);
      setFilteredOptions(newOptions);
    },
    [allOptions]
  );

  const applyTerm = (e: any) => {
    if (e.key === "Enter") {
      let command = term.split(" ");
      let commandTask: string = command[0];
      let commandEntity: string = command[1];
      command = command.slice(2);
      let rest = "";
      command.forEach((c) => (rest += " " + c));

      onChange([commandTask, commandEntity, rest.trim()]);
      setTerm("");
      setFilteredOptions([]);
    }
  };

  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      <Input
        ref={inputRef}
        type="text"
        value={term}
        placeholder={"ctrl/cmd + p to focus"}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => applyTerm(e)}
        onFocus={(e) => onSearch(e.target.value)}
      ></Input>
      <Options>
        {defaultComands &&
          defaultComands.length > 0 &&
          term === "" &&
          defaultComands.map((opt, index: number) => {
            return (
              <Option
                key={index}
                onClick={(e) => {
                  setTerm(opt);
                }}
              >
                {opt}
              </Option>
            );
          })}
        {filteredOptions.length > 0 &&
          term !== "" &&
          filteredOptions.map((opt, index: number) => {
            return (
              <Option
                key={index}
                onClick={(e) => {
                  setTerm(opt);
                }}
              >
                {opt}
              </Option>
            );
          })}
      </Options>
    </Field>
  );
};

export default ComandStringField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  height: 30px;
  width: calc(100% - 300px);
  min-width: 200px;
  max-width: 600px;
  line-height: 30px;
  padding: 5px;
  margin-top: -5px;
  border-radius: 5px;
  position: relative;
  overflow: visible;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    display: none;
  }
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
  max-width: 15px;
`;

const Options = styled.div`
  display: none;
  position: absolute;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  overflow: hidden;

  &:hover {
    display: block;
  }
`;

const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-bottom: 1px solid black;
  border-radius: 5px;
`;

const Input = styled.input`
  flex: 3 1 auto;
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;
  border-radius: 5px;

  &:focus ~ ${Options} {
    display: block;
  }
`;
