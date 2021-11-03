import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Filter from "../../data/Filter";
import styled from "styled-components";
import { Drawer, Button } from "rsuite";
import {
  CompletableString,
  CreatableSetNumber,
  CreatableSetString,
  SearchableString,
  SetEntity,
  SetString,
  SwitchBoolean,
} from "../../data/Datatypes";
import { getPathVariable } from "../../services/LocationPathService";
import SearchableStringField from "./searchFields/SearchableStringField";
import SetStringField from "./searchFields/SetStringField";
import CreatableSetStringField from "./searchFields/CreatableSetStringField";
import CompletableStringField from "./searchFields/CompletableStringField";
import SwitchBooleanField from "./searchFields/SwitchBooleanField";
import CreatableSetNumberField from "./searchFields/CreatableSetNumberField";
import SetEntityField from "./searchFields/SetEntityField";

interface $SearchProps {
  Entity: any;
  entityName: string;
  entities: any[];
  filters: Filter[];
  showSearchBar: boolean;
  openSearchBar: (value: boolean) => void;
  doSearch: (filters: Filter[]) => void;
}

const EntitySearch = ({
  Entity,
  entityName,
  entities,
  filters: mainFilters,
  showSearchBar,
  openSearchBar,
  doSearch,
}: $SearchProps) => {
  let history = useHistory();
  let location = useLocation();
  const [oldFilters, setOldFilters] = useState<Filter[]>(mainFilters);
  const [filters, setFilters] = useState<Filter[]>([]);

  const applyFilterChange = (filter: Filter, type: any) => {
    setFilters((newFilters: Filter[]) => {
      if (newFilters.filter((f) => f.fieldName === type).length === 1)
        newFilters = newFilters.map((f) => (f.fieldName === type ? filter : f));
      else newFilters = [...newFilters, filter];
      return newFilters;
    });
  };

  useEffect(() => {
    doSearch(oldFilters);
  }, [oldFilters]);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const newOldFilters: Filter[] = JSON.parse(oldFilterString);
      setOldFilters(newOldFilters);
    }
  }, []);

  const search = () => {
    let newFilters: Filter[] = [...filters];
    if (newFilters.length > 0) {
      if (location.search !== "") {
        let step: string = "";
        const locationParts: string[] = location.search.substring(1).split("&");
        locationParts.forEach((part: string) => {
          if (part.includes("step")) step = part;
        });
        history.push({
          pathname: `/${entityName}-overview`,
          search: `?filter=${JSON.stringify(newFilters)}&${step !== "" ? `${step}&` : ""}page=1`,
        });
      } else {
        history.push({
          pathname: `/${entityName}-overview`,
          search: `?filter=${JSON.stringify(newFilters)}`,
        });
      }
    }
    doSearch(newFilters);
  };

  const reset = () => {
    setFilters([]);
    setOldFilters([]);
    let step: string = "";
    const locationParts: string[] = location.search.substring(1).split("&");
    locationParts.forEach((part: string) => {
      if (part.includes("step")) step = part;
    });
    history.push({
      pathname: `/${entityName}-overview`,
      search: `?${step !== "" ? `${step}&` : ""}page=1`,
    });
  };

  const type: any = new Entity().getConfig();

  return (
    <Drawer open={showSearchBar} onClose={() => openSearchBar(false)} placement={"top"}>
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
          {Object.getOwnPropertyNames(type).map((keyName: any, index: number) => {
            switch (true) {
              case type[keyName] instanceof SearchableString:
                return (
                  <SearchableStringField
                    key={index}
                    entityName={Entity.name}
                    type={keyName}
                    applyFilter={applyFilterChange}
                  />
                );
              case type[keyName] instanceof SetString:
                return (
                  <SetStringField
                    key={index}
                    entityName={entityName}
                    type={keyName}
                    applyFilter={applyFilterChange}
                  />
                );
              case type[keyName] instanceof SetEntity:
                return (
                  <SetEntityField
                    key={index}
                    entityName={entityName}
                    type={keyName}
                    applyFilter={applyFilterChange}
                  />
                );
              case type[keyName] instanceof CreatableSetString:
                return (
                  <CreatableSetStringField
                    key={index}
                    Entity={Entity}
                    entities={entities}
                    type={keyName}
                    applyFilter={applyFilterChange}
                  />
                );
              case type[keyName] instanceof CompletableString:
                return (
                  <CompletableStringField
                    key={index}
                    Entity={Entity}
                    entities={entities}
                    entityName={Entity.name}
                    type={keyName}
                    applyFilter={applyFilterChange}
                  />
                );
              case type[keyName] instanceof SwitchBoolean:
                return (
                  <SwitchBooleanField key={index} type={keyName} applyFilter={applyFilterChange} />
                );
              case type[keyName] instanceof CreatableSetNumber:
                return (
                  <CreatableSetNumberField
                    key={index}
                    Entity={Entity}
                    entities={entities}
                    type={keyName}
                    applyFilter={applyFilterChange}
                  />
                );
              default:
                return <></>;
            }
          })}
        </SearchWrapper>
      </Drawer.Body>
    </Drawer>
  );
};

export default EntitySearch;

const SearchWrapper = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
`;
