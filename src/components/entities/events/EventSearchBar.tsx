import React, { useState } from "react";
import { useHistory } from "react-router";
import Filter from "../../../data/Filter";
import ReactDOM from "react-dom";
import { createNewWithId, exportFilteredFromTable } from "../../../services/DatabaseService";

import { faSearch, faRedoAlt, faPlusCircle, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSearchField from "../../form_elements/StringSearchField";
import IconButton from "../../form_elements/IconButton";
import Event from "../../../data/world/Event";
import { FixedBar, SearchBar, CreateButton, ExportButton, LeftTooltip } from "../../SearchbarStyle";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const EventSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

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
    if (date !== "") {
      newFilters = [...newFilters, new Filter("date", date)];
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
      setDate("");
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    onSend([]);
  };

  const createNewEvent = () => {
    let newEvent = new Event();
    delete newEvent.id;
    createNewWithId("events", newEvent, (id) => {
      history.push(`/event-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("events", filters, "DnDTome_filtered_events.json");
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
        <StringSearchField
          value={date}
          sort={sort}
          field={"date"}
          label="Date"
          onChange={(date: string, sort: { name: string; label: string; sort: number }) => {
            setDate(date);
            setSort(sort);
          }}
        />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />
        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} rotation={90} />
        </SearchBar>
      </FixedBar>
      <CreateButton onClick={() => createNewEvent()}>
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

export default EventSearchBar;
