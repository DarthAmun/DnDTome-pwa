import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../Data/Filter";
import Class from "../../../Data/Classes/Class";

import { LoadingSpinner } from "../../Loading";
import ClassTile from "./ClassTile";
import AppWrapper from "../../AppWrapper";
import ClassSearchBar from "./ClassSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../Services/DatabaseService";

const ClassOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allClasses, setAllClasses]  = useState<Class[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
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
    reciveAllFiltered("classes", filters, (results: any[]) => {
      setAllClasses(results);
      setClasses(results.slice(0, 100));
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
    if (classes.length === allClasses.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setClasses((s) =>
      s.concat(allClasses.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <ClassSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <ClassContainer
      dataLength={classes.length}
      next={fetchMoreData}
      hasMore={scrollParam.hasMore}
      loader={<LoadingSpinner />}>
        {classes!.map((classe: Class, index: number) => {
            return <ClassTile key={index} classe={classe}></ClassTile>;
          })}
      </ClassContainer>
    </AppWrapper>
  );
};

export default ClassOverview;

const ClassContainer = styled(InfiniteScroll)`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
