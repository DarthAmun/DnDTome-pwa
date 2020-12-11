import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";
import IconButton from "./IconButton";

interface $Props {
  value: string;
  sort: { name: string; label: string; sort: number };
  field: string;
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  mobile?: boolean;
  onChange: (value: string, sort: { name: string; label: string; sort: number }) => void;
}

const StringSearchField = ({
  value,
  sort,
  field,
  label,
  icon,
  transform,
  mobile,
  onChange,
}: $Props) => {
  const changeSort = () => {
    if (sort.label === label) {
      onChange(value, {
        name: field,
        label: label,
        sort: (sort.sort + 1) % 3,
      });
    } else {
      onChange(value, {
        name: field,
        label: label,
        sort: 1,
      });
    }
  };

  return (
    <Field mobile={mobile === undefined ? true : mobile}>
      <LabelText onClick={() => changeSort()}>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      <Input type="text" value={value} onChange={(e) => onChange(e.target.value, sort)}></Input>
      {sort.sort !== 0 && sort.label === label && (
        <Sort>
          {sort.sort === 1 && <IconButton onClick={() => changeSort()} icon={faChevronCircleUp} />}
          {sort.sort === 2 && (
            <IconButton onClick={() => changeSort()} icon={faChevronCircleDown} />
          )}
        </Sort>
      )}
    </Field>
  );
};

export default StringSearchField;

type MobileType = {
  mobile?: boolean;
};

const Field = styled.label<MobileType>`
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

  display: flex;
  justify-content: center;
  align-items: center;
  ${({ mobile }) => (!mobile ? "@media (max-width: 576px) {display: none;}" : "")}
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
  min-width: max-content;
  cursor: pointer;
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
  width: 0;
  min-width: 100px;
`;

const Sort = styled.div`
  flex: 1 1 auto;
  cursor: pointer;
`;
