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
import { setOnConnectStop } from "react-flow-renderer/dist/store/actions";

interface $SearchProps {
  entities: Spell[];
  showSearchBar: boolean;
  openSearchBar: (value: boolean) => void;
  doSearch: (filters: Filter[]) => void;
}

const GearSearch = ({ entities, showSearchBar, openSearchBar, doSearch }: $SearchProps) => {
  let history = useHistory();
  let location = useLocation();
  const [filters, setFilters] = useState<Filter[]>([]);

  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [type, setType] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>([]);
  const [properties, setProperties] = useState<string>("");
  const [damage, setDamage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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
          case "cost":
            setCost(filter.value as string);
            break;
          case "weight":
            setWeight(filter.value as string);
            break;
          case "damage":
            setDamage(filter.value as string);
            break;
          case "type":
            setType(filter.value as string[]);
            break;
          case "properties":
            setProperties(filter.value as string);
            break;
          case "description":
            setDescription(filter.value as string);
            break;
          case "sources":
            setSources(filter.value as string);
            break;
        }
      });
      setFilters(oldFilters);
    }
  }, []);

  useEffect(() => {
    reciveAttributeSelection("gears", "type", (types: IndexableType[]) => {
      setTypeList(
        types.map((text: IndexableType) => {
          const newText: string = text as string;
          return { value: newText, label: newText };
        })
      );
    });
  }, [entities]);

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
          pathname: "/gear-overview",
          search: `?filter=${JSON.stringify(newFilters)}&${step !== "" ? `${step}&` : ""}page=1`,
        });
      } else {
        history.push({
          pathname: "/gear-overview",
          search: `?filter=${JSON.stringify(newFilters)}`,
        });
      }
      setFilters(newFilters);
    }
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
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    setFilters([]);
    history.push(`/gear-overview`);
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
          <Whisper
            trigger="focus"
            placement={"top"}
            speaker={<Tooltip>Part of the gear's weight</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Cost</InputGroup.Addon>
              <Input
                placeholder="Select weight"
                value={weight}
                onChange={(val: any) => setDescription(val)}
                style={{ width: "max-content", minWidth: "200px" }}
              />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "weight")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "weight" });
                }}
              >
                {sort.name === "weight" ? (
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
            speaker={<Tooltip>Part of the gear's cost</Tooltip>}
          >
            <InputGroup style={{ width: "max-content" }}>
              <InputGroup.Addon>Cost</InputGroup.Addon>
              <Input
                placeholder="Select cost"
                value={cost}
                onChange={(val: any) => setDescription(val)}
                style={{ width: "max-content", minWidth: "200px" }}
              />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  let newSort = { ...sort };
                  if (newSort.name === "cost")
                    setSort({ ...newSort, sort: (newSort.sort + 1) % 3 });
                  else setSort({ ...newSort, sort: 1, name: "cost" });
                }}
              >
                {sort.name === "cost" ? (
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
            speaker={<Tooltip>Part of the gear's sources</Tooltip>}
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
            speaker={<Tooltip>Part of the gear's description</Tooltip>}
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
        </SearchWrapper>
      </Drawer.Body>
    </Drawer>
  );
};

export default GearSearch;

const SearchWrapper = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
`;
