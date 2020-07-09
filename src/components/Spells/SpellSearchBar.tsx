import React, { useState } from "react";
import styled from "styled-components";
import Filter from "../../Data/Filter";
import ReactDOM from "react-dom";
import StringField from "../FormElements/StringField";
import NumberField from "../FormElements/NumberField";
import CheckField from "../FormElements/CheckField";

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
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../FormElements/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const SpellSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [level, setLevel] = useState<number>(-1);
  const [ritual, setRitual] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [range, setRange] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [components, setComponents] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [classes, setClasses] = useState<string>("");
  const [sources, setSources] = useState<string>("");

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (school !== "") {
      newFilters = [...newFilters, new Filter("school", school)];
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
    if (level !== -1) {
      newFilters = [...newFilters, new Filter("level", level)];
    }
    if (ritual) {
      newFilters = [...newFilters, new Filter("ritual", ritual)];
    }
    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setLevel(-1);
      setSchool("");
      setRitual(0);
      setTime("");
      setRange("");
      setDuration("");
      setComponents("");
      setText("");
      setClasses("");
      setSources("");
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
      <StringField
        value={school}
        label="School"
        onChange={(school: string) => setSchool(school)}
      />
      <FieldGroup>
        <NumberField
          value={level}
          label="Level"
          onChange={(level: number) => setLevel(level)}
        />
        <CheckField
          value={!!ritual}
          label="Ritual"
          onChange={(ritual) => setRitual(ritual ? 1 : 0)}
        />
      </FieldGroup>
      <StringField
        value={time}
        label="Time"
        icon={faHistory}
        onChange={(time) => setTime(time)}
      />
      <StringField
        value={range}
        label="Range"
        icon={faPowerOff}
        transform={{ rotate: 42 }}
        onChange={(range) => setRange(range)}
      />
      <StringField
        value={duration}
        label="Duration"
        icon={faHourglassHalf}
        onChange={(duration) => setDuration(duration)}
      />
      <StringField
        value={components}
        label="Comp."
        icon={faMortarPestle}
        onChange={(components) => setComponents(components)}
      />
      <StringField
        value={classes}
        label="Classes"
        icon={faUser}
        onChange={(classes) => setClasses(classes)}
      />
      <StringField
        value={sources}
        label="Sources"
        icon={faLink}
        onChange={(sources) => setSources(sources)}
      />
      <StringField
        value={text}
        label="Text"
        icon={faBookOpen}
        onChange={(text) => setText(text)}
      />
      <IconButton onClick={() => search()} icon={faSearch} />
      <IconButton onClick={() => reset()} icon={faRedoAlt} />

      <SearchBarButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} /> Search
        </SearchBarButton>
    </Bar>
  );
};

export default SpellSearchBar;

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

const FieldGroup = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;
