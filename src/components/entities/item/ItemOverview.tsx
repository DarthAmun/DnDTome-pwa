import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import Item from "../../../data/Item";

import { LoadingSpinner } from "../../Loading";
import ItemTile from "./ItemTile";
import ItemSearchBar from "./ItemSearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { reciveAllFiltered } from "../../../services/DatabaseService";

const ItemOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[]>([]);
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
    reciveAllFiltered("items", filters, (results: any[]) => {
      setAllItems(results);
      setItems(results.slice(0, 100));
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
    if (items.length === allItems.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setItems((s) =>
      s.concat(allItems.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };
  return (
    <>
      <ItemSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <ItemContainer
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {items!.map((item: Item, index: number) => {
            return <ItemTile key={index} item={item}></ItemTile>;
          })}
        </ItemContainer>
      </div>
    </>
  );
};

export default ItemOverview;

const ItemContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;