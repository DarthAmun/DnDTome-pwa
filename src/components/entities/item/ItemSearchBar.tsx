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
  faBook,
  faPlusCircle,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../form_elements/MultipleSelectField";
import IconButton from "../../form_elements/IconButton";
import CheckField from "../../form_elements/CheckField";
import Item from "../../../data/Item";
import StringSearchField from "../../form_elements/StringSearchField";
import { Bar, SearchBar, CreateButton, ExportButton } from "../../SearchbarStyle";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const ItemSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>([]);
  const [rarity, setRarity] = useState<string[]>([]);
  const [rarityList, setRarityList] = useState<{ value: string; label: string }[]>([]);
  const [base, setBase] = useState<string[]>([]);
  const [baseList, setBaseList] = useState<{ value: string; label: string }[]>([]);
  const [attunment, setAttunment] = useState<number>(0);
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
    reciveAttributeSelection("items", "type", function (result) {
      let types = result.map((type) => {
        if (type === "") {
          return { value: type.toString(), label: "Empty" };
        }
        return { value: type.toString(), label: type.toString() };
      });
      setTypeList(types);
    });
    reciveAttributeSelection("items", "rarity", function (result) {
      let rarities = result.map((rarity) => {
        if (rarity === "") {
          return { value: rarity.toString(), label: "Empty" };
        }
        return { value: rarity.toString(), label: rarity.toString() };
      });
      setRarityList(rarities);
    });
    reciveAttributeSelection("items", "base", function (result) {
      let bases = result.map((base) => {
        if (base === "") {
          return { value: base.toString(), label: "Empty" };
        }
        return { value: base.toString(), label: base.toString() };
      });
      setBaseList(bases);
    });
  }, []);

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
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
    if (rarity.length !== 0) {
      newFilters = [...newFilters, new Filter("rarity", rarity)];
    }
    if (base.length !== 0) {
      newFilters = [...newFilters, new Filter("base", base)];
    }
    if (attunment) {
      newFilters = [...newFilters, new Filter("attunment", attunment)];
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
      setSources("");
      setType([]);
      setRarity([]);
      setBase([]);
      setAttunment(0);
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

  const createNewItem = () => {
    let newItem = new Item();
    delete newItem.id;
    createNewWithId("items", newItem, (id) => {
      history.push(`/item-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("items", filters, "DnDTome_filtered_items.json");
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
        <MultipleSelectField
          options={typeList}
          label="Types"
          onChange={(types: string[]) => setType(types)}
        />
        <MultipleSelectField
          options={rarityList}
          label="Rarities"
          onChange={(rarities: string[]) => setRarity(rarities)}
        />
        <MultipleSelectField
          options={baseList}
          label="Bases"
          onChange={(bases: string[]) => setBase(bases)}
        />
        <CheckField
          value={!!attunment}
          label="Attunment"
          onChange={(attunment) => setAttunment(attunment ? 1 : 0)}
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
      <CreateButton onClick={() => createNewItem()}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </CreateButton>
      <ExportButton onClick={() => exportFiltered()}>
        <FontAwesomeIcon icon={faFileExport} />
      </ExportButton>
    </>
  );
};

export default ItemSearchBar;
