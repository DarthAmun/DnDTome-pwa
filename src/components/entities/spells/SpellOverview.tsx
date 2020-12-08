import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Spell from "../../../data/Spell";

import { LoadingSpinner } from "../../Loading";
import SpellTile from "./SpellTile";
import AppWrapper from "../../AppWrapper";
import SpellSearchBar from "./SpellSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const SpellOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allSpells, setAllSpells] = useState<Spell[]>([]);
  const [spells, setSpells] = useState<Spell[]>([]);
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
    reciveAllFiltered("spells", filters, (results: any[]) => {
      setAllSpells(results);
      setSpells(results.slice(0, 100));
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
    if (spells.length === allSpells.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setSpells((s) =>
      s.concat(allSpells.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <SpellSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div
        id="scrollable"
        style={{
          width: "100%",
        }}
      >
        <SpellContainer
          dataLength={spells.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {spells!.map((spell: Spell, index: number) => {
            return <SpellTile key={index} spell={spell}></SpellTile>;
          })}
        </SpellContainer>
      </div>
    </AppWrapper>
  );
};

export default SpellOverview;

const SpellContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
