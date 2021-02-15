import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Quest from "../../../data/campaign/Quest";

import { LoadingSpinner } from "../../Loading";
import QuestTile from "./QuestTile";
import QuestSearchBar from "./QuestSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const QuestOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allQuests, setAllQuests] = useState<Quest[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
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
    reciveAllFiltered("quests", filters, (results: any[]) => {
      setAllQuests(results);
      setQuests(results.slice(0, 100));
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
    if (quests.length === allQuests.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setQuests((s) =>
      s.concat(allQuests.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <>
      <QuestSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <QuestContainer
          dataLength={quests.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {quests!.map((quest: Quest, index: number) => {
            return <QuestTile key={index} quest={quest}></QuestTile>;
          })}
        </QuestContainer>
      </div>
    </>
  );
};

export default QuestOverview;

const QuestContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
