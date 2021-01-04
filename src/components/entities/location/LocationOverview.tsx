import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Location from "../../../data/world/Location";

import { LoadingSpinner } from "../../Loading";
import LocationTile from "./LocationTile";
import AppWrapper from "../../AppWrapper";
import LocationSearchBar from "./LocationSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const LocationOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
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
    reciveAllFiltered("locations", filters, (results: any[]) => {
      setAllLocations(results);
      setLocations(results.slice(0, 100));
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
    if (locations.length === allLocations.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setLocations((s) =>
      s.concat(allLocations.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <LocationSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <LocationContainer
          dataLength={locations.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {locations!.map((location: Location, index: number) => {
            return <LocationTile key={index} location={location}></LocationTile>;
          })}
        </LocationContainer>
      </div>
    </AppWrapper>
  );
};

export default LocationOverview;

const LocationContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
