import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Group from "../../../data/campaign/Group";
import Filter from "../../../data/Filter";
import { reciveAllFiltered } from "../../../services/DatabaseService";

import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "../../Loading";
import GroupTile from "./GroupTile";
import GroupSearchBar from "./GroupSearchBar";

const GroupOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
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
    reciveAllFiltered("groups", filters, (results: any[]) => {
      setAllGroups(results);
      setGroups(results.slice(0, 100));
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
    if (groups.length === allGroups.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setGroups((s) =>
      s.concat(allGroups.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <>
      <GroupSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <GroupContainer
        dataLength={groups.length}
        next={fetchMoreData}
        hasMore={scrollParam.hasMore}
        loader={<LoadingSpinner />}
      >
        {groups!.map((group: Group, index: number) => {
          return <GroupTile key={index} group={group}></GroupTile>;
        })}
      </GroupContainer>
    </>
  );
};

export default GroupOverview;

const GroupContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
