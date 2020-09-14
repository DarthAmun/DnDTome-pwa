import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Filter from "../../../Data/Filter";
import ReactDOM from "react-dom";
import { reciveAttributeSelection, createNewWithId } from "../../../Services/DatabaseService";

import {
  faLink,
  faSearch,
  faRedoAlt,
  faCoins,
  faWeightHanging,
  faCrosshairs,
  faBook,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../FormElements/MultipleSelectField";
import StringField from "../../FormElements/StringField";
import IconButton from "../../FormElements/IconButton";
import Gear from "../../../Data/Gear";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const GearSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [type, setType] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>(
    []
  );
  const [properties, setProperties] = useState<string>("");
  const [damage, setDamage] = useState<string>("");
  const [sources, setSources] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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

  return (
    <Bar open={open}>
      <StringField
        value={name}
        label="Name"
        onChange={(name: string) => setName(name)}
      />
      <StringField
        value={cost}
        label="Cost"
        icon={faCoins}
        onChange={(cost) => setCost(cost)}
      />
      <StringField
        value={weight}
        label="Weight"
        icon={faWeightHanging}
        onChange={(weight) => setWeight(weight)}
      />
      <StringField
        value={damage}
        label="Damage"
        icon={faCrosshairs}
        onChange={(damage) => setDamage(damage)}
      />
      <StringField
        value={properties}
        label="Properties"
        onChange={(properties) => setProperties(properties)}
      />
      <MultipleSelectField
        options={typeList}
        label="Types"
        onChange={(types: string[]) => setType(types)}
      />
      <StringField
        value={description}
        label="Text"
        icon={faBook}
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
      <CreateButton onClick={() => createNewGear()}>
        <FontAwesomeIcon icon={faPlusCircle} /> Add Gear
      </CreateButton>
    </Bar>
  );
};

export default GearSearchBar;

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
