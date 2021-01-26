import React, { useState, useEffect } from "react";
import styled from "styled-components";
import World from "../../../data/world/World";
import Filter from "../../../data/Filter";
import { reciveAllFiltered } from "../../../services/DatabaseService";

import AppWrapper from "../../AppWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "../../Loading";
import WorldTile from "./WorldTile";
import WorldSearchBar from "./WorldSearchBar";

const WorldOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allWorlds, setAllWorlds] = useState<World[]>([]);
  const [worlds, setWorlds] = useState<World[]>([]);
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
    reciveAllFiltered("worlds", filters, (results: any[]) => {
      setAllWorlds(results);
      setWorlds(results.slice(0, 100));
      if(results.length === 0){
        setParam({
          start: 0,
          end: 0,
          hasMore: false,
        });
      }
    });
  }, [filters]);

  const fetchMoreData = () => {
    if (worlds.length === allWorlds.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setWorlds((s) =>
      s.concat(allWorlds.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <WorldSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <WorldContainer
        dataLength={worlds.length}
        next={fetchMoreData}
        hasMore={scrollParam.hasMore}
        loader={<LoadingSpinner />}
      >
        {worlds!.map((world: World, index: number) => {
          return <WorldTile key={index} world={world}></WorldTile>;
        })}
      </WorldContainer>
    </AppWrapper>
  );
};

export default WorldOverview;

const WorldContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
