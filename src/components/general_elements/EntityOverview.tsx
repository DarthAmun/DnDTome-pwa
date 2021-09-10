import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import Filter from "../../data/Filter";
import IEntity from "../../data/IEntity";
import { reciveAllFiltered } from "../../services/DatabaseService";

import { useQuery } from "../../hooks/QueryHook";

const EntityOverview = ({ match }: RouteComponentProps) => {
  const rawFilters = useQuery().get("filter");
  const [entityName, setEntityName] = useState<string>("");
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allEntitys, setAllEntitys] = useState<IEntity[]>([]);
  const [entitys, setEntitys] = useState<IEntity[]>([]);
  const [scrollParam, setParam] = useState<{
    start: number;
    end: number;
    hasMore: boolean;
  }>({
    start: 100,
    end: 120,
    hasMore: true,
  });

  useEffect(() => {
    if (rawFilters !== null) setFilter(JSON.parse(rawFilters));
    else setFilter([]);
    setAllEntitys([]);
    setEntitys([]);
    setParam({
      start: 100,
      end: 120,
      hasMore: true,
    });
    let newMatch: string = match.path
      .split("/")
      .filter((match: string) => match.includes("-overview"))[0]
      .replaceAll("-overview", "");
    setEntityName(newMatch);
  }, [match, rawFilters]);

  useEffect(() => {
    if (entityName !== "")
      reciveAllFiltered(entityName + "s", filters, (results: any[]) => {
        setAllEntitys(results);
        setEntitys(results.slice(0, 100));
        if (results.length === 0) {
          setParam({
            start: 0,
            end: 0,
            hasMore: false,
          });
        }
      });
  }, [filters, entityName]);

  const fetchMoreData = () => {
    if (entitys.length === allEntitys.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setEntitys((s) => s.concat(allEntitys.slice(scrollParam.start, scrollParam.end)));
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  const searchbars = {};

  const tiles = {};

  return (
    <>
      {/* {entityName !== "" && React.createElement(searchbars[entityName], {})}
      <div id="scrollable" style={{ width: "100%" }}>
        <InfiniteScroll
          dataLength={entitys.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {entityName !== "" &&
            entitys.length > 0 &&
            entitys!.map((entity: IEntity, index: number) => {
              return React.createElement(tiles[entityName], {
                key: index,
                [entityName]: entity,
              });
            })}
        </InfiniteScroll>
      </div> */}
    </>
  );
};

export default EntityOverview;

const EntityContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
