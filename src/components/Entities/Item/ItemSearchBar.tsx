import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../Data/Filter";
import ReactDOM from "react-dom";
import { reciveAttributeSelection } from "../../../Database/DbService";

import { faLink, faSearch, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../FormElements/MultipleSelectField";
import StringField from "../../FormElements/StringField";
import IconButton from "../../FormElements/IconButton";
import CheckField from "../../FormElements/CheckField";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const ItemSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>(
    []
  );
  const [rarity, setRarity] = useState<string[]>([]);
  const [rarityList, setRarityList] = useState<{ value: string; label: string }[]>(
    []
  );
  const [base, setBase] = useState<string[]>([]);
  const [baseList, setBaseList] = useState<{ value: string; label: string }[]>(
    []
  );
  const [attunment, setAttunment] = useState<number>(0);
  const [sources, setSources] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
    });
    onSend([]);
  };

  return (
    <Bar open={open}>
      <StringField
        value={name}
        label="Name"
        onChange={(name: string) => setName(name)}
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
      <StringField
        value={description}
        label="Text"
        icon={faLink}
        onChange={(description) => setDescription(description)}
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
    </Bar>
  );
};

export default ItemSearchBar;

type SearchMode = {
  open?: boolean;
};

const Bar = styled.div<SearchMode>`
  position: absolute;
  top: 4rem;
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
  left: calc(50% - 50px);

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
