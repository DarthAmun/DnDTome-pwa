import React, { useState } from "react";
import styled from "styled-components";
import Filter from "../../Data/Filter";
import ReactDOM from "react-dom";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const SpellSearchBar = ({ onSend }: $Props) => {
  const [name, setName] = useState<string>("");
  // const [school, setSchool] = useState<string[]>([]);
  // const [schoolList, setSchoolList] = useState<string[]>([]);
  const [level, setLevel] = useState<number>(-1);
  // const [levelList, setLevelList] = useState<number[]>([]);
  // const [ritual, setRitual] = useState<boolean>(false);
  // const [time, setTime] = useState<string>("");
  // const [range, setRange] = useState<string>("");
  // const [duration, setDuration] = useState<string>("");
  // const [components, setComponents] = useState<string>("");
  // const [text, setText] = useState<string>("");
  // const [classes, setClasses] = useState<string>("");
  // const [sources, setSources] = useState<string>("");

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (level !== -1) {
      newFilters = [...newFilters, new Filter("level", level)];
    }
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setLevel(-1);
    });
    onSend([]);
  };

  return (
    <Bar>
      <input
        type="text"
        name={name}
        placeholder="Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        name={level + ""}
        value={level}
        onChange={(e) => setLevel(+e.target.value)}
      />
      <button onClick={() => search()}>Search</button>
      <button onClick={() => reset()}>Reset</button>
    </Bar>
  );
};

export default SpellSearchBar;

const Bar = styled.div`
  height: auto;
  min-height: 30px;
  min-width: 100%;
  flex: 1 1;

  display: flex;
`;
