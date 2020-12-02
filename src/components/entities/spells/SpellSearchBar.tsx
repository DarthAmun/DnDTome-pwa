import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Filter from "../../../data/Filter";
import ReactDOM from "react-dom";
import { reciveAttributeSelection, createNewWithId } from "../../../services/DatabaseService";

import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
  faBookOpen,
  faSearch,
  faRedoAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../form_elements/MultipleSelectField";
import StringSearchField from "../../form_elements/StringSearchField";
import CheckField from "../../form_elements/CheckField";
import IconButton from "../../form_elements/IconButton";
import Spell from "../../../data/Spell";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const SpellSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [school, setSchool] = useState<string[]>([]);
  const [schoolList, setSchoolList] = useState<{ value: string; label: string }[]>([]);
  const [level, setLevel] = useState<number[]>([]);
  const [levelList, setLevelList] = useState<{ value: string; label: string }[]>([]);
  const [ritual, setRitual] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [range, setRange] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [components, setComponents] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [classes, setClasses] = useState<string>("");
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

  useEffect(() => {
    reciveAttributeSelection("spells", "school", function (result) {
      let schools = result.map((school) => {
        if (school === "") {
          return { value: school.toString(), label: "Empty" };
        }
        return { value: school.toString(), label: school.toString() };
      });
      setSchoolList(schools);
    });
    reciveAttributeSelection("spells", "level", function (result) {
      let levels = result.map((level) => {
        if (level === "") {
          return { value: level.toString(), label: "Empty" };
        }
        return { value: level.toString(), label: level.toString() };
      });
      setLevelList(levels);
    });
  }, []);

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (time !== "") {
      newFilters = [...newFilters, new Filter("time", time)];
    }
    if (range !== "") {
      newFilters = [...newFilters, new Filter("range", range)];
    }
    if (duration !== "") {
      newFilters = [...newFilters, new Filter("duration", duration)];
    }
    if (components !== "") {
      newFilters = [...newFilters, new Filter("components", components)];
    }
    if (text !== "") {
      newFilters = [...newFilters, new Filter("text", text)];
    }
    if (classes !== "") {
      newFilters = [...newFilters, new Filter("classes", classes)];
    }
    if (sources !== "") {
      newFilters = [...newFilters, new Filter("sources", sources)];
    }
    if (school.length !== 0) {
      newFilters = [...newFilters, new Filter("school", school)];
    }
    if (level.length !== 0) {
      newFilters = [...newFilters, new Filter("level", level)];
    }
    if (ritual) {
      newFilters = [...newFilters, new Filter("ritual", ritual)];
    }

    newFilters = newFilters.map((filter: Filter) => {
      if (sort.name === filter.fieldName) {
        return { ...filter, sort: sort.sort };
      }
      return filter;
    });

    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setLevel([]);
      setSchool([]);
      setRitual(0);
      setTime("");
      setRange("");
      setDuration("");
      setComponents("");
      setText("");
      setClasses("");
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

  const createNewSpell = () => {
    let newSpell = new Spell();
    delete newSpell.id;
    createNewWithId("spells", newSpell, (id) => {
      history.push(`/spell-detail/id/${id}`);
    });
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
          options={schoolList}
          label="School"
          onChange={(schools: string[]) => setSchool(schools)}
        />
        <FieldGroup>
          <MultipleSelectField
            options={levelList}
            label="Level"
            onChange={(levels: string[]) =>
              setLevel(
                levels.map((level) => {
                  return +level;
                })
              )
            }
          />
          <CheckField
            value={!!ritual}
            label="Ritual"
            onChange={(ritual) => setRitual(ritual ? 1 : 0)}
          />
        </FieldGroup>
        <StringSearchField
          value={time}
          sort={sort}
          field={"time"}
          label="Time"
          icon={faHistory}
          onChange={(time: string, sort: { name: string; label: string; sort: number }) => {
            setTime(time);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={range}
          sort={sort}
          field={"range"}
          label="Range"
          icon={faPowerOff}
          transform={{ rotate: 42 }}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setRange(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={duration}
          sort={sort}
          field={"duration"}
          label="Duration"
          icon={faHourglassHalf}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setDuration(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={components}
          sort={sort}
          field={"components"}
          label="Comp."
          icon={faMortarPestle}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setComponents(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={classes}
          sort={sort}
          field={"classes"}
          label="Classes"
          icon={faUser}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setClasses(name);
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
        <StringSearchField
          value={text}
          sort={sort}
          field={"text"}
          label="Text"
          icon={faBookOpen}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setText(name);
            setSort(sort);
          }}
        />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />
        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} rotation={90} />
        </SearchBar>
      </Bar>
      <CreateButton onClick={() => createNewSpell()}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </CreateButton>
    </>
  );
};

export default SpellSearchBar;

type SearchMode = {
  open?: boolean;
};

const Bar = styled.div<SearchMode>`
  position: absolute;
  top: 40px;
  left: 55px;
  z-index: 900;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};

  height: auto;
  min-height: 30px;
  min-width: calc(100% - 75px);
  padding: 20px 10px 10px 10px;
  background: ${({ theme }) => theme.main.backgroundColor};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  flex: 1 1;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;

  @media (max-width: 576px) {
    min-width: calc(100% - 20px);
    left: 0px;
  }
`;

const SearchBar = styled.div<SearchMode>`
  position: absolute;
  bottom: -35px;
  left: calc(50% - 50px);

  height: 40px;
  width: 40px;
  transform: rotate(45deg);
  color: ${({ theme }) => theme.buttons.color};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  text-align: center;
  line-height: 40px;

  @media (max-width: 576px) {
    left: calc(50% - 20px);
  }

  svg {
    transform: rotate(-45deg);
  }
`;

const CreateButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  top: auto;

  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  color: ${({ theme }) => theme.buttons.color};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  border: none;
  padding 10px;
  box-sizing:content-box;
  line-height: 20px;
  cursor: pointer;

  width: 30px;
  height: 30px;
  border-radius: 40px;
  text-decoration: none;
`;

const FieldGroup = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;
