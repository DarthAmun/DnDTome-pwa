import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../Data/Filter";
import Gear from "../../../Data/Gear";

import { LoadingSpinner } from "../../Loading";
import GearTile from "./GearTile";
import AppWrapper from "../../AppWrapper";
import GearSearchBar from "./GearSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../Services/DatabaseService";

const GearOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allGears, setAllGears] = useState<Gear[]>([]);
  const [gears, setGears] = useState<Gear[]>([]);
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
    reciveAllFiltered("gears", filters, (results: any[]) => {
      setAllGears(results);
      setGears(results.slice(0, 100));
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
    if (gears.length === allGears.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setGears((s) =>
      s.concat(allGears.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <GearSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <GearContainer
          dataLength={gears.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {gears!.map((gear: Gear, index: number) => {
            return <GearTile key={index} gear={gear}></GearTile>;
          })}
        </GearContainer>
      </div>
    </AppWrapper>
  );
};

export default GearOverview;

const GearContainer = styled(InfiniteScroll)`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
