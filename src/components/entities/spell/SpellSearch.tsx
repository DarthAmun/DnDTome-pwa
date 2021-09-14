import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Filter from "../../../data/Filter";
import ReactDOM from "react-dom";
import Spell from "../../../data/Spell";
import {
  AutoComplete,
  Button,
  Checkbox,
  Drawer,
  Input,
  InputGroup,
  TagPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import styled from "styled-components";
import { getPathVariable } from "../../../services/LocationPathService";

interface $SearchProps {
  entities: Spell[];
  showSearchBar: boolean;
  openSearchBar: (value: boolean) => void;
  doSearch: (filters: Filter[]) => void;
}

const SpellSearch = ({ entities, showSearchBar, openSearchBar, doSearch }: $SearchProps) => {
  let history = useHistory();
  let location = useLocation();
  const [filters, setFilters] = useState<Filter[]>([]);

  const [name, setName] = useState<string>("");
  const [school, setSchool] = useState<string[]>([]);
  const [schoolList, setSchoolList] = useState<{ value: string; label: string }[]>([]);
  const [level, setLevel] = useState<number[]>([]);
  const [levelList, setLevelList] = useState<{ value: number; label: string }[]>([]);
  const [ritual, setRitual] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  const [timeList, setTimeList] = useState<{ value: string; label: string }[]>([]);
  const [range, setRange] = useState<string>("");
  const [rangeList, setRangeList] = useState<{ value: string; label: string }[]>([]);
  const [duration, setDuration] = useState<string>("");
  const [durationList, setDurationList] = useState<{ value: string; label: string }[]>([]);
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
    doSearch(filters);
  }, [filters]);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters.replace("filter=", ""));
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        switch (filter.fieldName) {
          case "name":
            setName(filter.value as string);
            break;
          case "time":
            setTime(filter.value as string);
            break;
          case "range":
            setRange(filter.value as string);
            break;
          case "duration":
            setDuration(filter.value as string);
            break;
          case "components":
            setComponents(filter.value as string);
            break;
          case "text":
            setText(filter.value as string);
            break;
          case "classes":
            setClasses(filter.value as string);
            break;
          case "sources":
            setSources(filter.value as string);
            break;
          case "school":
            setSchool(filter.value as string[]);
            break;
          case "level":
            setLevel(filter.value as number[]);
            break;
          case "ritual":
            setRitual(filter.value as boolean);
            break;
        }
      });
      setFilters(oldFilters);
    }
  }, []);

  useEffect(() => {
    const newSchoolList: string[] = [
      ...Array.from(new Set(entities.map((spell: Spell) => spell.school))),
    ].sort();
    const newTimeList: string[] = [
      ...Array.from(new Set(entities.map((spell: Spell) => spell.time))),
    ].sort();
    const newRangeList: string[] = [
      ...Array.from(new Set(entities.map((spell: Spell) => spell.range))),
    ].sort();
    const newDurationList: string[] = [
      ...Array.from(new Set(entities.map((spell: Spell) => spell.duration))),
    ].sort();
    const newLevelList: number[] = [
      ...Array.from(new Set(entities.map((spell: Spell) => spell.level))),
    ].sort((l1, l2) => l1 - l2);
    setSchoolList(
      newSchoolList.map((text: string) => {
        return { value: text, label: text };
      })
    );
    setTimeList(
      newTimeList.map((text: string) => {
        return { value: text, label: text };
      })
    );
    setRangeList(
      newRangeList.map((text: string) => {
        return { value: text, label: text };
      })
    );
    setDurationList(
      newDurationList.map((text: string) => {
        return { value: text, label: text };
      })
    );
    setLevelList(
      newLevelList.map((level: number) => {
        return { value: level, label: String(level) };
      })
    );
  }, [entities]);

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
      newFilters = [...newFilters, new Filter("ritual", true)];
    }

    newFilters = newFilters.map((filter: Filter) => {
      if (sort.name === filter.fieldName) {
        return { ...filter, sort: sort.sort };
      }
      return filter;
    });
    if (newFilters.length > 0) {
      if (location.search !== "") {
        let step: string = "";
        const locationParts: string[] = location.search.substring(1).split("&");
        locationParts.forEach((part: string) => {
          if (part.includes("step")) step = part;
        });
        history.push({
          pathname: "/spell-overview",
          search: `?filter=${JSON.stringify(newFilters)}&${step !== "" ? `${step}&` : ""}page=1`,
        });
      } else {
        history.push({
          pathname: "/spell-overview",
          search: `?filter=${JSON.stringify(newFilters)}`,
        });
      }
      setFilters(newFilters);
    }
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setLevel([]);
      setSchool([]);
      setRitual(false);
      setTime("");
      setRange("");
      setDuration("");
      setComponents("");
      setText("");
      setClasses("");
      setSources("");
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    setFilters([]);
    history.push(`/spell-overview`);
  };

  return (
    <Drawer show={showSearchBar} onHide={() => openSearchBar(false)} placement={"top"}>
      <Drawer.Header>
        <Drawer.Title>Search</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <SearchWrapper>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the spell's name</Tooltip>}
          >
            <InputGroup style={{ width: "200px" }}>
              <InputGroup.Addon>Name</InputGroup.Addon>
              <Input value={name} onChange={setName} />
            </InputGroup>
          </Whisper>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>One or more schools</Tooltip>}
          >
            <TagPicker
              placeholder="Select school"
              data={schoolList}
              value={school}
              onChange={setSchool}
              style={{ width: "max-content", minWidth: "200px" }}
            />
          </Whisper>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>One or more levels</Tooltip>}
          >
            <TagPicker
              placeholder="Select level"
              data={levelList}
              value={level}
              onChange={setLevel}
              style={{ width: "max-content", minWidth: "200px" }}
            />
          </Whisper>
          <Checkbox checked={ritual} onCheckboxClick={() => setRitual((r) => !r)}>
            Ritual
          </Checkbox>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the spell's casting times</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Time</InputGroup.Addon>
              <AutoComplete
                placeholder="Select casting time"
                data={timeList}
                value={time}
                onChange={setTime}
                style={{ width: "max-content", minWidth: "200px" }}
              />
            </InputGroup>
          </Whisper>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the spell's range</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Range</InputGroup.Addon>
              <AutoComplete
                placeholder="Select range"
                data={rangeList}
                value={range}
                onChange={setRange}
                style={{ width: "max-content", minWidth: "200px" }}
              />
            </InputGroup>
          </Whisper>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the spell's duration</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Duration</InputGroup.Addon>
              <AutoComplete
                placeholder="Select duration"
                data={durationList}
                value={duration}
                onChange={setDuration}
                style={{ width: "max-content", minWidth: "200px" }}
              />
            </InputGroup>
          </Whisper>
          {/*
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
        /> */}
        </SearchWrapper>
      </Drawer.Body>
      <Drawer.Footer>
        <Button
          onClick={() => {
            search();
            openSearchBar(false);
          }}
          appearance="primary"
        >
          Search
        </Button>
        <Button
          onClick={() => {
            reset();
            openSearchBar(false);
          }}
          appearance="ghost"
        >
          Reset
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
};

export default SpellSearch;

const SearchWrapper = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
`;
