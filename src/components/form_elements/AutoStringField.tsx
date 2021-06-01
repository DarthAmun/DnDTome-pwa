import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import IEntity from "../../data/IEntity";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";
import { reciveAllFiltered, reciveAllFilteredPromise } from "../../services/DatabaseService";
import Filter from "../../data/Filter";

interface $Props {
  optionTable?: string | string[];
  options?: IEntity[];
  filters?: Filter[];
  value: string;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: string) => void;
}

const AutoStringField = ({
  optionTable,
  options,
  filters,
  value,
  label,
  icon,
  transform,
  onChange,
}: $Props) => {
  const [term, setTerm] = useState<string>(value);
  const [optionsTable] = useState<string | string[]>(optionTable !== undefined ? optionTable : []);
  const [allOptions, setOptions] = useState<IEntity[]>(options !== undefined ? options : []);
  const [filteredOptions, setFilteredOptions] = useState<IEntity[]>([]);

  useEffect(() => {
    setTerm(value);
  }, [value]);

  const findAllItems = useCallback(
    async (optionsTable: string[]) => {
      let itemList: Promise<IEntity[] | undefined>[] = [];
      optionsTable.forEach((table) => {
        itemList.push(reciveAllFilteredPromise(table, filters !== undefined ? filters : []));
      });
      let results = await Promise.all(itemList);

      let newList: IEntity[] = [];
      results.forEach((entities: IEntity[] | undefined) => {
        if (entities !== undefined) entities.forEach((entity: IEntity) => newList.push(entity));
      });
      setOptions(newList);
    },
    [filters]
  );

  useEffect(() => {
    if (optionTable !== undefined) {
      if (typeof optionsTable === "string") {
        reciveAllFiltered(optionsTable, filters !== undefined ? filters : [], (data: any[]) => {
          setOptions(data);
        });
      }
      if (optionsTable instanceof Array && optionsTable.length > 0) {
        findAllItems(optionsTable);
      }
    }
  }, [optionTable, optionsTable, findAllItems, filters]);

  const onSearch = useCallback(
    (searchTerm: string) => {
      console.time("search");
      setTerm(searchTerm);
      if (searchTerm.length > 2) {
        let newOptions = allOptions
          .filter((option) => option.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
          .sort(
            (a, b) =>
              Math.abs(a.name.length - searchTerm.length) -
              Math.abs(b.name.length - searchTerm.length)
          )
          .slice(0, 5);
        setFilteredOptions(newOptions);
      } else {
        setFilteredOptions([]);
      }
      console.timeEnd("search");
    },
    [allOptions]
  );

  const applyTerm = (e: any) => {
    if (e.key === "Enter") {
      onChange(term);
    }
  };

  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      <Input
        type="text"
        value={term}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => applyTerm(e)}
      ></Input>
      <Options>
        {filteredOptions.length > 0 &&
          filteredOptions.map((opt, index: number) => {
            return (
              <Option
                key={index}
                onClick={(e) => {
                  setTerm(opt.name + "|" + opt.sources);
                  onChange(opt.name + "|" + opt.sources);
                }}
              >
                {opt.name}|{opt.sources}
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
  margin-bottom: 1px;
  border-radius: 5px;
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
