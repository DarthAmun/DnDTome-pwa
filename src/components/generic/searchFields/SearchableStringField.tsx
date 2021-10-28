import { useState, useEffect } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useLocation } from "react-router";
import { Whisper, Tooltip, InputGroup, Input } from "rsuite";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $SearchableStringFieldProps {
  type: string;
  entityName: string;
  applyFilter: (filters: Filter, type: any) => void;
}

const SearchableStringField = ({ type, entityName, applyFilter }: $SearchableStringFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<string>("");
  const [sort, setSort] = useState<number>();

  useEffect(() => {}, []);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === type) {
          setVal(filter.value as string);
          if (filter.sort > 0) setSort(filter.sort as number);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (val !== "") {
      applyFilter({ fieldName: type, value: val, sort: sort !== undefined ? sort : 0 }, type);
    }
  }, [val, sort]);

  return (
    <Whisper
      trigger="focus"
      placement={"top"}
      speaker={
        <Tooltip>
          Part of the {entityName}'s {type}
        </Tooltip>
      }
    >
      <InputGroup style={{ width: "300px" }}>
        <InputGroup.Addon>{type}</InputGroup.Addon>
        <Input value={val} onChange={(val: any) => setVal(val)} />
        <InputGroup.Button
          onClick={(e) => {
            e.stopPropagation();
            if (sort !== undefined) setSort((sort + 1) % 3);
            else setSort(1);
          }}
        >
          {sort !== undefined ? (
            <>
              {sort === 0 ? <>-</> : <></>}
              {sort === 1 ? <FaLongArrowAltDown /> : <></>}
              {sort === 2 ? <FaLongArrowAltUp /> : <></>}
            </>
          ) : (
            <>-</>
          )}
        </InputGroup.Button>
      </InputGroup>
    </Whisper>
  );
};

export default SearchableStringField;
