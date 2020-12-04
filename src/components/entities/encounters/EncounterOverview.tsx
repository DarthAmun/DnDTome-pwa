import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Encounter from "../../../data/encounter/Encounter";
import Filter from "../../../data/Filter";
import { reciveAllFiltered } from "../../../services/DatabaseService";

import AppWrapper from "../../AppWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "../../Loading";
import EncounterTile from "./EncounterTile";
import EncounterSearchBar from "./EncounterSearchBar";

const EncounterOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allEncounters, setAllEncounters] = useState<Encounter[]>([]);
  const [encounters, setEncounters] = useState<Encounter[]>([]);
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
    reciveAllFiltered("encounters", filters, (results: any[]) => {
      setAllEncounters(results);
      setEncounters(results.slice(0, 100));
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
    if (encounters.length === allEncounters.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setEncounters((s) =>
      s.concat(allEncounters.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <EncounterSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <EncounterContainer
        dataLength={encounters.length}
        next={fetchMoreData}
        hasMore={scrollParam.hasMore}
        loader={<LoadingSpinner />}
      >
        {encounters!.map((encounter: Encounter, index: number) => {
          return <EncounterTile key={index} encounter={encounter}></EncounterTile>;
        })}
      </EncounterContainer>
    </AppWrapper>
  );
};

export default EncounterOverview;

const EncounterContainer = styled(InfiniteScroll)`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
