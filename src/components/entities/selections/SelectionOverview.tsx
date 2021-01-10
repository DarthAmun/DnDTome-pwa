import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Selection from "../../../data/Selection";

import { LoadingSpinner } from "../../Loading";
import SelectionTile from "./SelectionTile";
import AppWrapper from "../../AppWrapper";
import SelectionSearchBar from "./SelectionSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const SelectionOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allSelections, setAllSelections] = useState<Selection[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);
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
    reciveAllFiltered("selections", filters, (results: any[]) => {
      setAllSelections(results);
      setSelections(results.slice(0, 100));
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
    if (selections.length === allSelections.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setSelections((s) =>
      s.concat(allSelections.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <SelectionSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <SelectionContainer
          dataLength={selections.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {selections!.map((selection: Selection, index: number) => {
            return <SelectionTile key={index} selection={selection}></SelectionTile>;
          })}
        </SelectionContainer>
      </div>
    </AppWrapper>
  );
};

export default SelectionOverview;

const SelectionContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
