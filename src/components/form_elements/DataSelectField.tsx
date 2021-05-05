import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

import Select from "react-select";
import Filter from "../../data/Filter";
import IEntity from "../../data/IEntity";
import { reciveAllFilteredPromise } from "../../services/DatabaseService";
import { LocalLoadingSpinner } from "../Loading";

interface $Props {
  optionTable: string[];
  filters?: Filter[];
  value: string;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: string) => void;
}

const DataSelectField = ({
  optionTable,
  filters,
  value,
  label,
  icon,
  transform,
  onChange,
}: $Props) => {
  const [optionsTable] = useState<string[]>(optionTable);
  const [options, setOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const findAllItems = useCallback(
    async (optionsTable: string[]) => {
      let entityList: Promise<IEntity[]>[] = [];
      optionsTable.forEach((table) => {
        entityList.push(reciveAllFilteredPromise(table, filters !== undefined ? filters : []));
      });
      const results = await Promise.all(entityList);
      results.forEach((entities: IEntity[]) => {
        entities.forEach((entity: IEntity) => {
          setOptions((o) =>
            o.concat({
              value: entity.name + "|" + entity.sources,
              label: entity.name + "|" + entity.sources,
            })
          );
        });
      });
    },
    [filters]
  );

  useEffect(() => {
    if (optionsTable !== undefined && optionsTable.length > 0) {
      findAllItems(optionsTable);
      setLoading(false);
    }
  }, [optionsTable, findAllItems, filters]);

  const handleChange = (option: { value: string; label: string }) => {
    if (option !== null && option !== undefined) {
      onChange(option.value);
    }
  };

  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      {loading && <LocalLoadingSpinner />}
      {!loading && (
        <StyledSelect
          isMulti={false}
          classNamePrefix="react-select"
          value={{
            value: value,
            label: value,
          }}
          options={options}
          onChange={(option: { value: string; label: string }) => handleChange(option)}
        />
      )}
    </Field>
  );
};

export default DataSelectField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
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

const StyledSelect = styled(Select)`
  flex: 3 2 auto;
  box-sizing: border-box;
  border: none;
  min-width: 120px;

  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;

  .react-select__single-value {
    color: ${({ theme }) => theme.input.color};
  }
  .react-select__control {
    background-color: ${({ theme }) => theme.input.backgroundColor};
    border: none;
    border-radius: 5px;
  }
  .react-select__menu {
    background-color: ${({ theme }) => theme.input.backgroundColor};

    .react-select__option:hover {
      background-color: ${({ theme }) => theme.buttons.backgroundColor};
      color: ${({ theme }) => theme.buttons.color};
    }
    .react-select__option--is-focused {
      background-color: ${({ theme }) => theme.buttons.backgroundColor};
      color: ${({ theme }) => theme.buttons.color};
    }
  }
`;
