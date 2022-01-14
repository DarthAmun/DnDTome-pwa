import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, ButtonGroup, InputNumber, Loader, Pagination, Tag, TagGroup } from "rsuite";
import { reciveAll, reciveAllFiltered } from "../../services/DatabaseService";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { getPathVariable } from "../../services/LocationPathService";
import { TopBar } from "./details/EntityDetail";
import EntitySearch from "./EntitySearch";
import Filter from "../../data/Filter";
import BreadCrumbIcon from "../general/BreadCrumbIcon";

interface $OverviewProps {
  entityName: string;
  Tile: any;
  Entity: any;
}

const EntityOverview = ({ entityName, Entity, Tile }: $OverviewProps) => {
  let history = useHistory();
  let location = useLocation();
  const [allEntitysFromType, setAllEntitys] = useState<typeof Entity[]>([]);
  const [entities, setEntities] = useState<typeof Entity[]>([]);
  const [pageEntities, setPageEntities] = useState<typeof Entity[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const [activePage, setActivePage] = useState<number>(1);
  const [pageAmount, setPageAmount] = useState<number>(1);
  const [step, setStep] = useState<number>(10);

  const [showSearchBar, openSearchBar] = useState<boolean>(false);
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    if (entityName !== "")
      reciveAll(entityName + "s", (results: any[]) => {
        setAllEntitys(results);
      });
  }, [entityName]);

  const loadPage = () => {
    const { oldPage, oldStep, oldFilters } = load();
    const newEntitiesShown = entities.slice((oldPage - 1) * oldStep, oldPage * oldStep);
    setActivePage(oldPage);
    setStep(oldStep);
    setPageAmount(Math.ceil(entities.length / oldStep));
    setPageEntities(newEntitiesShown);
    setFilters(oldFilters);
  };
  const loadPageWithResults = (newStep: number, newPage: number, newEntities: any[]) => {
    const newEntitiesShown = newEntities.slice((newPage - 1) * newStep, newPage * newStep);
    setActivePage(newPage);
    setStep(newStep);
    setPageAmount(Math.ceil(newEntities.length / newStep));
    setPageEntities(newEntitiesShown);
  };

  const load = (): { oldStep: number; oldPage: number; oldFilters: any[] } => {
    let oldStep: number = +getPathVariable(location, "step");
    let oldPage: number = +getPathVariable(location, "page");
    let oldFilters: string = getPathVariable(location, "filter");

    if (oldPage < 1) oldPage = 1;
    if (oldStep < 10) oldStep = 10;

    if (oldFilters !== "") {
      const newFilter: any[] = JSON.parse(oldFilters);
      return { oldStep: oldStep, oldPage: oldPage, oldFilters: newFilter };
    } else {
      return { oldStep: oldStep, oldPage: oldPage, oldFilters: [] };
    }
  };

  useEffect(() => {
    loadPage();
  }, [location]);

  const search = (filters: Filter[]) => {
    isLoading(true);
    reciveAllFiltered(entityName + "s", filters, (results: any[]) => {
      if (results.length <= 0) {
        openSearchBar(true);
      }
      setEntities(results);
      setFilters(filters);
      loadPageWithResults(10, 1, results);
      isLoading(false);
    });
  };

  const changePage = (page: number) => {
    const newEntities = entities.slice((page - 1) * step, page * step);
    setPageEntities(newEntities);
    setActivePage(page);
    if (location.search.includes("filter")) {
      let filters: string = "";
      let locationParts: string[] = location.search.substring(1).split("&");
      locationParts.forEach((part: string) => {
        if (part.includes("filter")) filters = part;
      });
      history.push({
        pathname: `/${entityName}-overview`,
        search: `?${filters}&page=${page}&step=${step}`,
      });
    } else {
      history.push({
        pathname: `/${entityName}-overview`,
        search: `?page=${page}&step=${step}`,
      });
    }
  };

  const changeStep = (step: number) => {
    const newEntities = entities.slice((1 - 1) * step, 1 * step);
    setPageEntities(newEntities);
    setStep(step);
    if (location.search.includes("filter")) {
      let filters: string = "";
      let locationParts: string[] = location.search.substring(1).split("&");
      locationParts.forEach((part: string) => {
        if (part.includes("filter")) filters = part;
      });
      history.push({
        pathname: `/${entityName}-overview`,
        search: `?${filters}&page=1&step=${step}`,
      });
    } else {
      history.push({
        pathname: `/${entityName}-overview`,
        search: `?page=1&step=${step}`,
      });
    }
  };

  const makeNew = () => {
    history.push(`/${entityName}-builder`);
  };

  const makeFilterTag = (filter: Filter, index: number) => {
    if (filter.value instanceof Array) {
      let length = filter.value.length;
      return (
        <Tag size="lg" key={index}>
          {filter.fieldName}:{" "}
          {filter.value.map((val: any, index: number) =>
            index + 1 === length ? val : val + " or "
          )}
        </Tag>
      );
    } else if (typeof filter.value === "boolean") {
      return (
        <Tag size="lg" key={index}>
          {filter.fieldName}: {filter.value ? "true" : "false"}
        </Tag>
      );
    } else {
      return (
        <Tag size="lg" key={index}>
          {filter.fieldName}: "{filter.value}"
        </Tag>
      );
    }
  };

  return (
    <>
      <EntitySearch
        Entity={Entity}
        entityName={entityName}
        entities={allEntitysFromType}
        filters={filters}
        showSearchBar={showSearchBar}
        openSearchBar={openSearchBar}
        doSearch={search}
      />

      <EntityOptions>
        <BreadCrumbIcon />
        <ButtonGroup>
          <Button onClick={() => makeNew()} size="lg">
            <FaPlusCircle />
          </Button>
          <Button onClick={() => openSearchBar((o) => !o)} style={{ marginRight: "5px" }} size="lg">
            <FaSearch />
          </Button>
        </ButtonGroup>
        <InputNumber
          size="lg"
          prefix="Step"
          value={step}
          onChange={(value: any) => changeStep(value)}
          step={10}
          max={100}
          min={10}
          scrollable={true}
          style={{ width: 130 }}
        />
        <TagGroup style={{ marginLeft: "5px", marginTop: "-5px" }}>
          {filters.map((filter: Filter, index: number) => makeFilterTag(filter, index))}
        </TagGroup>
      </EntityOptions>

      {loading && <Loader center content="Loading..." />}
      {!loading && entities.length > 0 && (
        <>
          <PaginationWrapper>
            <Pagination
              size="lg"
              prev={true}
              next={true}
              first={true}
              last={true}
              ellipsis={true}
              boundaryLinks={true}
              pages={pageAmount}
              maxButtons={5}
              activePage={activePage}
              onSelect={changePage}
              total={0}
            />
          </PaginationWrapper>

          <EntityContainer>
            {entityName !== "" &&
              pageEntities.length > 0 &&
              pageEntities!.map((entity: typeof Entity, index: number) => {
                return <Tile key={index} entity={entity} />;
              })}
          </EntityContainer>

          <PaginationWrapper>
            <Pagination
              size="lg"
              prev={true}
              next={true}
              first={true}
              last={true}
              ellipsis={true}
              boundaryLinks={true}
              pages={pageAmount}
              maxButtons={5}
              activePage={activePage}
              onSelect={changePage}
              total={0}
            />
          </PaginationWrapper>
        </>
      )}
    </>
  );
};

export default EntityOverview;

const EntityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const PaginationWrapper = styled.div`
  width: calc(100% - 20px);
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const EntityOptions = styled(TopBar)`
  display: flex;
  flex-wrap: wrap;
`;
