import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TagPicker } from "rsuite";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $CreatableSetStringFieldProps {
  Entity: any;
  entities: any[];
  type: string;
  applyFilter: (filters: Filter, type: any) => void;
}

const CreatableSetStringField = ({
  Entity,
  entities,
  type,
  applyFilter,
}: $CreatableSetStringFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<string[]>([]);
  const [valList, setValList] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === type) {
          setVal(filter.value as string[]);
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
    <TagPicker
      placeholder={`Select ${type}`}
      data={valList}
      trigger={"Enter"}
      value={val}
      onChange={setVal}
      onClean={() => setVal([])}
      style={{ width: "300px" }}
    />
  );
};

export default CreatableSetStringField;
