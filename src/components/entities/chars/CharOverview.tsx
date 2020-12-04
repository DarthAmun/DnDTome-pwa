import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Char from "../../../data/chars/Char";

import { LoadingSpinner } from "../../Loading";
import CharTile from "./CharTile";
import AppWrapper from "../../AppWrapper";
import CharSearchBar from "./CharSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const CharOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allChars, setAllChars] = useState<Char[]>([]);
  const [chars, setChars] = useState<Char[]>([]);
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
    reciveAllFiltered("chars", filters, (results: any[]) => {
      setAllChars(results);
      setChars(results.slice(0, 100));
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
    if (chars.length === allChars.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setChars((s) =>
      s.concat(allChars.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <CharSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <CharContainer
          dataLength={chars.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {chars!.map((char: Char, index: number) => {
            return <CharTile key={index} char={char}></CharTile>;
          })}
        </CharContainer>
      </div>
    </AppWrapper>
  );
};

export default CharOverview;

const CharContainer = styled(InfiniteScroll)`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
