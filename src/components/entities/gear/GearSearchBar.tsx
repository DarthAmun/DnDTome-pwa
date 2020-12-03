import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Filter from "../../../data/Filter";
import ReactDOM from "react-dom";
import {
  reciveAttributeSelection,
  createNewWithId,
  exportFilteredFromTable,
} from "../../../services/DatabaseService";

import {
  faLink,
  faSearch,
  faRedoAlt,
  faCoins,
  faWeightHanging,
  faCrosshairs,
  faBook,
  faPlusCircle,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../form_elements/MultipleSelectField";
import IconButton from "../../form_elements/IconButton";
import Gear from "../../../data/Gear";
import StringSearchField from "../../form_elements/StringSearchField";
import { Bar, SearchBar, CreateButton, ExportButton } from "../../SearchbarStyle";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const GearSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [type, setType] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>([]);
  const [properties, setProperties] = useState<string>("");
  const [damage, setDamage] = useState<string>("");
  const [sources, setSources] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [sort, setSort] = useState<{
    name: string;
    label: string;
    sort: number;
  }>({
    name: "",
    label: "",
    sort: 0,
  });

  useEffect(() => {
    reciveAttributeSelection("gears", "type", function (result) {
      let types = result.map((type) => {
        if (type === "") {
          return { value: type.toString(), label: "Empty" };
        }
        return { value: type.toString(), label: type.toString() };
      });
      setTypeList(types);
    });
  }, []);

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (cost !== "") {
      newFilters = [...newFilters, new Filter("cost", cost)];
    }
    if (weight !== "") {
      newFilters = [...newFilters, new Filter("weight", weight)];
    }
    if (properties !== "") {
      newFilters = [...newFilters, new Filter("properties", properties)];
    }
    if (damage !== "") {
      newFilters = [...newFilters, new Filter("damage", damage)];
    }
    if (sources !== "") {
      newFilters = [...newFilters, new Filter("sources", sources)];
    }
    if (description !== "") {
      newFilters = [...newFilters, new Filter("description", description)];
    }
    if (type.length !== 0) {
      newFilters = [...newFilters, new Filter("type", type)];
    }
    newFilters = newFilters.map((filter: Filter) => {
      if (sort.name === filter.fieldName) {
        return { ...filter, sort: sort.sort };
      }
      return filter;
    });
    setFilters(newFilters);
    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setCost("");
      setWeight("");
      setProperties("");
      setDamage("");
      setSources("");
      setType([]);
      setDescription("");
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    onSend([]);
  };

  const createNewGear = () => {
    let newGear = new Gear();
    delete newGear.id;
    createNewWithId("gears", newGear, (id) => {
      history.push(`/gear-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("gears", filters, "DnDTome_filtered_gears.json");
  };

  return (
    <>
      <Bar open={open}>
        <StringSearchField
          value={name}
          sort={sort}
          field={"name"}
          label="Name"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setName(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={cost}
          sort={sort}
          field={"cost"}
          label="Cost"
          icon={faCoins}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setCost(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={weight}
          sort={sort}
          field={"weight"}
          label="Weight"
          icon={faWeightHanging}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setWeight(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={damage}
          sort={sort}
          field={"damage"}
          label="Damage"
          icon={faCrosshairs}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setDamage(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={properties}
          sort={sort}
          field={"properties"}
          label="Properties"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setProperties(name);
            setSort(sort);
          }}
        />
        <MultipleSelectField
          options={typeList}
          label="Types"
          onChange={(types: string[]) => setType(types)}
        />
        <StringSearchField
          value={description}
          sort={sort}
          field={"text"}
          label="Text"
          icon={faBook}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setDescription(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={sources}
          sort={sort}
          field={"sources"}
          label="Sources"
          icon={faLink}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setSources(name);
            setSort(sort);
          }}
        />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />

        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchBar>
      </Bar>
      <CreateButton onClick={() => createNewGear()}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </CreateButton>
      <ExportButton onClick={() => exportFiltered()}>
        <FontAwesomeIcon icon={faFileExport} />
      </ExportButton>
    </>
  );
};

export default GearSearchBar;
