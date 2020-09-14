import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Filter from "../../../Data/Filter";
import ReactDOM from "react-dom";

import { faLink, faSearch, faRedoAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringField from "../../FormElements/StringField";
import IconButton from "../../FormElements/IconButton";
import Race from "../../../Data/Races/Race";
import { createNewWithId } from "../../../Services/DatabaseService";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const RaceSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [abilityScores, setAbilityScores] = useState<string>("");
  const [sources, setSources] = useState<string>("");

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (abilityScores !== "") {
      newFilters = [...newFilters, new Filter("abilityScores", abilityScores)];
    }
    if (sources !== "") {
      newFilters = [...newFilters, new Filter("sources", sources)];
    }
    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setAbilityScores("");
      setSources("");
      setOpen(false);
    });
    onSend([]);
  };

  const createNewRace = () => {
    let newRace = new Race();
    delete newRace.id;
    createNewWithId("races", newRace, (id) => {
      history.push(`/race-detail/id/${id}`);
    });
  };

  return (
    <Bar open={open}>
      <StringField
        value={name}
        label="Name"
        onChange={(name: string) => setName(name)}
      />
      <StringField
        value={abilityScores}
        label="Ability Scores"
        onChange={(abilityScores: string) => setAbilityScores(abilityScores)}
      />
      <StringField
        value={sources}
        label="Sources"
        icon={faLink}
        onChange={(sources) => setSources(sources)}
      />
      <IconButton onClick={() => search()} icon={faSearch} />
      <IconButton onClick={() => reset()} icon={faRedoAlt} />

      <SearchBarButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </SearchBarButton>
      <CreateButton onClick={() => createNewRace()}>
        <FontAwesomeIcon icon={faPlusCircle} /> Add Race
      </CreateButton>
    </Bar>
  );
};

export default RaceSearchBar;

type SearchMode = {
  open?: boolean;
};

const Bar = styled.div<SearchMode>`
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 900;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};

  height: auto;
  min-height: 30px;
  min-width: calc(100% - 20px);
  padding: 10px;
  background: ${({ theme }) => theme.main.backgroundColor};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  flex: 1 1;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const SearchBarButton = styled.button`
  position: absolute;
  bottom: -50px;
  left: calc(50% - 130px);

  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  color: ${({ theme }) => theme.buttons.color};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  border: none;
  border-radius: 5px;
  padding 10px;
  box-sizing:content-box;
  width: 80px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
`;

const CreateButton = styled(SearchBarButton)`
  left: 50%;
  width: 90px;
  text-decoration: none;
`;

