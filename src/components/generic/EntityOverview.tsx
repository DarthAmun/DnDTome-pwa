import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Alert, Button, ButtonGroup, InputNumber, Loader, Pagination } from "rsuite";
import { reciveAll, reciveAllFiltered } from "../../services/DatabaseService";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import Filter from "../../data/Filter";
import { useHistory, useLocation } from "react-router-dom";
import { getPathVariable } from "../../services/LocationPathService";

interface $OverviewProps {
  entityName: string;
  Tile: any;
  Entity: any;
  Search: any;
}

const EntityOverview = ({ entityName, Entity, Tile, Search }: $OverviewProps) => {
  let history = useHistory();
  let location = useLocation();
  const [allEntitysFromType, setAllEntitys] = useState<typeof Entity[]>([]);
  const [entities, setEntities] = useState<typeof Entity[]>([]);
  const [pageEntities, setPageEntities] = useState<typeof Entity[]>([]);

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

  const loadPage = (newStep: number, newPage: number) => {
    console.log("loadPage");
    const newEntities = entities.slice((1 - 1) * newStep, 1 * newStep);
    setPageAmount(Math.ceil(newEntities.length / newStep));
    setPageEntities(newEntities);
    setStep(newStep);
    setActivePage(newPage);
  };

  useEffect(() => {
    let oldStep: string = getPathVariable(location, "step");
    let oldPage: string = getPathVariable(location, "page");
    if (oldStep !== "" && oldPage !== "") {
      const newStep = +oldStep.replace("step=", "");
      const newPage = +oldPage.replace("page=", "");
      if (newStep !== step) loadPage(newStep, newPage);
    }
  }, []);

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
        pathname: "/spell-overview",
        search: `?${filters}&page=${page}&step=${step}`,
      });
    } else {
      history.push({
        pathname: "/spell-overview",
        search: `?page=${page}&step=${step}`,
      });
    }
  };

  const changeStep = (step: number) => {
    const newEntities = entities.slice((1 - 1) * step, 1 * step);
    setPageAmount(Math.ceil(entities.length / step));
    setPageEntities(newEntities);
    setStep(step);
    setActivePage(1);
    if (location.search.includes("filter")) {
      let filters: string = "";
      let locationParts: string[] = location.search.substring(1).split("&");
      locationParts.forEach((part: string) => {
        if (part.includes("filter")) filters = part;
      });
      history.push({
        pathname: "/spell-overview",
        search: `?${filters}&page=1&step=${step}`,
      });
    } else {
      history.push({
        pathname: "/spell-overview",
        search: `?page=1&step=${step}`,
      });
    }
  };

  const search = (filters: Filter[]) => {
    console.log("search");
    isLoading(true);
    reciveAllFiltered(entityName + "s", filters, (results: any[]) => {
      if (results.length <= 0) {
        openSearchBar(true);
        Alert.warning("Nothing found.");
      }
      const newPage: string = getPathVariable(location, "page");
      setPageAmount(Math.ceil(results.length / step));
      setActivePage(newPage !== "" ? +newPage : 1);
      setEntities(results);
      setPageEntities(results.slice(0, step));
      isLoading(false);
    });
  };

  const makeNew = () => {
    history.push(`/${entityName}-builder`);
  };

  return (
    <>
      <Search
        entities={allEntitysFromType}
        showSearchBar={showSearchBar}
        openSearchBar={openSearchBar}
        doSearch={search}
      />

      <EntityOptions>
        <ButtonGroup>
          <Button onClick={() => makeNew()}>
            <FaPlusCircle />
          </Button>
          <Button onClick={() => openSearchBar((o) => !o)} style={{ marginRight: "5px" }}>
            <FaSearch />
          </Button>
        </ButtonGroup>
        <InputNumber
          prefix="Step"
          value={step}
          onChange={(value: any) => changeStep(value)}
          step={10}
          max={100}
          min={10}
          scrollable={true}
          style={{ width: 120 }}
        />
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
  align-items: stretch;
  align-content: flex-start;
  gap: 20px;
`;

const PaginationWrapper = styled.div`
  width: calc(100% - 20px);
  text-align: center;
  padding: 10px;
`;

const EntityOptions = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
`;
