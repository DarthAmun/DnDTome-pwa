import React, { useState } from "react";
import { useHistory } from "react-router";
import Filter from "../../../data/Filter";
import ReactDOM from "react-dom";

import {
  faLink,
  faSearch,
  faRedoAlt,
  faPlusCircle,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../form_elements/IconButton";
import StringSearchField from "../../form_elements/StringSearchField";
import { exportFilteredFromTable } from "../../../services/DatabaseService";
import { Bar, SearchBar, CreateButton, ExportButton } from "../../SearchbarStyle";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const CharSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [sources, setSources] = useState<string>("");

  const [sort, setSort] = useState<{
    name: string;
    label: string;
    sort: number;
  }>({
    name: "",
    label: "",
    sort: 0,
  });

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (sources !== "") {
      newFilters = [...newFilters, new Filter("sources", sources)];
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
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    onSend([]);
  };

  const createNewChar = () => {
    history.push(`/char-lab`);
  };

  const exportFiltered = () => {
    exportFilteredFromTable("chars", filters, "DnDTome_filtered_chars.json");
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
      <CreateButton onClick={() => createNewChar()}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </CreateButton>
      <ExportButton onClick={() => exportFiltered()}>
        <FontAwesomeIcon icon={faFileExport} />
      </ExportButton>
    </>
  );
};

export default CharSearchBar;
