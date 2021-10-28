import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Checkbox } from "rsuite";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $SwitchBooleanFieldProps {
  type: string;
  applyFilter: (filters: Filter, type: any) => void;
}

const SwitchBooleanField = ({ type, applyFilter }: $SwitchBooleanFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<boolean>(false);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === type) {
          setVal(filter.value as boolean);
        }
      });
    }
  }, []);

  useEffect(() => {
    applyFilter({ fieldName: type, value: val, sort: 0 }, type);
  }, [val]);

  return (
    <Wrapper>
      <Checkbox checked={val} onCheckboxClick={() => setVal((r) => !r)}>
        {type}
      </Checkbox>
    </Wrapper>
  );
};

export default SwitchBooleanField;

const Wrapper = styled.div`
  width: min-content;
`;
