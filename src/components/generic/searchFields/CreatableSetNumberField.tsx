import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TagPicker } from "rsuite";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $CreatableSetNumberFieldProps {
  Entity: any;
  entities: any[];
  type: string;
  applyFilter: (filters: Filter, type: any) => void;
}

const CreatableSetNumberField = ({
  Entity,
  entities,
  type,
  applyFilter,
}: $CreatableSetNumberFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<number[]>([]);
  const [valList, setValList] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === type) {
          setVal(filter.value as number[]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (val.length > 0) {
      applyFilter({ fieldName: type, value: val, sort: 0 }, type);
    }
  }, [val]);

  useEffect(() => {
    const newValList: number[] = [
      ...Array.from(new Set(entities.map((entity: typeof Entity) => +entity[type]))),
    ].sort((l1, l2) => l1 - l2);
    setValList(
      newValList.map((text: number) => {
        return { value: text, label: String(text) };
      })
    );
  }, [entities, Entity, type]);

  return (
    <TagPicker
      placeholder={`Select ${type}`}
      data={valList}
      trigger={"Enter"}
      value={val}
      onClean={() => setVal([])}
      onChange={(vals: string[]) => setVal(vals.map((val: string) => +val))}
      style={{ width: "300px" }}
    />
  );
};

export default CreatableSetNumberField;
