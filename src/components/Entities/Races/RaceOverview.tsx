import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../Data/Filter";
import Race from "../../../Data/Races/Race";

import { LoadingSpinner } from "../../Loading";
import RaceTile from "./RaceTile";
import AppWrapper from "../../AppWrapper";
import RaceSearchBar from "./RaceSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../Services/DatabaseService";

const RaceOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allRaces, setAllRaces] = useState<Race[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
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
    reciveAllFiltered("races", filters, (results: any[]) => {
      setAllRaces(results);
      setRaces(results.slice(0, 100));
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
    if (races.length === allRaces.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setRaces((s) =>
      s.concat(allRaces.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <RaceSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <RaceContainer
        dataLength={races.length}
        next={fetchMoreData}
        hasMore={scrollParam.hasMore}
        loader={<LoadingSpinner />}
      >
        {races!.map((race: Race, index: number) => {
          return <RaceTile key={index} race={race}></RaceTile>;
        })}
      </RaceContainer>
    </AppWrapper>
  );
};

export default RaceOverview;

const RaceContainer = styled(InfiniteScroll)`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
