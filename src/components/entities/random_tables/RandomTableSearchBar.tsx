import { faFileExport, faPlusCircle, faRedoAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import Filter from "../../../data/Filter";
import RandomTable from "../../../data/RandomTable";
import { createNewWithId, exportFilteredFromTable } from "../../../services/DatabaseService";
import IconButton from "../../form_elements/IconButton";
import StringSearchField from "../../form_elements/StringSearchField";
import { CreateButton, ExportButton, FixedBar, LeftTooltip, SearchBar } from "../../SearchbarStyle";

const RandomTableSearchBar = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  let history = useHistory();

  const [name, setName] = useState<string>("");

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

    newFilters = newFilters.map((filter: Filter) => {
      if (sort.name === filter.fieldName) {
        return { ...filter, sort: sort.sort };
      }
      return filter;
    });

    setFilters(newFilters);
    setOpen(false);
    history.push(`/randomTable-overview?filter=${JSON.stringify(newFilters)}`);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    history.push(`/randomTable-overview}`);
  };

  const createNewRandomTable = () => {
    let newRandomTable = new RandomTable(0, "New");
    delete newRandomTable.id;
    createNewWithId("randomTables", newRandomTable, (id) => {
      history.push(`/randomTable-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("randomTables", filters, "DnDTome_filtered_randomTables.json");
  };

  return (
    <>
      <FixedBar open={open}>
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

        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />

        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchBar>
      </FixedBar>
      <CreateButton onClick={() => createNewRandomTable()}>
        <FontAwesomeIcon icon={faPlusCircle} />
        <LeftTooltip>Add new</LeftTooltip>
      </CreateButton>
      <ExportButton onClick={() => exportFiltered()}>
        <FontAwesomeIcon icon={faFileExport} />
        <LeftTooltip>Export filtered</LeftTooltip>
      </ExportButton>
    </>
  );
};

export default RandomTableSearchBar;
