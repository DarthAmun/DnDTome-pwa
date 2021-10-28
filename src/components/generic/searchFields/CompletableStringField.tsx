import { useState, useEffect } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { Whisper, Tooltip, InputGroup, AutoComplete } from "rsuite";
import { getPathVariable } from "../../../services/LocationPathService";
import Filter from "../../../data/Filter";
import { useLocation } from "react-router";

interface $CompletableStringFieldProps {
  Entity: any;
  entities: any[];
  type: string;
  entityName: string;
  applyFilter: (filters: Filter, type: any) => void;
}

const CompletableStringField = ({
  Entity,
  entities,
  type,
  entityName,
  applyFilter,
}: $CompletableStringFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<string>("");
  const [valList, setValList] = useState<{ value: string; label: string }[]>([]);
  const [sort, setSort] = useState<number>();

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

  useEffect(() => {
    const newValList: string[] = [
      ...Array.from(new Set(entities.map((entity: typeof Entity) => entity[type]))),
    ].sort();
    setValList(
      newValList.map((text: string) => {
        return { value: text, label: text };
      })
    );
  }, [entities, Entity, type]);

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
        <AutoComplete
          placeholder={`Select ${type}`}
          data={valList}
          value={val}
          onChange={setVal}
          style={{ width: "min-content", minWidth: "150px" }}
        />
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

export default CompletableStringField;
