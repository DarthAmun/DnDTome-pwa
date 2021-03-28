import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import Encounter from "../../../data/encounter/Encounter";
import Filter from "../../../data/Filter";
import { createNewWithId, exportFilteredFromTable } from "../../../services/DatabaseService";

import { faSearch, faRedoAlt, faPlusCircle, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../form_elements/IconButton";
import StringField from "../../form_elements/StringField";
import {
  FixedBar,
  SearchBar,
  CreateButton,
  ExportButton,
  LeftTooltip,
  JoinButton,
} from "../../SearchbarStyle";
import { MdGroupAdd } from "react-icons/md";

const EncounterSearchBar = () => {
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
    history.push(`/encounter-overview?filter=${JSON.stringify(newFilters)}`);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setOpen(false);
    });
    history.push(`/encounter-overview}`);
  };

  const createNewEncounter = () => {
    let newEncounter = new Encounter();
    delete newEncounter.id;
    createNewWithId("encounters", newEncounter, (id) => {
      history.push(`/encounter-detail/id/${id}`);
    });
  };

  const joinRoom = () => {
    history.push(`/encounter-room`);
  };

  const exportFiltered = () => {
    exportFilteredFromTable("encounters", filters, "DnDTome_filtered_encounters.json");
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
      <CreateButton onClick={() => createNewEncounter()}>
        <FontAwesomeIcon icon={faPlusCircle} />
        <LeftTooltip>Add new</LeftTooltip>
      </CreateButton>
      <ExportButton onClick={() => exportFiltered()}>
        <FontAwesomeIcon icon={faFileExport} />
        <LeftTooltip>Export filtered</LeftTooltip>
      </ExportButton>
      <JoinButton onClick={() => joinRoom()}>
        <MdGroupAdd />
        <LeftTooltip>Join Encounter</LeftTooltip>
      </JoinButton>
    </>
  );
};

export default EncounterSearchBar;
