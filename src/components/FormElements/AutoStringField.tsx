import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import IEntity from "../../Data/IEntity";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";
import { reciveAll, reciveAllPromise } from "../../Services/DatabaseService";

interface $Props {
  optionTable: string | string[];
  value: string;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: string) => void;
}

const AutoStringField = ({
  optionTable,
  value,
  label,
  icon,
  transform,
  onChange,
}: $Props) => {
  const [options, setOptions] = useState<IEntity[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<IEntity[]>([]);

  useEffect(() => {
    if (typeof optionTable === "string") {
      reciveAll(optionTable, (data: any[]) => {
        setOptions(data);
      });
    }
    if (optionTable instanceof Array && optionTable.length > 0) {
      findAllItems(optionTable);
    }
  }, [optionTable]);

  const findAllItems = async (optionTable: string[]) => {
    let itemList: Promise<IEntity[]>[] = [];
    optionTable.forEach((table) => {
      itemList.push(reciveAllPromise(table));
    });
    const results = await Promise.all(itemList);
    results.forEach((items: IEntity[]) => {
      setOptions((o) => o.concat(items));
    });
  };

  const onSearch = useCallback(
    (searchTerm: string) => {
      onChange(searchTerm);
      setFilteredOptions(
        options.filter((option) => {
          return option.name.includes(searchTerm);
        })
      );
    },
    [options, onChange]
  );

  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      <Input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      ></Input>
      <Options>
        {filteredOptions.length > 1 &&
          filteredOptions.map((opt, index: number) => {
            return (
              <Option key={index} onClick={(e) => onSearch(opt.name)}>
                {opt.name}
              </Option>
            );
          })}
      </Options>
    </Field>
  );
};

export default AutoStringField;

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
  position: relative;
  overflow: visible;

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

const Options = styled.div`
  display: none;
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  overflow-y: scroll;
  max-height: 100px;

  &:hover {
    display: block;
  }
`;

const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-bottom: 1px solid #d4d4d4;
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

  &:focus ~ ${Options} {
    display: block;
  }
`;
