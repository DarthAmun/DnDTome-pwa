import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import RandomTable from "../../../data/RandomTable";
import Filter from "../../../data/Filter";
import { reciveAllFiltered } from "../../../services/DatabaseService";

import AppWrapper from "../../AppWrapper";
import { LoadingSpinner } from "../../Loading";
import RandomTableTile from "./RandomTableTile";
import RandomTableSearchBar from "./RandomTableSearchBar";

const RandomTableOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allRandomTables, setAllRandomTables] = useState<RandomTable[]>([]);
  const [randomTables, setRandomTables] = useState<RandomTable[]>([]);
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
    reciveAllFiltered("randomTables", filters, (results: any[]) => {
      setAllRandomTables(results);
      setRandomTables(results.slice(0, 100));
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
    if (randomTables.length === allRandomTables.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setRandomTables((s) =>
      s.concat(allRandomTables.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <RandomTableSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <LibraryContainer
          dataLength={randomTables.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {randomTables!.map((randomTable: RandomTable, index: number) => {
            return <RandomTableTile key={index} randomTable={randomTable}></RandomTableTile>;
          })}
        </LibraryContainer>
      </div>
    </AppWrapper>
  );
};

export default RandomTableOverview;

const LibraryContainer = styled(InfiniteScroll)`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
