import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Event from "../../../data/world/Event";

import { LoadingSpinner } from "../../Loading";
import EventTile from "./EventTile";
import AppWrapper from "../../AppWrapper";
import EventSearchBar from "./EventSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const EventOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
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
    reciveAllFiltered("events", filters, (results: any[]) => {
      setAllEvents(results);
      setEvents(results.slice(0, 100));
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
    if (events.length === allEvents.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setEvents((s) =>
      s.concat(allEvents.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <EventSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div
        id="scrollable"
        style={{
          width: "100%",
        }}
      >
        <EventContainer
          dataLength={events.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {events!.map((event: Event, index: number) => {
            return <EventTile key={index} event={event}></EventTile>;
          })}
        </EventContainer>
      </div>
    </AppWrapper>
  );
};

export default EventOverview;

const EventContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
