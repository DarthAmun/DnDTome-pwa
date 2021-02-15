import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Npc from "../../../data/campaign/Npc";

import { LoadingSpinner } from "../../Loading";
import NpcTile from "./NpcTile";
import NpcSearchBar from "./NpcSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const NpcOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allNpcs, setAllNpcs] = useState<Npc[]>([]);
  const [npcs, setNpcs] = useState<Npc[]>([]);
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
    reciveAllFiltered("npcs", filters, (results: any[]) => {
      setAllNpcs(results);
      setNpcs(results.slice(0, 100));
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
    if (npcs.length === allNpcs.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setNpcs((s) =>
      s.concat(allNpcs.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <>
      <NpcSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <NpcContainer
          dataLength={npcs.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {npcs!.map((npc: Npc, index: number) => {
            return <NpcTile key={index} npc={npc}></NpcTile>;
          })}
        </NpcContainer>
      </div>
    </>
  );
};

export default NpcOverview;

const NpcContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
