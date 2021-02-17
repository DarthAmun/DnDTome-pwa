import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import World from "../../../data/world/World";
import Filter from "../../../data/Filter";
import { createNewWithId, exportFilteredFromTable } from "../../../services/DatabaseService";

import { faSearch, faRedoAlt, faPlusCircle, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../form_elements/IconButton";
import StringField from "../../form_elements/StringField";
import { FixedBar, SearchBar, CreateButton, ExportButton, LeftTooltip } from "../../SearchbarStyle";

const WorldSearchBar = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  let history = useHistory();

  const [name, setName] = useState<string>("");

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    setFilters(newFilters);
    setOpen(false);
    history.push(`/world-overview?filter=${JSON.stringify(newFilters)}`);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setOpen(false);
    });
    history.push(`/world-overview}`);
  };

  const createNewWorld = () => {
    let newWorld = new World();
    delete newWorld.id;
    createNewWithId("worlds", newWorld, (id) => {
      history.push(`/world-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("worlds", filters, "DnDTome_filtered_worlds.json");
  };

  return (
    <>
      <FixedBar open={open}>
        <StringField value={name} label="Name" onChange={(name: string) => setName(name)} />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />

        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchBar>
      </FixedBar>
      <CreateButton onClick={() => createNewWorld()}>
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

export default WorldSearchBar;
