import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import Campaign from "../../../data/campaign/Campaign";
import Filter from "../../../data/Filter";
import { createNewWithId, exportFilteredFromTable } from "../../../services/DatabaseService";

import { faSearch, faRedoAlt, faPlusCircle, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../form_elements/IconButton";
import StringField from "../../form_elements/StringField";
import { Bar, SearchBar, CreateButton, ExportButton, LeftTooltip } from "../../SearchbarStyle";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const CampaignSearchBar = ({ onSend }: $Props) => {
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
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setOpen(false);
    });
    onSend([]);
  };

  const createNewCampaign = () => {
    let newCampaign = new Campaign();
    delete newCampaign.id;
    createNewWithId("campaigns", newCampaign, (id) => {
      history.push(`/campaign-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("campaigns", filters, "DnDTome_filtered_campaigns.json");
  };

  return (
    <>
      <Bar open={open}>
        <StringField value={name} label="Name" onChange={(name: string) => setName(name)} />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />

        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchBar>
      </Bar>
      <CreateButton onClick={() => createNewCampaign()}>
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

export default CampaignSearchBar;
