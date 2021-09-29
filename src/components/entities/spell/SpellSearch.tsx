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
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { IndexableType } from "dexie";
import { reciveAttributeSelection } from "../../../services/DatabaseService";

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
  const [description, setDescription] = useState<string>("");
  const [classes, setClasses] = useState<string[]>([]);
  const [classList, setClassList] = useState<{ value: string; label: string }[]>([]);
  const [sources, setSources] = useState<string>("");
  const [sourcesList, setSourcesList] = useState<{ value: string; label: string }[]>([]);

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
    const oldFilterString: string = unescape(filters);
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
          case "description":
            setDescription(filter.value as string);
            break;
          case "classes":
            setClasses(filter.value as string[]);
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
    const newSourcesList: string[] = [
      ...Array.from(new Set(entities.map((spell: Spell) => spell.sources))),
    ].sort();
    const newLevelList: number[] = [
      ...Array.from(new Set(entities.map((spell: Spell) => +spell.level))),
    ].sort((l1, l2) => l1 - l2);
    reciveAttributeSelection("classes", "name", (classes: IndexableType[]) => {
      setClassList(
        classes.map((text: IndexableType) => {
          const newText: string = text as string;
          return { value: newText, label: newText };
        })
      );
    });
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
    setSourcesList(
      newSourcesList.map((text: string) => {
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
    if (description !== "") {
      newFilters = [...newFilters, new Filter("description", description)];
    }
    if (classes.length !== 0) {
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
      setDescription("");
      setClasses([]);
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
    <Drawer open={showSearchBar} onClose={() => openSearchBar(false)} placement={"left"}>
      <Drawer.Header>
        <Drawer.Title>Search</Drawer.Title>
        <Drawer.Actions>
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
        </Drawer.Actions>
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
              <Input value={name} onChange={(val: any) => setName(val)} />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "name")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "name" });
                }}
              >
                {sort.name === "name" ? (
                  <>
                    {sort.sort === 0 ? <>-</> : <></>}
                    {sort.sort === 1 ? <FaLongArrowAltDown /> : <></>}
                    {sort.sort === 2 ? <FaLongArrowAltUp /> : <></>}
                  </>
                ) : (
                  <>-</>
                )}
              </InputGroup.Button>
            </InputGroup>
          </Whisper>
          <TagPicker
            placeholder="Select school"
            data={schoolList}
            trigger={"Enter"}
            value={school}
            onChange={setSchool}
            style={{ width: "max-content", minWidth: "200px" }}
          />
          <TagPicker
            placeholder="Select level"
            data={levelList}
            value={level}
            onChange={(vals: string[]) => setLevel(vals.map((val: string) => +val))}
            style={{ width: "max-content", minWidth: "200px" }}
            trigger={"Enter"}
          />
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
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "time")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "time" });
                }}
              >
                {sort.name === "time" ? (
                  <>
                    {sort.sort === 0 ? <>-</> : <></>}
                    {sort.sort === 1 ? <FaLongArrowAltDown /> : <></>}
                    {sort.sort === 2 ? <FaLongArrowAltUp /> : <></>}
                  </>
                ) : (
                  <>-</>
                )}
              </InputGroup.Button>
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
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "range")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "range" });
                }}
              >
                {sort.name === "range" ? (
                  <>
                    {sort.sort === 0 ? <>-</> : <></>}
                    {sort.sort === 1 ? <FaLongArrowAltDown /> : <></>}
                    {sort.sort === 2 ? <FaLongArrowAltUp /> : <></>}
                  </>
                ) : (
                  <>-</>
                )}
              </InputGroup.Button>
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
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "duration")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "duration" });
                }}
              >
                {sort.name === "duration" ? (
                  <>
                    {sort.sort === 0 ? <>-</> : <></>}
                    {sort.sort === 1 ? <FaLongArrowAltDown /> : <></>}
                    {sort.sort === 2 ? <FaLongArrowAltUp /> : <></>}
                  </>
                ) : (
                  <>-</>
                )}
              </InputGroup.Button>
            </InputGroup>
          </Whisper>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the spell's components</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Components</InputGroup.Addon>
              <Input
                placeholder="Select components"
                value={components}
                onChange={(val: any) => setComponents(val)}
                style={{ width: "max-content", minWidth: "200px" }}
              />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "components")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "components" });
                }}
              >
                {sort.name === "components" ? (
                  <>
                    {sort.sort === 0 ? <>-</> : <></>}
                    {sort.sort === 1 ? <FaLongArrowAltDown /> : <></>}
                    {sort.sort === 2 ? <FaLongArrowAltUp /> : <></>}
                  </>
                ) : (
                  <>-</>
                )}
              </InputGroup.Button>
            </InputGroup>
          </Whisper>
          <TagPicker
            placeholder="Select classes"
            data={classList}
            trigger={"Enter"}
            value={classes}
            onChange={setClasses}
            style={{ width: "max-content", minWidth: "200px" }}
          />
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the spell's sources</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Sources</InputGroup.Addon>
              <AutoComplete
                placeholder="Select sources"
                data={sourcesList}
                value={sources}
                onChange={setSources}
                style={{ width: "max-content", minWidth: "200px" }}
              />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "sources")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "sources" });
                }}
              >
                {sort.name === "sources" ? (
                  <>
                    {sort.sort === 0 ? <>-</> : <></>}
                    {sort.sort === 1 ? <FaLongArrowAltDown /> : <></>}
                    {sort.sort === 2 ? <FaLongArrowAltUp /> : <></>}
                  </>
                ) : (
                  <>-</>
                )}
              </InputGroup.Button>
            </InputGroup>
          </Whisper>
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the spell's description</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Description</InputGroup.Addon>
              <Input
                placeholder="Select description"
                value={description}
                onChange={(val: any) => setDescription(val)}
                style={{ width: "max-content", minWidth: "200px" }}
              />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "description")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "description" });
                }}
              >
                {sort.name === "description" ? (
                  <>
                    {sort.sort === 0 ? <>-</> : <></>}
                    {sort.sort === 1 ? <FaLongArrowAltDown /> : <></>}
                    {sort.sort === 2 ? <FaLongArrowAltUp /> : <></>}
                  </>
                ) : (
                  <>-</>
                )}
              </InputGroup.Button>
            </InputGroup>
          </Whisper>
          {/*
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
