import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../Data/Filter";
import Monster from "../../../Data/Monster";

import { LoadingSpinner } from "../../Loading";
import MonsterTile from "./MonsterTile";
import AppWrapper from "../../AppWrapper";
import MonsterSearchBar from "./MonsterSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../Services/DatabaseService";

const MonsterOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allMonsters, setAllMonsters] = useState<Monster[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
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
    reciveAllFiltered("monsters", filters, (results: any[]) => {
      setAllMonsters(results);
      setMonsters(results.slice(0, 100));
      if (results.length === 0) {
        setParam({
          start: 0,
          end: 0,
          hasMore: false,
        });
      }
    });
  }, [filters]);

  const fetchMoreData = () => {
    if (monsters.length === allMonsters.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setMonsters((s) =>
      s.concat(allMonsters.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <MonsterSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <MonsterContainer
          dataLength={monsters.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {monsters!.map((monster: Monster, index: number) => {
            return <MonsterTile key={index} monster={monster}></MonsterTile>;
          })}
        </MonsterContainer>
      </div>
    </AppWrapper>
  );
};

export default MonsterOverview;

const MonsterContainer = styled(InfiniteScroll)`
  margin-top: 50px;
  width: 100%;
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
