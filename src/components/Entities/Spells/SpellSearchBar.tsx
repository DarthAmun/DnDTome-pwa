import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Filter from "../../../Data/Filter";
import ReactDOM from "react-dom";
import {
  reciveAttributeSelection,
  createNewWithId,
} from "../../../Services/DatabaseService";

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
import MultipleSelectField from "../../FormElements/MultipleSelectField";
import StringSearchField from "../../FormElements/StringSearchField";
import CheckField from "../../FormElements/CheckField";
import IconButton from "../../FormElements/IconButton";
import Spell from "../../../Data/Spell";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const SpellSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [school, setSchool] = useState<string[]>([]);
  const [schoolList, setSchoolList] = useState<
    { value: string; label: string }[]
  >([]);
  const [level, setLevel] = useState<number[]>([]);
  const [levelList, setLevelList] = useState<
    { value: string; label: string }[]
  >([]);
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
    <Bar open={open}>
      <StringSearchField
        value={name}
        sort={sort}
        field={"name"}
        label="Name"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
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
        onChange={(
          time: string,
          sort: { name: string; label: string; sort: number }
        ) => {
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
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
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
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
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
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
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
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
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
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
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
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setText(name);
          setSort(sort);
        }}
      />
      <IconButton onClick={() => search()} icon={faSearch} />
      <IconButton onClick={() => reset()} icon={faRedoAlt} />

      <SearchBarButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </SearchBarButton>
      <CreateButton onClick={() => createNewSpell()}>
        <FontAwesomeIcon icon={faPlusCircle} /> Add Spell
      </CreateButton>
    </Bar>
  );
};

export default SpellSearchBar;

type SearchMode = {
  open?: boolean;
};

const Bar = styled.div<SearchMode>`
  position: absolute;
  top: 50px;
  left: 90px;
  z-index: 900;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};

  height: auto;
  min-height: 30px;
  min-width: calc(100% - 110px);
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

const FieldGroup = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;
